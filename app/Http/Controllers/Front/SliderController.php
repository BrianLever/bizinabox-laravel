<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function detail($id)
    {
        $slider = Slider::findorfail($id);
        $model = $slider->model;
        $slug = $slider->modelToSlug($slider->model_type);
        if($slug=='blogPackage')
        {
            return redirect()->route('blog.package.detail', $model->slug);
        }elseif($slug=='blogAds')
        {
            return redirect()->route('blogAds.spot', $model->slug);
        }
        if(\Route::has($slug. ".detail")&&$model->slug!=null)
        {
            return redirect()->route($slug. ".detail", $model->slug);
        }else {
            return back();
        }
    }
}
