<?php

namespace App\Http\Controllers\Admin\Logo\LogoType;

use App\Http\Controllers\Admin\Logo\LogoController;
use App\Models\Logo\ColorCategory;
use App\Models\Logo\ColorPalette;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ColorController extends LogoController
{
    public function index()
    {
        if(request()->wantsJson())
        {
            $categories = ColorCategory::orderBy("order")
                ->withCount("palettes")
                ->latest()
                ->get();

            $gradientCats = $categories->where('gradient', 1);
            $solidCats = $categories->where('gradient', 0);

            $gradient = view("components.admin.logo.colorCategory", [
                "categories"=>$gradientCats
            ])->render();
            $solid = view("components.admin.logo.colorCategory", [
                "categories"=>$solidCats
            ])->render();
            $count['gradient'] = $gradientCats->count();
            $count['solid'] = $solidCats->count();

            return response()->json([
                'status'=>1,
                'gradient'=>$gradient,
                'solid'=>$solid,
                'count'=>$count
            ]);
        }
        return view('admin.logo.logoType.color');
    }
    public function categoryStore(Request $request)
    {
        try {
            $category = new ColorCategory();
            $validation = Validator::make(
                $request->all(),
                $category->storeRule($request)
            );
            if ($validation->fails())
                return $this->jsonError($validation->errors());

            $category->storeItem($request);

            return $this->jsonSuccess();

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }
    public function categorySort(Request $request)
    {
        try {

            $items = ColorCategory::select('id', 'name')
                ->where('gradient', $request->gradient)
                ->orderBy('order')
                ->get();

            $view = '';
            foreach($items as $item)
            {
                $view.='<li data-id="'.$item->id.'">'.$item->name.'</li>';
            }

            return $this->jsonSuccess($view);

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function categoryUpdateSort(Request $request)
    {
        try{
            $sorts = $request->get('sorts');

            foreach($sorts as $key=> $sort)
            {
                $item = ColorCategory::where("gradient", $request->gradient)->whereId($sort)->first();
                $item->order = $key+1;
                $item->save();
            }
            return $this->jsonSuccess();
        }
        catch(\Exception $e){
            return $this->jsonExceptionError($e);
        }
    }
    public function categoryDelete($id)
    {
        try {
            ColorCategory::findorfail($id)->delete();

            return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }

    public function item($id)
    {
        $category = ColorCategory::findorfail($id);
        if(request()->wantsJson()) {
            $items = ColorPalette::where("category_id", $id)->orderBy("order")->latest()->get();
            $palette = view("components.admin.logo.colorPalette", [
                "palettes"=>$items
            ])->render();
            $count['palette'] = $items->count();

            return response()->json([
                'status'=>1,
                'palette'=>$palette,
                'count'=>$count
            ]);
        }
        return view('admin.logo.logoType.palette', compact("category"));
    }
    public function itemCreate($id)
    {
        $category = ColorCategory::findorfail($id);
        if($category->gradient)
        {
            return view('admin.logo.logoType.paletteCreate', compact("category"));
        }else {

            return view('admin.logo.logoType.paletteCreateSolid', compact("category"));
        }
    }
    public function itemEdit($id)
    {
        $palette = ColorPalette::findorfail($id);
        if($palette->gradient)
        {
            return view('admin.logo.logoType.paletteEdit', compact("palette"));
        }else {
            return view('admin.logo.logoType.paletteEditSolid', compact("palette"));
        }
    }
    public function itemStore(Request $request, $id)
    {
        try {
            $category = ColorCategory::findorfail($id);

            $validation = Validator::make(
                $request->all(),
                [
                    'name'=>'required|max:191',
                    'attrs'=>'required',
                    'svg'=>'required'
                ]
            );
            if ($validation->fails())
                return $this->jsonError($validation->errors());

            $palette = new ColorPalette();
            $palette->category_id = $category->id;
            $palette->gradient = 1;
            $palette->name = $request->name;
            $palette->preview = $request->svg;
            $palette->data = $request->attrs;
            $palette->save();

            return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function solidStore(Request $request, $id)
    {
        try {
            $category = ColorCategory::findorfail($id);

            $validation = Validator::make(
                $request->all(),
                [
                    'color1'=>'required|max:191',
                    'color2'=>'required|max:191',
                    'color3'=>'required|max:191',
                    'color4'=>'required|max:191',
                    'color5'=>'required|max:191',
                    'name'=>'required|max:191',
                ]
            );
            if ($validation->fails())
                return $this->jsonError($validation->errors());

            $palette = new ColorPalette();
            $palette->category_id = $category->id;
            $palette->gradient = 0;
            $palette->name = $request->name;
            $palette->data = json_encode([
                'color1'=>$request->color1,
                'color2'=>$request->color2,
                'color3'=>$request->color3,
                'color4'=>$request->color4,
                'color5'=>$request->color5,
            ]);
            $palette->save();

            return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function solidUpdate(Request $request, $id)
    {
        try {
            $palette = ColorPalette::findorfail($id);
            $validation = Validator::make(
                $request->all(),
                [
                    'color1'=>'required|max:191',
                    'color2'=>'required|max:191',
                    'color3'=>'required|max:191',
                    'color4'=>'required|max:191',
                    'color5'=>'required|max:191',
                    'name'=>'required|max:191',
                ]
            );
            if ($validation->fails())
                return $this->jsonError($validation->errors());

            $palette->name = $request->name;
            $palette->data = json_encode([
                'color1'=>$request->color1,
                'color2'=>$request->color2,
                'color3'=>$request->color3,
                'color4'=>$request->color4,
                'color5'=>$request->color5,
            ]);
            $palette->save();

            return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function itemUpdate(Request $request, $id)
    {
        try {

            $validation = Validator::make(
                $request->all(),
                [
                    'name'=>'required|max:191',
                    'attrs'=>'required',
                    'svg'=>'required'
                ]
            );
            if ($validation->fails())
                return $this->jsonError($validation->errors());

            $palette = ColorPalette::findorfail($id);
            $palette->name = $request->name;
            $palette->preview = $request->svg;
            $palette->data = $request->attrs;
            $palette->save();

            return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }

    public function itemSort(Request $request)
    {
        try {

            $items = ColorPalette::select('id', 'name')
                ->where('category_id', $request->category)
                ->orderBy('order')
                ->get();

            $view = '';
            foreach($items as $item)
            {
                $view.='<li data-id="'.$item->id.'">'.$item->name.'</li>';
            }

            return $this->jsonSuccess($view);

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function itemUpdateSort(Request $request)
    {
        try{
            $sorts = $request->get('sorts');

            foreach($sorts as $key=> $sort)
            {
                $item = ColorPalette::where("category_id",$request->category)->whereId($sort)->first();
                $item->order = $key+1;
                $item->save();
            }
            return $this->jsonSuccess();
        }
        catch(\Exception $e){
            return $this->jsonExceptionError($e);
        }
    }
    public function itemDelete($id)
    {
        try {
            ColorPalette::findorfail($id)->delete();

            return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
}
