<?php

namespace App\Http\Controllers\Admin\Logo\LogoType;

use App\Http\Controllers\Controller;
use App\Models\Logo\LogoCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public $model;
    public $sortModel;

    public function __construct(LogoCategory $model)
    {
        $this->model = $model;
        $this->sortModel = $this->model;
    }


    public function index()
    {
        if(request()->wantsJson())
        {
            try {
                $categories = $this->model->with('logoTypes')
                    ->latest()
                    ->get(['id', 'name', 'description', 'order', 'created_at']);

                $all = view('components.admin.logo.logoTypeCategory', [
                    'categories'=>$categories,
                    'selector'=>"datatable-all"
                ])->render();

                $count['all'] = $categories->count();

                return response()->json([
                    'status'=>1,
                    'all'=>$all,
                    'count'=>$count
                ]);
            }catch (\Exception $exception){
               return $this->jsonExceptionError($exception);
            }
        };
        return view('admin.logo.logoType.category');
    }

    public function getSort(Request $request)
    {
        try{
            if($request->cat_id==0)
            {
                $items = $this->sortModel->select('id', 'name')
                    ->orderBy('order')
                    ->get();

                $view = '';
                foreach($items as $item)
                {
                    $view.='<li data-id="'.$item->id.'">'.$item->name.'</li>';
                }
            }else {
                $category = $this->model->findorfail($request->cat_id);
                $logoTypes = $category->logoTypes->sortBy("pivot.order");

                $view = '';
                foreach($logoTypes as $logoType)
                {
                    $view.='<li data-id="'.$logoType->id.'"><img src="'.$logoType->preview.'" style="height:30px;margin-right:20px;"/>'.$logoType->name.'</li>';
                }
            }

            return $this->jsonSuccess($view);
        }
        catch(\Exception $e){
            return $this->jsonExceptionError($e);
        }
    }
    public function updateSort(Request $request)
    {
        try{
            $sorts = $request->get('sorts');
            if($request->cat_id==0)
            {
                foreach($sorts as $key=> $sort)
                {
                    $item = $this->model->find($sort);
                    $item->order = $key+1;
                    $item->save();
                }
            }else {
                foreach($sorts as $key=> $sort)
                {
                    \DB::table('logo_category_types')->where("category_id", $request->cat_id)
                        ->where("logotype_id", $sort)
                        ->update(['order'=>$key+1]);
                }
            }
            return $this->jsonSuccess();
        }
        catch(\Exception $e){
            return $this->jsonExceptionError($e);
        }
    }
    public function store(Request $request)
    {
        try {
            $validation = Validator::make(
                $request->all(),
                $this->model->storeRule($request)
            );
            if ($validation->fails())
                return $this->jsonError($validation->errors());

            $this->model->storeItem($request);

            return $this->jsonSuccess();

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }
    public function delete($id)
    {
        try {
            $this->model->findorfail($id)->delete();

            return $this->jsonSuccess();

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

}
