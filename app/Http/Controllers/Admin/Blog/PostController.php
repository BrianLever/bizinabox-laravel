<?php

namespace App\Http\Controllers\Admin\Blog;

use App\Http\Controllers\Admin\AdminController;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use App\Models\NotificationTemplate;
use Illuminate\Http\Request;
use Validator;

class PostController extends AdminController
{
    public function __construct(BlogPost $model)
    {
        $this->model = $model;
    }
    public function index()
    {
        if(request()->wantsJson())
        {
            return $this->model->getDatatable(request()->get("status"), request()->get("user"));
        }
        return view(self::$viewDir . "blog.post");
    }
    public function create()
    {
        $categories = BlogCategory::with('approvedTags')
            ->whereStatus(1)
            ->orderBy('order')
            ->get(['id', 'name']);

        $tags = BlogTag::whereStatus(1)
            ->orderBy('name')
            ->get(['id', 'name']);

        return view(self::$viewDir . "blog.createPost", compact("categories", "tags"));
    }
    public function store(Request $request)
    {
        try {
            $validation = Validator::make(
                $request->all(),
                $this->model->storeRule($request),
                $this->model::CUSTOM_VALIDATION_MESSAGE
            );
            if($validation->fails())
                return $this->jsonError($validation->errors());

            $item = $this->model->storeItem($request);

            return $this->jsonSuccess($item);
        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function show($id)
    {
        $post = $this->model->with('media', 'user', 'tags', 'category')->findorfail($id);

        return view(self::$viewDir . "blog.showPost", compact("post"));
    }
    public function edit($id)
    {
        $post = $this->model->findorfail($id);
        $categories = BlogCategory::with('approvedTags')
            ->select('id', 'name')
            ->whereStatus(1)
            ->orderBy('order')
            ->get();

        $tags = BlogTag::whereStatus(1)
            ->orderBy('name')
            ->get();
        return view(self::$viewDir . "blog.editPost", compact("post", "categories", "tags"));
    }
    public function update(Request $request, $id)
    {
        try {
            $validation = Validator::make(
                $request->all(),
                $this->model->updateRule($request),
                $this->model::CUSTOM_VALIDATION_MESSAGE
            );
            if($validation->fails())
            {
                return response()->json([
                    'status'=>0,
                    'data'=>$validation->errors()
                ]);
            }
            $item = $this->model->findorfail($id)->updateItem($request);

            return $this->jsonSuccess($item);

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function switchPost(Request $request)
    {
        try {
            $action = $request->action;
            $notification = new NotificationTemplate();
            $slug='';
            $notify = 0;

            $posts = $this->model->with('user')
                ->whereIn('id', $request->ids)
                ->get();

            if($action==='approve')
            {
                $posts->each->update(['status'=>'approved', 'denied_reason'=>$request->denied_reason]);
                $slug= $notification::BLOG_POST_APPROVED;
                $notify = 1;

            }elseif($action==='deny')
            {
                $posts->each->update(['status'=>'denied', 'denied_reason'=>$request->denied_reason]);
                $data['reason'] = $request->denied_reason;
                $slug= $notification::BLOG_POST_DENIED;
                $notify = 1;

            }elseif($action==='featured')
            {
                $posts->each->update(['featured'=>1]);
            }elseif($action==='unfeatured')
            {
                $posts->each->update(['featured'=>0]);
            }elseif($action==='publish')
            {
                $posts->each->update(['is_published'=>1]);
            }elseif($action==='draft')
            {
                $posts->each->update(['is_published'=>0]);
            }elseif($action==='delete')
            {
                $posts->each->delete();
            }

            if($notify==1)
            {
                foreach($posts as $post)
                {
                    $data['url'] = route('user.blog.detail', $post->id);
                    $data['username'] = $post->user->name;
                    $notification->sendNotification($data, $slug, $post->user);
                }
            }

            return $this->jsonSuccess($action);

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
}
