<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\FaqCategory;
use App\Models\FaqItem;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public $model;

    public function __construct()
    {
        $this->model = new FaqItem();
    }
    public function index(Request $request)
    {
        if($request->ajax())
        {
            $result = $this->model->filterItem($request);
            return response()->json($result);
        }

        $categories = FaqCategory::select('id', 'slug', 'name')
            ->with('approvedItems')
            ->status(1)
            ->orderBy('order')
            ->get();
        return view('frontend.faq.index', compact('categories'));

    }
    public function detail($slug)
    {
        $item = $this->model->where('slug', $slug)
            ->with('media')
            ->status(1)
            ->firstorfail();
        return view('frontend.faq.detail', compact('item'));
    }
}
