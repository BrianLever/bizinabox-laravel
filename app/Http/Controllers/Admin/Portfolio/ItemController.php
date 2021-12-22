<?php

namespace App\Http\Controllers\Admin\Portfolio;

use App\Http\Controllers\Admin\AdminController;
use App\Models\NotificationTemplate;
use App\Models\Portfolio;
use App\Models\PortfolioCategory;
use Illuminate\Http\Request;
use Validator;

class ItemController extends AdminController
{
    public function __construct(Portfolio $model)
    {
        $this->model = $model;
    }

    public function index()
    {
        if (request()->wantsJson()) {
            $items = $this->model->select(['id', 'title', 'status', 'featured', 'new', 'approved_at', 'created_at', 'category_id'])
                ->with(['media', 'category.category'])
                ->latest()
                ->get();

            $activeItems = $items->where('status', 1);
            $inactiveItems = $items->where('status', 0);
            $pendingItems = $items->whereNull('approved_at');


            $all = view('components.admin.portfolioItem', [
                'items'=>$items,
                'selector'=>"datatable-all"
            ])->render();

            $active = view('components.admin.portfolioItem', [
                'items'=>$activeItems,
                'selector'=>"datatable-active"
            ])->render();

            $inactive = view('components.admin.portfolioItem', [
                'items'=>$inactiveItems,
                'selector'=>"datatable-inactive"
            ])->render();

            $pending = view('components.admin.portfolioItem', [
                'items'=>$pendingItems,
                'selector'=>"datatable-pending"
            ])->render();

            $count['all'] = $items->count();
            $count['active'] = $activeItems->count();
            $count['inactive'] = $inactiveItems->count();
            $count['pending'] = $pendingItems->count();

            return response()->json([
                'status'=>1,
                'all'=>$all,
                'active'=>$active,
                'inactive'=>$inactive,
                'pending'=>$pending,
                'count'=>$count
            ]);
        }
        return view(self::$viewDir.'portfolio.item');
    }
    public function create()
    {

        $categories = PortfolioCategory::where('parent_id', '==', 0)
            ->select('id', 'name')
            ->with('approvedSubCategories')
            ->status(1)
            ->get();

        return view(self::$viewDir.'portfolio.itemCreate', compact('categories'));
    }
    public function store(Request $request)
    {
        try {
            $validation = Validator::make($request->all(), $this->model->storeRule($request));
            if($validation->fails()) return response()->json(['status'=>0, 'data'=>$validation->errors()]);

            $item = $this->model->storeItem($request);
            $item->created_by = 'admin';
            $item->save();
            return $this->jsonSuccess($item);
        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }

    }
    public function edit($id)
    {
        $item = $this->model->with('media')
            ->where('id', $id)
            ->firstorfail();

        $categories = PortfolioCategory::where('parent_id', '==', 0)
            ->select('id', 'name')
            ->with('approvedSubCategories')
            ->status(1)
            ->get();
        return view(self::$viewDir . "portfolio.itemEdit", compact('item', 'categories'));
    }
    public function update(Request $request, $id)
    {
        try {
            $validation = Validator::make($request->all(), $this->model->storeRule($request));
            if($validation->fails()) return response()->json(['status'=>0, 'data'=>$validation->errors()]);

            $item = $this->model->find($id)->updateItem($request);

            return $this->jsonSuccess($item);

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }

    }

    public function approve($id){
        try {
            $item = $this->model->find($id);
            $item->approved_at = date('Y-m-d h:i:s');
            $item->save();
            $notification = new NotificationTemplate();
            $data = ['url'=>route('portfolio.index')];
            $notification->sendEmail($data, NotificationTemplate::PORTFOLIO_APPROVAL ,$item->creator->email);
            return back();
        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
}
