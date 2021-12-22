<?php

namespace App\Http\Controllers\Admin\Logo\LogoType;

use App\Http\Controllers\Controller;
use App\Models\Logo\Font;
use App\Repositories\FontRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FontController extends Controller
{

    public $model;
    public $fonts;

    public function __construct(Font $model, FontRepository $fonts)
    {
        $this->model = $model;
        $this->fonts = $fonts;
    }
    public function index()
    {
        if(request()->wantsJson())
        {
            return $this->model->getDatatable();
        }
        return view('admin.logo.logoType.font');
    }

    public function delete($id)
    {
        try {
            $this->model->findorfail($id)->deleteItem();

            return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), ['fonts'=>'required']);

        if($validator->passes()){

            ini_set('max_execution_time', 1200000);

            foreach ($request->fonts as $font){
                $this->fonts->create(['font'=> $font]);
            }

            return  $this->jsonSuccess();
        }

        return response()->json(['status'=>0, 'errors'=>$validator->errors()->all()]);
    }
}
