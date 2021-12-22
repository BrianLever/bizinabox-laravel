<?php

namespace App\Http\Controllers\Admin\Setting;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;

class SeoController extends AdminController
{

    public function index()
    {
        $seo = option("seo", null);

        return view(self::$viewDir . "setting.seo", compact("seo"));
    }
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
           'title'=>'required|max:191',
            'image'=>'image|mimes:jpeg,png,jpg|max:2048'
        ]);
        if ($validation->fails()) {
            return response()->json([
                'status' => 0,
                'data' => $validation->errors()
            ]);
        }

        $old_seo = option("seo", null);

        $seo['title'] = $request->title;
        $seo['keywords'] = $request->keywords;
        $seo['description'] = $request->description;
        $seo['head_code'] = $request->head_code;
        $seo['bottom_code'] = $request->bottom_code;

        if($file=$request->image)
        {
            $name = "meta_img." . $file->getClientOriginalExtension();

            $file->move(public_path('assets/img'), $name);

            $seo['image'] = asset('assets/img/'.$name);
        }else {
            $seo['image'] = optional($old_seo)['image'];
        }
        option(['seo'=>$seo]);

        return response()->json([
            'status' => 1,
            'data' => 1
        ]);
    }
}
