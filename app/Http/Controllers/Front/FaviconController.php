<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\FaviconCategory;
use App\Models\FaviconItem;
use Illuminate\Http\Request;

class FaviconController extends Controller
{

    public $model;

    /**
     * FaviconController constructor.
     * @param $model
     */
    public function __construct(FaviconItem $model)
    {
        $this->model = $model;
    }

    public function index(): object{
        return view('frontend.favicon.index');
    }

    public function category($id){
        $category = FaviconCategory::where("id", $id)
            ->firstorfail();

        $items = $category->favicons;

        return view('frontend.favicon.category', compact("category","items"));
    }

    public function categories(){
        $categories = FaviconCategory::orderBy("order")
            ->get(['id', 'name']);

        if(count($categories)){
            $category = $categories[0];
        } else {
            $category = null;
        }

        $items = FaviconItem::with( "categories")
            ->where("status", 1)
            ->orderBy("order", "DESC")
            ->take(24);

        return view('frontend.favicon.category', compact('category','categories','items'));
    }
}
