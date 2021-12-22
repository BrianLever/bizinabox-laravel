<?php

namespace App\Http\Controllers\Admin\Logo;

use App\Jobs\SendPackageToClient;
use App\Models\Logo\UserLogo;
use App\Services\GenerateLogoPackageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserLogoController extends LogoController
{
    public function __construct(UserLogo $model)
    {
        $this->model = $model;
    }

    public function index(Request $request)
    {
        $user_id = $request->user;

        if(request()->wantsJson())
        {
            return $this->model->getAdminDatatable(request("status"), $user_id);
        }
        return view('admin.logo.userLogo', compact("user_id"));
    }

    public function downloadLogoType($hash)
    {
        try {

            $logo = $this->model->where("hash", $hash)
                ->firstorfail();

            $file= $logo->preview()->first()->content;

            return $this->jsonSuccess($file);

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function preview($hash)
    {
        $logo = $this->model->where("hash", $hash)
            ->firstorfail()->generatePreview();

        return redirect(asset("/logotypes/preview/{$logo->hash}.png"));
    }
    public function progress(Request $request)
    {
        if($request->ajax())
        {
            $ids = $request->ids;
            $result = [];
            foreach($ids as $id)
            {
                $userLogo = UserLogo::find($id);
                if($userLogo)
                {
                    $result[$id] = view("components.account.progress", compact("userLogo"))->render();
                }
            }

            return $this->jsonSuccess($result);
        }else {
           echo "invalid";
        }
    }
    public function downloadPackage(GenerateLogoPackageService $service, $hash)
    {
        try {

            $logo = $this->model->where("hash", $hash)
                ->firstorfail();

            if($logo->downloadable === 1)
            {
                $pathToArchive = $service->setUserLogo($logo)->getArchivePath();

                if(Storage::disk('public')->exists($pathToArchive))
                {
                    $file = Storage::disk('public')->path($pathToArchive);
                    $headers = array(
                        "Content-Type: application/zip",
                    );

                    return \Response::download($file, "images.zip", $headers);
                }
            }

            $logo = $logo->setAsInProgress();

            dispatch(new SendPackageToClient($logo))->onQueue('high');

            return back()->with("success", "Success! It will be downloadable in a few minutes.");

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function delete($hash)
    {
        try {
            $this->model->where("hash", $hash)
                ->firstorfail()
                ->delete();

            return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }

}
