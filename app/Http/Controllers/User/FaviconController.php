<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Jobs\SendFaviconPackageToClient;
use App\Models\UserFavicon;
use App\Services\GenerateFaviconPackageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class FaviconController extends Controller
{
    public $model;

    public function __construct(UserFavicon $model)
    {
        $this->model = $model;
    }

    public function index()
    {
        if (request()->wantsJson()) {
            return $this->model->getDatatable(request("status"));
        }
        return view('user.favicon.index');
    }

    public function editFavicon($faviconHash): object
    {
        $userFavicon = $this->model::where('hash',$faviconHash)->first();
        $this->clearSession($faviconHash);

        $fontUrl = Storage::disk("s3-pub-bizinabox")->url('fonts/css/fonts.css');

        return view('frontend.favicon.editor', compact("faviconHash", "userFavicon",'fontUrl'));
    }


    public function clearSession($faviconHash)
    {
        $count = 0;
        $keys = [];
        foreach(session()->all() as $key => $value)
        {
            if (strpos($key, 'temp_user_hash')===0 && strpos($key, $faviconHash)!==0)
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

    public function live()
    {
        $seo = option("seo_choose", []);
        return view('frontend.favicon.choose', compact("seo"));
    }

    public function downloadFavicon($hash): object
    {
        try {

            $favicon = $this->model->where("user_id", auth()->user()->id)
                ->where("hash", $hash)
                ->firstorfail();

            $file = $favicon->preview()->first()->content;

            if(request()->wantsJson()){
                return $this->jsonSuccess($file);
            }else{
                $image = str_replace('data:image/png;base64,', '', $file);
                $image = str_replace(' ', '+', $image);
                $image = base64_decode($image);

                $headers = [
                    'Content-type'        => 'image/png',
                    'Content-Disposition' => "attachment; filename=".$hash.".png",
                ];

                return Response::make($image, 200, $headers);

//                return response($image)->header('Content-Type', 'image/png');
            }

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function preview($hash): object
    {
        $userFavicon = $this->model->where("user_id", auth()->user()->id)
            ->where("hash", $hash)
            ->firstorfail()
            ->generatePreview();

        return Storage::disk($this->model::STORAGE_DISK)->response($userFavicon->getPreviewPath());
    }

    public function downloadPackage(GenerateFaviconPackageService $service, $hash)
    {
        try {
            $favicon = $this->model->where("user_id", auth()->user()->id)
                ->where("hash", $hash)
                ->firstorfail();

            if ($favicon->downloadable == 1) {
                $pathToArchive = $service->setUserFavicon($favicon)->getArchivePath();
                if (Storage::disk($this->model::STORAGE_DISK)->exists($pathToArchive)) {
                    return Storage::disk($this->model::STORAGE_DISK)->download($pathToArchive);
                }
            }

            $favicon = $favicon->setAsInProgress();

            dispatch(new SendFaviconPackageToClient($favicon))->onQueue('high');

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
                $userFavicon = UserFavicon::where("user_id", auth()->user()->id)
                    ->where("id", $id)
                    ->first();

                if ($userFavicon) {
                    $result[$id] = view("components.account.progress_favicon", compact("userFavicon"))->render();
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
            $userFavicon = $this->model->where("user_id", auth()->user()->id)
                ->where("hash", $hash)
                ->firstorfail();

            if($userFavicon->logo){
                $userFavicon->logo->delete();
            }

            $userFavicon->delete();

            return $this->jsonSuccess();

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }

    }

}
