<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\AppointmentList;
use App\Models\BaseModel;
use App\Models\BlogAdsListing;
use App\Models\BlogComment;
use App\Models\BlogPost;
use App\Models\Ticket;
use App\Models\Todo;
use App\Models\UserBlogPackage;
use App\Models\UserForm;
use App\Models\UserMeeting;
use App\Models\UserPackage;
use Illuminate\Http\Request;

class TodoController extends UserController
{

    public static $typeNames = [
        'blogPost',
        'blogAdsListing',
        'appointment',
        'ticket',
        'purchaseForm',
        'website',
        'domain',
        'website',
    ];

    public function index()
    {
        $types = $this->getTypes();
        foreach($types as $key=>$type)
        {
            if($type) return redirect()->route('user.todo.detail', $key);
        }
        return view(self::$viewDir.'todo.index');
    }
    public function getTodoCount()
    {
        return $this->jsonSuccess(collect((object)$this->getTypes())->sum());
    }
    public function detail($type)
    {
        if(!in_array($type, self::$typeNames))
            abort(404);

        $count=$this->getCounts($type);
        if($count==0) abort(404);

        if(request()->wantsJson())
        {
            $todos = $this->getTodos($type);

            return $this->jsonSuccess($todos);
        }
        $types = $this->getTypes();

        return view(self::$viewDir.'todo.detail', compact("type", "types", "count"));
    }
    public function getTypes()
    {
        $types = [];
        foreach(self::$typeNames as $typeName)
        {
            $types[$typeName] = $this->getCounts($typeName)?? null;
        }

        return $types;

    }
    public function getTodos($type)
    {
        $result = "";
        $perPage = 20;
        switch($type){
            case "blogPost":
                $todos = UserBlogPackage::where("status", "active")->my()->oldest()->paginate($perPage);
                $result = view("components.user.todo.blogPost", compact("todos"))->render();
                break;
            case "blogAdsListing":
                $todos = BlogAdsListing::with( 'spot')->whereIn("status", ["paid", "denied"])->my()->oldest()->paginate($perPage);
                $result = view("components.user.todo.blogAdsListing", compact("todos"))->render();
                break;
            case "appointment":
                $todos = UserMeeting::with( 'model')->where("status", "active")->my()->oldest()->paginate($perPage);
                $result = view("components.user.todo.appointment", compact("todos"))->render();
                break;
            case "ticket":
                $todos = Ticket::where("parent_id", 0)->my()->where("status", "answered")->oldest()->paginate($perPage);
                $result = view("components.user.todo.ticket", compact("todos"))->render();
                break;
            case "purchaseForm":
                $todos = UserForm::with('model')->whereIn("status", ["need to fill", "need revision"])->my()->oldest()->paginate($perPage);
                $result = view("components.user.todo.purchaseForm", compact("todos"))->render();
                break;
            case "website":
                $todos = UserPackage::where("status", "active")->my()->oldest()->paginate($perPage);
                $result = view("components.user.todo.website", compact("todos"))->render();
                break;
            case "domain":
                $todos = UserPackage::where("status", "active")
                    ->where("domain", "!=", 0)
                    ->where("domain_get", 0)
                    ->my()
                    ->oldest()
                    ->paginate($perPage);

                $result = view("components.user.todo.domain", compact("todos"))->render();
                break;
        }
        return $result;
    }

    public function getCounts($type)
    {
        $result = 0;
        switch($type){
            case "blogPost":
                $result = UserBlogPackage::where("status", "active")->my()->get()->sum('remain_post');
                break;
            case "blogAdsListing":
                $result = BlogAdsListing::whereIn("status", ["paid", "denied"])->my()->count();
                break;
            case "appointment":
                $result = UserMeeting::where("status", "active")->my()->get()->sum('available_number');
                break;
            case "ticket":
                $result = Ticket::where("parent_id", 0)->my()->where("status", "answered")->count();
                break;
            case "purchaseForm":
                $result = UserForm::whereIn("status", ["need to fill", "need revision"])->my()->count();
                break;
            case "website":
                $result = UserPackage::where("status", "active")->my()->get()->sum('remain_website');
                break;
            case "domain":
                $result = UserPackage::where("status", "active")->my()->where("domain", "!=", 0)->where("domain_get", 0)->count();
                break;
        }
        return $result;
    }
}
