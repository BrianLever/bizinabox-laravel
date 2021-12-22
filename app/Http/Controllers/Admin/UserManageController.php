<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\UserLogin;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Validator;

class UserManageController extends AdminController
{
    public function __construct(User $model)
    {
        $this->model = $model;
    }
    public function index()
    {
        if (request()->wantsJson()) {
            return $this->model->getDatatable(request()->get("status"));
        }
        return view(self::$viewDir.'userManage.index');
    }
    public function edit($id)
    {
        $user = $this->model->with("roles")
            ->findorfail($id);

        return view(self::$viewDir.'userManage.edit', compact("user"));
    }
    public function detail($id)
    {
        $user = $this->model->with("roles", "websites")
            ->withCount([
                "domains",
                "blogAdsListings",
                "readymades",
                "packages",
                "plugins",
                "services",
                "lacartes",
                "posts",
                "orders",
                "subscriptionOrderItems",
                "transactions",
                "tickets",
                "appointments",
                "purchaseFollowups",
                "logins",
            ])
            ->findorfail($id);

        return view(self::$viewDir.'userManage.detail1', compact("user"));
    }
    public function getLogin()
    {
        $login = new UserLogin();
        return $login->getDatatable(request()->get("user"));
    }
    public function create()
    {
        return view(self::$viewDir.'userManage.create');
    }
    public function store(Request $request)
    {
        try{
            $validation = Validator::make($request->all(), $this->model->storeRule());
            if($validation->fails()) return response()->json(['status'=>0, 'data'=>$validation->errors()]);

            $this->model->storeItem($request)
                ->syncRoles($request->roles);

            return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function updateProfile(Request $request, $id)
    {
        try {
            $validation = Validator::make($request->all(), $this->model->profileUpdateRule($request, $id));
            if($validation->fails()) return response()->json(['status'=>0, 'data'=>$validation->errors()]);

            $user = $this->model->findorfail($id)
                ->updateProfile($request, 1)
                ->syncRoles($request->roles);

            return response()->json(['status' => 1, 'data' => $user]);

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }

    public function updatePassword(Request $request, $id)
    {
        try {
            $validation = Validator::make($request->all(), [
                'new_password' => 'required|min:8|max:191',
                'confirm_password' =>'required|same:new_password'
            ]);
            if($validation->fails()) return response()->json(['status'=>0, 'data'=>$validation->errors()]);

            $user = $this->model->findorfail($id)->updatePsw($request);
            return response()->json(['status' => 1, 'data' => $user]);

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function switchStatus(Request $request)
    {
        try {

            $action = $request->action;

            $items = $this->model->whereIn('id', $request->ids)->get();

            if($action==='active')
            {
                $items->each->update(['status'=>'active']);
            }elseif($action==='inactive')
            {
                $items->each->update(['status'=>'inactive']);
            }elseif($action==='send_verification')
            {
               foreach($items as $item)
               {
                   $item->sendEmailVerificationNotification();
               }
            }

            return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }

    public function uploadStockFiles(Request $request){
        $images = $request->images;
        try {
            $urls = [];
            foreach ($images as $image){
                $media = auth()->user()->addMediaFromBase64($image['url'])
                    ->usingFileName(guid() . ".jpg")
                    ->toMediaCollection('stockImages');
                array_push($urls, $media->getUrl());
            }
            return $this->jsonSuccess($urls);
        }catch (\Exception $e){
            $this->jsonExceptionError($e);
        }
    }

    public function getStockFiles(){
        $media = auth()->user()->getMedia('stockImages');

        $result = [];

        foreach ($media as $image) {
            array_push($result,[
                'id'=>$image->id,
                'url'=>$image->getUrl(),
            ]);
        }

        return $this->jsonSuccess($result);
    }

    public function deleteStockFiles(Request $request){
        Media::destroy($request->ids);
        return $this->jsonSuccess();
    }

    public function delete(User $user){

    }
}
