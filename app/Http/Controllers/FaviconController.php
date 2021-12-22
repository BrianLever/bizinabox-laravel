<?php

namespace App\Http\Controllers;

use App\Enums\HttpStatusEnum;
use App\Http\Requests\UserLogoRequest as UserFaviconRequest;
use App\Jobs\ActualizeFaviconPreview;
use App\Jobs\SendFaviconPackageToClient;
use App\Jobs\SendPackageToClient;
use App\Models\FaviconItem;
use App\Models\Logo\ColorCategory;
use App\Models\UserFavicon;
use App\Models\UserPalette;
use App\Repositories\FaviconRepository;
use App\Repositories\UserFaviconRepository;
use App\Repositories\UserLogoRepository;
use App\Services\FaviconService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class FaviconController extends Controller
{

    public UserFaviconRepository $userFavicon;

    public FaviconRepository $favicon;

    /**
     * FaviconController constructor.
     *
     * @param Request $request
     * @param UserFaviconRepository $userFavicon
     * @param FaviconRepository $favicon
     */
    public function __construct(
        Request $request,
        UserFaviconRepository $userFavicon,
        FaviconRepository $favicon
    )
    {
        $this->userFavicon = $userFavicon;
        $this->favicon = $favicon;
    }

    public function clearSession($faviconHash)
    {
        $count = 0;
        $keys = [];
        foreach (session()->all() as $key => $value) {
            if ((str_starts_with($key, $this->userFavicon::TEMP_USER_HASH) || str_starts_with($key, $this->userFavicon::TEMP_LOGO_HASH)) && strpos($key, $faviconHash) !== 0) {
                if ($count > 4) {
                    Session::forget($keys[$count - 4]);
                }
                $keys[$count] = $key;
                $count++;
            }
        }
    }


    public function chooseFavicon(UserLogoRepository $userLogoRepo, FaviconItem $faviconItem): object {
            $userFavicon = $this->userFavicon->createByFavicon($userLogoRepo, $faviconItem, true);
            return redirect()->route('favicon.edit', array_merge([$userFavicon->hash], request()->all()));
    }

    public function editFavicon($faviconHash): object
    {
        if (!session($this->userFavicon::TEMP_USER_HASH . $faviconHash)) {
            $userFavicon = UserFavicon::where("hash", $faviconHash)->first();
            if ($userFavicon) {
                $this->authorize('view', [UserFavicon::class, $userFavicon]);
                $userFavicon->setAsEdited();
            } else {
                return back()->with(['back' => true]);
            }
        } else {
            $userFavicon = session($this->userFavicon::TEMP_USER_HASH . $faviconHash);

            $this->clearSession($faviconHash);
        }

        $fontUrl = Storage::disk($this->favicon::DISK)->url('fonts/css/fonts.css');

        return view('frontend.favicon.editor', compact("faviconHash", "userFavicon",'fontUrl'));
    }

    public function getFavicon($faviconHash): object{

        try {

            $sessionUserFavicon= session($this->userFavicon::TEMP_USER_HASH . $faviconHash);

            if (!$sessionUserFavicon) {
                $userFavicon = UserFavicon::where("hash", $faviconHash)->firstorfail();
                $this->authorize('view', [UserFavicon::class, $userFavicon]);

                return response()->json([
                    'status' => 1,
                    'data' => [
                        'content' => $userFavicon->getEncryptedFaviconContent(),
                        'is_edited' => $this->userFavicon->isEdited($userFavicon),
                        'is_premium' => $userFavicon->favicon->premium,
                        'tutorial' => $userFavicon->favicon->tutorial->id,
                        'hash' => $userFavicon->favicon->hash,
                        'groups' => $userFavicon->favicon->getGroupFavicons()
                    ],
                ]);
            } else {

                return response()->json([
                    'status' => 1,
                    'data' => [
                        'content' => $sessionUserFavicon->getEncryptedFaviconContent(),
                        'is_edited' => false,
                        'is_premium' => $sessionUserFavicon->favicon->premium,
                        'tutorial' => $sessionUserFavicon->favicon->tutorial->id,
                        'hash' => $sessionUserFavicon->favicon->hash,
                        'groups' => $sessionUserFavicon->favicon->getGroupFavicons()
                    ],
                ]);
            }
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 0,
                'error' => $exception->getMessage(),
            ]);
        }
    }

    public function getPresetCategory()
    {
        try {
            $categories = ColorCategory::withCount('palettes')
                ->where("status", 1)
                ->orderBy("order")
                ->get(['id', 'name', 'slug', 'status', 'order', 'gradient', 'palettes_count']);

            if (auth()->check()) {
                $userGradient = UserPalette::where('user_id', auth()->user()->id)->where('gradient', 1)->get();
                $userSolid = UserPalette::where('user_id', auth()->user()->id)->where('gradient', 0)->get();
                $username = auth()->user()->username;
            }

            $gradient = $categories->where("gradient", 1);
            $solid = $categories->where("gradient", 0);

            return response()->json([
                'status' => 1,
                'gradient' => $gradient,
                'userGradient' => $userGradient ?? [],
                'userSolid' => $userSolid ?? [],
                'username' => $username ?? '',
                'solid' => $solid
            ]);
        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function saveFinal($faviconHash, UserFaviconRequest $request): object
    {
        try {
            $sessionUserFavicon = session($this->userFavicon::TEMP_USER_HASH . $faviconHash);
            $exit = $request->exit;

            $data['redirect'] = 0;
            $data['route'] = '';

            if (auth()->check()) {
                if (!$sessionUserFavicon) {
                    $userFavicon = UserFavicon::where("hash", $faviconHash)->firstorfail();
                    $this->authorize('saveFavicon', [UserFavicon::class, $userFavicon]);

                    if ($exit['version_type'] === 'create') {
                        $newHash = $this->userFavicon->createNewVersion($request->svgData, $userFavicon, $exit['version_name'] ?? 'default');
                        $data['redirect'] = 1;
                        $data['route'] = route('favicon.edit', $newHash);

                    } else {
                        $this->userFavicon->synchronize($request->svgData, $userFavicon->hash, $exit['version_name'] ?? $userFavicon->version);
                    }
                } else {
                    $this->userFavicon->saveUserFaviconFromGuestFavicon($request->svgData, $sessionUserFavicon, $exit['version_name'] ?? '');
                }
            } else {
                $sessionUserFavicon = $this->userFavicon->syncGuestFavicon($request->svgData, $sessionUserFavicon, $exit['version_name'] ?? '');

                session()->put(['sessionFavicon' => $sessionUserFavicon]);
                if ($request->exit == 0) {
                    session()->put(['url.intended' => route('favicon.edit', $sessionUserFavicon->hash)]);
                }
            }

            if ($exit['viewLiveAfterSaving'] ?? false) {
                $data['redirect'] = 1;
                $data['route'] = '/account/favicon/live';
            }

            return $this->jsonSuccess($data);

        } catch (\Exception $exception) {
            return $this->jsonExceptionError($exception);
        }
    }

    public function getFaviconPreviews(Request $request): object
    {
        $loadedLogos = (array)$request->get('loaded_logos');
        $total = UserFavicon::where("user_id", user()->id)->count();
        return response()->json([
            'logos' => $this->userFavicon->getLiveFavicons($loadedLogos),
            'total' => $total
        ]);
    }


    public function getFaviconPreview(UserFaviconRepository $userFaviconRepo, FaviconService $service, string $faviconHash): object{
        if (!session($userFaviconRepo::TEMP_USER_HASH . $faviconHash)) {
            $this->authorize('view', [UserFavicon::class, $userFaviconRepo]);
            // Actualize logo preview
            $userFavicon = UserFavicon::where("hash", $faviconHash)->firstorfail();
            dispatch(new ActualizeFaviconPreview($userFavicon));
        } else {
            $userFavicon = session($userFaviconRepo::TEMP_USER_HASH . $faviconHash);
        }
        $preview = $service->getFaviconPreview($userFavicon);

        return response()->json([
            'preview' => $preview,
        ]);
    }

    public function saveFavicon(Request $request, $faviconHash): object{
        try {
            $sessionUserLogo = session($this->userFavicon::TEMP_USER_HASH . $faviconHash);

            if (!$sessionUserLogo) {

                $userFavicon = UserFavicon::where("hash", $faviconHash)->firstorfail();
                $this->authorize('saveFavicon', [UserFavicon::class, $userFavicon]);

                $this->userFavicon->synchronize($request->svgData, $userFavicon->hash, $userFavicon->version);

            } else {

                $this->userFavicon->syncGuestFavicon($request->svgData, $sessionUserLogo, $sessionUserLogo->version ?? '');

            }

            return $this->jsonSuccess();
        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function downloadFavicon(UserFaviconRepository $userFavicon, FaviconService $service, string $faviconHash): object{
        if (!session($userFavicon::TEMP_USER_HASH . $faviconHash)) {
            $userLogo = UserFavicon::where("hash", $faviconHash)->firstorfail();
            dispatch(new ActualizeFaviconPreview($userLogo));
        } else {
            $userLogo = session($userFavicon::TEMP_USER_HASH . $faviconHash);
        }

        if (!user()) {
            session()->put(['favicon' => $userFavicon]);

            return response()->json([
                'type' => HttpStatusEnum::HTTP_SUCCESS,
                'isPurchased' => false,
                'message' => 'This is premium logo type or you are out of free logo download limits. Please purchase package.',
                'redirect' => route('package'),
            ]);
        }

        $content = $service->getFaviconPreview($userLogo);

        return response()->json([
            'type' => HttpStatusEnum::HTTP_SUCCESS,
            'isPurchased' => true,
            'content' => $content,
        ]);
    }

    public function downloadPackage(UserFaviconRepository $userFaviconRepo, string $faviconHash): object{
        $sessionFavicon = session($userFaviconRepo::TEMP_USER_HASH . $faviconHash);
        if (!$sessionFavicon) {
            $userFavicon = UserFavicon::where("hash", $faviconHash)->firstorfail();
        } else {
            $userFavicon = $userFaviconRepo->saveUserFaviconFromGuestFavicon(null, $sessionFavicon);
        }

        $userFavicon = $userFavicon->setAsInProgress();

        dispatch(new SendFaviconPackageToClient($userFavicon))->onQueue('high');

        return redirect()->route("user.favicon.index")
            ->with("success", "Success, A system will generate full package in a few minutes.");
    }
}
