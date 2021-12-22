<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Logo\LogoCategory;
use App\Models\Logo\LogoType;
use Illuminate\Http\Request;

class LogoController extends Controller
{

    public $model;

    /**
     * LogoController constructor.
     * @param $model
     */
    public function __construct(LogoType $model)
    {
        $this->model = $model;
    }


    public function index(): object
    {
        return view('frontend.logo.index');
    }

    public function categories(Request $request)
    {
//        if($request->ajax())
//        {
//            $result = $this->model->filterItem($request);
//            return response()->json($result);
//        }

        $categories = LogoCategory::orderBy("order")
            ->get(['id', 'name']);

        if(count($categories)){
            $category = $categories[0];
        } else {
            $category = null;
        }

        $items = LogoType::with( "categories")
            ->where("enabled", 1)
            ->orderBy("order", "DESC")
            ->take(24);

        return view('frontend.logo.category', compact('category','categories','items'));
    }

    public function category($id)
    {
        $category = LogoCategory::where("id", $id)
            ->firstorfail();

        $items = $category->logoTypes;

        return view('frontend.logo.category', compact("category","items"));
    }
}
