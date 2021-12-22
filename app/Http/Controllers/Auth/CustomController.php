<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\Sso;
use App\Http\Controllers\Controller;
use App\Models\NotificationTemplate;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class CustomController extends Controller
{
    public function __construct()
    {
        $nocaptcha = optional(option("nocaptcha"));
        config()->set("captcha.secret", $nocaptcha['secret']);
        config()->set("captcha.sitekey", $nocaptcha['sitekey']);
    }

    public function email(Request $request)
    {
        if($request->redirect_uri){
            $request->session()->put('redirect_uri', $request->redirect_uri);
        }

        return view('frontend.auth.register');
    }

    public function emailSubmit(Request $request)
    {
        $this->validate($request, [
            'email'=>'required|string|email|max:255',
            'g-recaptcha-response'=>'required|captcha',
            'timezone'=>'string|max:40'
        ], [
            'g-recaptcha-response.*' => 'Please check this field.'
        ]);

        $user = User::where('email', $request->email)->first();

        if($newUser = $user === null){
            $user = new User();
            $password = \Str::random(8);
            $user->email = $request->email;
            $user->username = User::getUsername($request->email);
            $user->pin_number = User::getPinNumber();
            $user->timezone = $request->timezone;
            $user->password = bcrypt($password);
            $user->save();
        }

        if($newUser){
            $data['url'] = route('register.password');
            $data['password'] = $password;
            $notification = new NotificationTemplate();
            $notification->sendEmail($data, NotificationTemplate::WELCOME_EMAIL ,$request->email);
        }

        session()->put("email_register", $request->email);

        return redirect()->route("register.password")->with("successMessage", true);

    }

    public function password(Request $request)
    {
        if(session("email_register"))
        {
            $email = session("email_register");

            return view("frontend.auth.password", compact('email'));
        }else {
            return redirect()->route("login")->with("info", "Session is expired! Please login with email and password.");
        }
    }

    public function passwordSubmit(Request $request)
    {
        if(!session("email_register"))
            return back()->with("error", "Session is expired!");

        $this->validate($request, [
            'g-recaptcha-response'=>'required|captcha',
            'password'=>'required'
        ], [
            'g-recaptcha-response.*' => 'Please check this field.'
        ]);

        $user = User::where("email", session("email_register"))->first();

        if (Hash::check($request->password, $user->password)) {

            $user->email_verified_at = now()->toDateTimeString();
            $user->save();

            \Auth::login($user);
            session()->forget("email_register");

            Sso::setCookie();

            if($redirect_uri = $request->session()->get('redirect_uri')){

                $query = http_build_query([
                    'user_id' => \auth()->user()->email,
                    'psw'=> \auth()->user()->getAuthPassword(),
                    'username'=> \auth()->user()->username,
                ]);

                return redirect($redirect_uri."&{$query}");
            }

            return redirect("/account/profile#/password")->with("success", "Welcome to Bizinabox!");
        }
        throw ValidationException::withMessages(['password' => 'Password is incorrect']);


    }
    public function test(Request $request)
    {
        try {
            $validation = \Validator::make($request->all(), [

            ]);
            if($validation->fails()) return $this->jsonError($validation->errors());
        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }

    public function ssoLogin(Request $request): \Illuminate\Routing\Redirector|\Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse
    {

        $request->session()->put('state', $state = Str::random(80));

        $query1 = http_build_query([
            'state'=> $state,
        ]);

        $query = http_build_query([
            'redirect_uri'=>config('app.url').'/home?'.$query1,
        ]);

        return redirect(config('sso.server').'/login?'.$query);
    }

    public function ssoRegister(Request $request): \Illuminate\Routing\Redirector|\Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse
    {

        $request->session()->put('state', $state = Str::random(80));

        $query1 = http_build_query([
           'state'=> $state,
        ]);

        $query = http_build_query([
            'redirect_uri'=>config('app.url').'/home?'.$query1,
        ]);

        return redirect(config('sso.server').'/register?'.$query);
    }

    public function ssoLogout(Request $request)
    {

        Sso::logOut();

        Auth::guard()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return $request->wantsJson()
            ? new JsonResponse([], 204)
            : redirect('/');
    }
}
