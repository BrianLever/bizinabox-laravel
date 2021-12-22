<?php

namespace App\Http\Controllers\Admin\Favicon;

use App\Http\Controllers\Controller;
use App\Models\FaviconCategory;
use App\Traits\Crud;
use Illuminate\Http\Request;

class FaviconCategoryController extends Controller
{
    use Crud;

    public object $model;
    public object $sortModel;

    public function __construct(FaviconCategory $model)
    {
        $this->model = $model;
        $this->sortModel = $this->model;
    }

    public function model(): FaviconCategory
    {
        return $this->model;
    }

    public function  index(Request $request): object{

        if($request->ajax()){
            $categories = FaviconCategory::orderBy('order','asc')->get();
            $data = [];
            foreach ($categories as $category){
                array_push($data, $category->dataTableRow());
            }
            return response()->json(['data'=>$data]);
        }

        return view('admin.favicon.categories');
    }

    public function getSort(Request $request): object
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
                $favicons = $category->favicons->sortBy("pivot.order");

                $view = '';
                foreach($favicons as $favicon)
                {
                    $view.='<li data-id="'.$favicon->id.'"><img src="'.$favicon->preview.'" style="height:30px;margin-right:20px;"/>'.$favicon->name.'</li>';
                }
            }

            return $this->jsonSuccess(['view'=>$view]);
        }
        catch(\Exception $e){
            return $this->jsonExceptionError($e);
        }
    }

    public function updateSort(Request $request): object
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
}
