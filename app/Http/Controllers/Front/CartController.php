<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Integration\Cart;
use App\Integration\Paypal;
use App\Models\Coupon;
use App\Models\LegalPage;
use App\Models\Module;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Session;
use Validator;

class CartController extends Controller
{
    public function index()
    {
        if(request()->wantsJson())
        {
            $data['table'] = view('components.front.cartTable')->render();
            $data['oneTotal'] = "$" . formatNumber(Session::get("cart")->onetimeTotalPrice?? 0);
            $data['subTotal'] = "$" . formatNumber(Session::get("cart")->subTotalPrice?? 0);
            $data['total'] = "$" . formatNumber(Session::get("cart")->totalPrice?? 0);

            return response()->json([
                'status'=>1,
                'data'=>$data
            ]);
        }

        if(isset($_SERVER['HTTP_REFERER'])) {
            try {
                $continue = $this->getConinuteUrl($_SERVER['HTTP_REFERER']);
            }catch(\Exception $e)
            {
                $continue = route('package.index');
            }
        }else {
            $continue = route('package.index');
        }


        $policy = LegalPage::whereSlug("payment-policy")->first();
        $stripe = option("stripe", null);
        $stripe_pk = optional($stripe)['public'];
        $cart = Session::get("cart");
        $gateway = option("gateway", []);

        return view('frontend.cart.index', compact("continue",'policy','stripe_pk','cart','gateway'));
    }

    public function getConinuteUrl($http)
    {
        $value = explode('/', $http);
        $url = route('package.index');
        switch ($value[3]) {
            case "services":
                $url = route('service.index');
                break;
            case "plugins":
                $url = route('plugin.index');
                break;
            case "modules":
                $url = route('module.index');
                break;
            case "lacarte":
                $url = route('lacarte.index');
                break;
            case "readymade":
                $url = route('readymade.index');
                break;
            case "blog":
                $url = route('blog.package');
                break;
            case "blogAds":
                $url = route('blogAds.index');
                break;
        }
        return $url;
    }
    public function remove(Request $request)
    {
        try{

            $oldCart = Session::get("cart");
            $cart = new Cart($oldCart);
            $cart->removeOne($request->id);

            Session::put("cart", $cart);
            return response()->json([
                'status'=>1,
                'data'=>view('components.front.cart')->render()
            ]);
        }catch(\Exception $e)
        {
            return response()->json([
                'status'=>0,
                'data'=>['Item not found!']
            ]);
        }
    }
    public function coupon(Request $request)
    {
        try{
            $coupon = Coupon::where("code", $request->code)->firstorfail();
            if($coupon->reusable==0&&$coupon->user_id!=0)
            {
                return response()->json([
                    'status'=>0,
                    'data'=>['Coupon code is already used.']
                ]);
            }
            return response()->json([
                'status'=>1,
                'data'=>$coupon
            ]);
        }catch(\Exception $e)
        {
            return response()->json([
                'status'=>0,
                'data'=>['Invalid Coupon Code.']
            ]);
        }
    }
    public function empty()
    {
        Session::forget("cart");

        foreach(session()->all() as $key3 => $value)
        {
            if (strpos($key3, 'paypal') === 0)
            {
                Session::forget($key3);
            }
        }

        return response()->json([
            'status'=>1,
            'data'=>view('components.front.cart')->render()
        ]);
    }
    public function checkEmail(Request $request)
    {
        try {
            $validation = \Illuminate\Support\Facades\Validator::make($request->all(), [
                'guest_email'=>'required'
            ]);
            if($validation->fails()) return $this->jsonError($validation->errors());

            $user = User::where("email", $request->guest_email)->first();
            if(!empty($user))
            {
                $errors['guest_email'] = "That email already exists. Please login first.";
                return $this->jsonError($errors);
            }

            session()->put("paypalguestemail", $request->guest_email);

            return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function update(Request $request)
    {
        try {
            $validation = Validator::make($request->all(), [
                'items.*'=>'required|integer|min:1'
            ], ['items.*'=>'Choose correct quantity']);
            if($validation->fails()) return response()->json(['status'=>0, 'data'=>$validation->errors()]);

            $oldCart = Session::get("cart");
            $cart = new Cart($oldCart);
            $cart->updateCart($request->items);

            Session::put("cart", $cart);
            return response()->json([
                'status'=>1,
                'data'=>view('components.front.cart')->render()
            ]);

        }catch(\Exception $e)
        {
            return response()->json([
                'status'=>0,
                'data'=>[json_encode($e->getMessage())]
            ]);
        }
    }

}
