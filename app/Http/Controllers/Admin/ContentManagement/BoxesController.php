<?php

namespace App\Http\Controllers\Admin\ContentManagement;

use App\Http\Controllers\Admin\AdminController;
use App\Models\HomeBox;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class BoxesController extends AdminController
{

    public function __construct(HomeBox $model)
    {
        $this->model = $model;
    }

    public function index(Request $request)
    {
        if($request->wantsJson()){
            $boxes = HomeBox::with('media')->get();

            return response()->json([
                'status'=>1,
                'table' => view('components.admin.home-boxes', compact('boxes'))->render(),
            ]);
        }

        return view('admin.content-management.boxes');
    }

    public function middleBox(Request $request){

        $validator = Validator::make($request->all(),[
            'image'=>'required',
            'link'=>'required',
        ]);

        if($validator->fails()){
            return $this->jsonError($validator->errors());
        }

        $imageName = option('home.front.box.image','');
        $thumbName = option('home.front.box.image-thumb','');
        clearUploadFiles([$imageName, $thumbName]);

        $imageName = "uploads/".guid().'.png';
        $thumbName = "uploads/".guid().'.png';
        $image = json_decode($request->image)->output->image;

        $image = preg_replace('/data:image\/((jpeg)|(png)|(jpg)|(gif));base64,/i','',$image);

        Storage::disk('public')
            ->put($imageName, base64_decode($image));
        $path = Storage::disk('public')->path($imageName);
        Image::make($path)->resize(60, 40)->save(Storage::disk('public')->path($thumbName));

        option([
            'home.front.box.image'=> $imageName,
            'home.front.box.image-thumb'=> $thumbName,
            'home.front.box.link'=>$request->link
        ]);

        return $this->jsonSuccess();
    }

    public function store(Request $request)
    {
        try {
            $validation = Validator::make(
                $request->all(),
                $this->model->storeRule($request),
            );

            if ($validation->fails()) {
                return response()->json([
                    'status' => 0,
                    'data' => $validation->errors()
                ]);
            }

            $status = $request->status? 1:0;
            $request->merge(['status'=>$status]);

            $data = $request->only('name', 'description', 'link', 'status');

            if($request->box_id === null){
                $box = $this->model->create($data);

                $box->addMediaFromBase64(json_decode($request->image)->output->image)
                    ->usingFileName(guid() . ".jpg")
                    ->toMediaCollection('image');

            }else{
                $box = $this->model->find( $request->box_id);
                $box->update($data);

                if($request->image)
                {
                    $box->clearMediaCollection('image')
                        ->addMediaFromBase64(json_decode($request->image)->output->image)
                        ->usingFileName(guid() . ".jpg")
                        ->toMediaCollection('image');
                }
            }

            return response()->json(['status' => 1, 'data' => $box]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 0,
                'data' => [json_encode($e->getMessage())]
            ]);
        }
    }
}
