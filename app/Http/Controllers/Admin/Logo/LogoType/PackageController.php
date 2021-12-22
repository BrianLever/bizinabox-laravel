<?php

namespace App\Http\Controllers\Admin\Logo\LogoType;

use App\Http\Controllers\Admin\Logo\LogoController;
use App\Integration\Stripe;
use App\Models\Logo\LogoPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PackageController extends LogoController
{
    public function __construct(LogoPackage $model)
    {
        $this->model = $model;
        $this->sortModel = $model;
    }
    public function index()
    {
        $packages = LogoPackage::orderBy("status")
            ->orderBy("order")
            ->get();
        return view('admin.logo.package', compact("packages"));
    }
    public function store(Request $request)
    {
        try {
            $validation = Validator::make($request->all(), $this->model->storeRule($request));
            if($validation->fails()) return $this->jsonError($validation->errors());

            if($request->package_id)
            {
                $this->model->findorfail($request->package_id)
                    ->storeItem($request);
            }else {
                $this->model->storeItem($request);
            }
            return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function freeOffer(Request $request)
    {
        $this->validate($request, [
            'count'=>'required|integer|min:0'
        ]);
        option(["free_offer_logo"=>$request->count]);

        return back()->with("success", "Success!");
    }
    public function delete($id)
    {
        try {
            $package = $this->model->findorfail($id);
            $oldId = null;
            if($package->recurrent)
            {
                $oldId = json_decode($package->meta)->stripe_id?? null;
            }
            $package->delete();

            if($oldId)
            {
                $stripe = new Stripe();
                $stripe->deletePlan($oldId);
            }

            return $this->jsonSuccess();
        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }

}
