<?php

namespace App\Http\Controllers;

use App\Models\BaseModel;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\EmailCategory;
use App\Models\NotificationTemplate;
use App\Models\Subscriber;
use App\Models\User;
use App\Models\Logo\Video;
use App\Models\Logo\VideoCategory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        if(auth()->user()->hasRole('admin'))
        {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('user.getting.started');
    }

    public function profile($role)
    {
        if(!in_array($role, ['admin', 'account'])) abort(404);

        return view('account.profile');
    }
    public function subscribedSwitch(Request $request)
    {
        $id = $request->get('id');
        $type = $request->get('type');

        if($type=='category')
        {
            $category = BlogCategory::find($id);
            user()->unsubscribe($category);
        }elseif($type=='post')
        {
            $post = BlogPost::find($id);
            user()->unsubscribe($post);

        }elseif($type=='author')
        {
            $author = User::find($id);
            user()->unfollow($author);
        }
        return $this->jsonSuccess();
    }
    public function subscribedUpdate(Request $request)
    {
        if($request->status)
        {
            user()->addSubscriber()
                ->categories()
                ->sync($request->categories);

        }else {
            user()->removeSubscriber();
        }
        return $this->jsonSuccess();
    }

    public function subscribed($role)
    {
        if(!in_array($role, ['admin', 'account'])) abort(404);

        if(request()->wantsJson())
        {
            $categories = user()->subscribedCats;
            $posts = user()->subscribedPosts;
            $authors = user()->followings()->select("users.id", "users.name", "users.username")->get();

            $view = view("components.account.subscribed", compact("categories", "posts", "authors"))->render();

            return $this->jsonSuccess($view);
        }

        $subscriber = Subscriber::where("email", user()->email)->first();
        $unsubscribeds = [];
        if($subscriber)
        {
            $unsubscribeds = $subscriber->categories()->pluck("email_categories.id")->toArray();
        }
        $categories = EmailCategory::status(1)->get(['id', 'name']);

        return view('account.subscribed', compact("subscriber", "categories", "unsubscribeds"));
    }

    public function profileUpdate(Request $request)
    {
        try {

            $validation = Validator::make($request->all(), user()->profileUpdateRule($request));
            if($validation->fails()) return response()->json(['status'=>0, 'data'=>$validation->errors()]);

            $user = user()->updateProfile($request);

            $data['url'] = route('profile', user()->hasRole("admin")?'admin':'account');
            $data['username'] = user()->name;

            $notification = new NotificationTemplate();
            $notification->sendNotification($data, $notification::PROFILE_CHANGED, $user);

            return $this->jsonSuccess($user);
        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function passwordUpdate(Request $request)
    {
        try {
            $validation = Validator::make($request->all(), [
                'old_password' => [
                    function ($attribute, $value, $fail) {
                        if (user()->password!==null&&!Hash::check($value, user()->password)) {
                            $fail('Old Password didn\'t match');
                        }
                    },
                ],
                'new_password' => 'required|min:8|different:old_password|max:191|case_diff|numbers|letters|symbols',
                'confirm_password' =>'required|same:new_password'
            ]);
            if($validation->fails()) return $this->jsonError($validation->errors());

            $user = user()->updatePsw($request);

            $data['url'] = route('profile', user()->hasRole("admin")?'admin':'account') . "#/password";
            $data['username'] = user()->name;

            $notification = new NotificationTemplate();
            $notification->sendNotification($data, $notification::PROFILE_CHANGED, $user);

            \Auth::logout();

            $view = '
            <div class="container my-5">
                <div class="m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-success">
                    <div class="m-alert__icon">
                        <i class="flaticon-exclamation-1"></i>
                        <span></span>
                    </div>
                    <div class="m-alert__text">
                        <strong>Success! For security purposes, you were logged out. Please <a href="'.route('login').'">login</a> with your new password.</strong>
                    </div>
                </div>
            </div>
            ';
            return $this->jsonSuccess($view);

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function uploadImage(Request $request, $folder=null)
    {
        try{
            $validation = Validator::make($request->all() ,[
                'file'=>'image|mimes:jpeg,png,jpg,gif|max:10240'
            ]);

            if($validation->fails()) abort(404);

            $file=$request->file('file');
            $name = guid() . '.'.$file->getClientOriginalExtension();

            $folder_name = config("custom.storage_name.tinymce");
            $path = $folder? $folder_name."/".$folder:$folder_name;

            return response()->json([
                'location' => BaseModel::fileUpload($file, $name, $path)
            ]);
        }
        catch(\Exception $e){
            echo json_encode($e->getMessage());
        }
    }
    public function uploadImages(Request $request, $id)
    {
        try{
            $validation = Validator::make($request->all() ,[
                'file'=>'image|mimes:jpeg,png,jpg,gif|max:10240'
            ]);
            if($validation->fails()) abort(404);

            $file=$request->file('file');

            $name = $file->getClientOriginalName();

            $folder_name = config("custom.storage_name.email");

            $path = $folder_name . "/" . $id;

            BaseModel::fileUpload($file, $name, $path);

            return response()->json([
                'name'          => $name,
                'original_name' => $name,
            ]);
        }
        catch(\Exception $e){
            echo json_encode($e->getMessage());
        }
    }

    public function notifications($role)
    {
        if(!in_array($role, ['admin', 'account'])) abort(404);

        if(request()->wantsJson())
        {
            return user()->getNotifications(request()->get("status"));
        }

        return view("account.notification");
    }
    public function notificationDetail($role, $id)
    {
        if(!in_array($role, ['admin', 'account'])) abort(404);
        $notification = user()->notifications()->whereId($id)->firstorfail();
        if($notification->read_at==null)
        {
            $notification->read_at = Carbon::now()->toDateTimeString();
            $notification->save();
        }
        return view("account.notificationDetail", compact("notification"));
    }

    public function notificationSwitch(Request $request)
    {
        try {

            $action = $request->action;

            if($action==='read')
            {
                user()->notifications()->whereIn('id', $request->ids)->get()->each->update(['read_at'=>Carbon::now()->toDateTimeString()]);
            }elseif($action==='unread')
            {
                user()->notifications()->whereIn('id', $request->ids)->get()->each->update(['read_at'=>null]);
            }elseif($action==='delete')
            {
                user()->notifications()->whereIn('id', $request->ids)->get()->each->delete();
            }

            return response()->json(['status'=>1]);

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }

    public function checkFileExistence(Request $request){
        $path = $request->get('path');
        if(file_exists(public_path($path))){
            return $this->jsonSuccess();
        }
        return $this->jsonError();
    }

    public function videos(){
        $categories = VideoCategory::with(['subcategories'=>function($query){
            $query->with('items');
        }, 'items'])->get();

        $videos = Video::where('status',1)->get();

        return view('frontend.videos', compact('categories','videos'));
    }


}
