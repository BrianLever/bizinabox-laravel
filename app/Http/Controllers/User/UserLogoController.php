<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Jobs\SendPackageToClient;
use App\Models\Logo\UserLogo;
use App\Services\GenerateLogoPackageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class UserLogoController extends Controller
{
    public $model;

    public function __construct(UserLogo $model)
    {
        $this->model = $model;
    }

    public function index()
    {
        if (request()->wantsJson()) {
            return $this->model->getDatatable(request("status"));
        }

        return view('user.logo.index');
    }

    public function editLogo($logoHash)
    {
        $userLogo = $this->model::where('hash',$logoHash)->first();
        $this->clearSession($logoHash);

        $logoFontUrl = Storage::disk('s3-pub-bizinabox')->url('fonts/css/fonts.css');

        return view('frontend.logo.editor', compact("logoHash", "userLogo","logoFontUrl"));
    }

    /**
     * @param string $logoHash
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function clearSession($logoHash)
    {
        $count = 0;
        $keys = [];
        foreach(session()->all() as $key => $value)
        {
            if (strpos($key, 'temp_user_hash')===0&&strpos($key, $logoHash)!==0)
            {
                if($count>4)
                {
                    Session::forget($keys[$count-4]);
                }
                $keys[$count] = $key;
                $count++;
            }
        }
    }

    public function live(): object
    {
        $seo = option("seo_choose", []);
        return view('frontend.logo.choose', compact("seo"));
    }

    public function downloadLogoType($hash): object
    {
        try {

            $logo = $this->model->where("user_id", auth()->user()->id)
                ->where("hash", $hash)
                ->firstorfail();

            $file = $logo->preview()->first()->content;

            if(request()->wantsJson()){
                return $this->jsonSuccess($file);
            }else{
                return $file;
            }

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function preview($hash)
    {
        $userLogo = $this->model->where("user_id", auth()->user()->id)
            ->where("hash", $hash)
            ->firstorfail()
            ->generatePreview();

        return Storage::disk($this->model::STORAGE_DISK)->response($userLogo->getPreviewPath());
    }

    public function downloadPackage(GenerateLogoPackageService $service, $hash)
    {

        try {
            $logo = $this->model->where("user_id", auth()->user()->id)
                ->where("hash", $hash)
                ->firstorfail();

            if ($logo->downloadable == 1) {

                $pathToArchive = $service->setUserLogo($logo)->getArchivePath();

                return Storage::disk('s3-pub-bizinabox')->download($pathToArchive);

            }

            $logo = $logo->setAsInProgress();

            dispatch(new SendPackageToClient($logo))->onQueue('high');

            return back()->with("success", "Success! It will be downloadable in a few minutes.");

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function progress(Request $request)
    {
        if ($request->ajax()) {
            $ids = $request->ids;
            $result = [];
            foreach ($ids as $id) {
                $userLogo = UserLogo::where("user_id", auth()->user()->id)
                    ->where("id", $id)
                    ->first();

                if ($userLogo) {
                    $result[$id] = view("components.account.progress_user", compact("userLogo"))->render();
                }
            }

            return $this->jsonSuccess($result);
        } else {
            echo "invalid";
        }
    }

    public function delete($hash)
    {
        try {
            $userLogo = $this->model->where("user_id", auth()->user()->id)
                ->where("hash", $hash)
                ->firstorfail();

            if($userLogo->favicon){
                $userLogo->favicon->delete();
            }

            $userLogo->delete();

            return $this->jsonSuccess();

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }
}
