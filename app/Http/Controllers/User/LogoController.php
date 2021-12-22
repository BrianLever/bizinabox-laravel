<?php

namespace App\Http\Controllers\User;

use App\Enums\HttpStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserLogoRequest;
use App\Jobs\ActualizeLogoPreview;
use App\Jobs\SendLinkToEditor;
use App\Models\Logo\ColorCategory;
use App\Models\Logo\ColorPalette;
use App\Models\Logo\LogoCategory;
use App\Models\Logo\LogoType;
use App\Models\Tutorial;
use App\Models\Logo\UserLogo;
use App\Repositories\LogotypeRepository;
use App\Repositories\UserLogoRepository;
use App\Services\LogotypeService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

class LogoController extends Controller
{
    use Notifiable;

    /**
     * @var LogotypeRepository
     */
    protected $logotype;

    /**
     * @var mixed
     */
    protected $company;

    /**
     * @var UserLogoRepository
     */
    protected $userLogo;

    /**
     * LogoController constructor.
     *
     * @param Request            $request
     * @param UserLogoRepository $userLogo
     * @param LogotypeRepository $logotype
     */
    public function __construct(
        Request $request,
        UserLogoRepository $userLogo,
        LogotypeRepository $logotype
    ) {
        $this->company = $request->get('company');
        $this->userLogo = $userLogo;
        $this->logotype = $logotype;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $seo = option("seo_home", []);
//        return view('index', compact("seo"));

        $recommendLogoTypes = LogoType::where("recommend", 1)
            ->where("enabled", 1)
            ->orderBy("order")->get();

        return view('frontend.home', compact("seo", "recommendLogoTypes"));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showChooseLogo()
    {
        $seo = option("seo_choose", []);
        return view('choose', compact("seo"));
    }
    public function getPresetCategory()
    {
        try {
            $categories = ColorCategory::withCount('palettes')
                ->where("status", 1)
                ->orderBy("order")
                ->get(['id', 'name', 'slug', 'status', 'order', 'gradient', 'palettes_count']);

            $gradient = $categories->where("gradient", 1);
            $solid = $categories->where("gradient", 0);
            return response()->json([
                'status'=>1,
                'gradient'=>$gradient,
                'solid'=>$solid
            ]);
        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function getPresetItem($category_id)
    {
        try {
            $category = ColorCategory::where("id", $category_id)
                ->where("status", 1)
                ->firstorfail();

            $items = ColorPalette::where("category_id", $category->id)
                ->orderBy("order")
                ->get(['category_id', 'gradient', 'name', 'preview', 'data', 'order']);

            return $this->jsonSuccess($items);
        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function getCategories()
    {
        $categories = LogoCategory::orderBy("order")
            ->withCount("activeLogoTypes")
            ->get(['id', 'name', 'description']);

        return response()->json(['categories'=>$categories]);
    }
    public function getTutorial($id)
    {
        $item = Tutorial::where("id", $id)
            ->where("status", 1)
            ->first();

        $view = view("components.front.tutorialVideo", compact("item"))->render();
        return $this->jsonSuccess($view);
    }

    /**
     * @param LogoType $logotype
     *
     * @return RedirectResponse
     * @throws AuthorizationException
     * @throws \Throwable
     */
    public function chooseLogo(LogoType $logotype)
    {
        $userLogo = $this->userLogo->createByLogo($logotype);

        return redirect()->route('logotypes.edit', array_merge([$userLogo->hash], request()->all()));
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
                    \Session::forget($keys[$count-4]);
                }
                $keys[$count] = $key;
                $count++;
            }
        }

    }
    public function editLogo($logoHash)
    {
        if(!session($this->userLogo::TEMP_USER_HASH.$logoHash))
        {
            $userLogo = UserLogo::where("hash", $logoHash)->first();
            if($userLogo){
                $this->authorize('view', [UserLogo::class, $userLogo]);
                $userLogo->setAsEdited();
            } else {
                return  back()->with(['back'=>true]);
            }
        }else {
            $userLogo = session($this->userLogo::TEMP_USER_HASH.$logoHash);

            $this->clearSession($logoHash);
        }

        $logoFontUrl = Storage::disk('s3-pub-bizinabox')->url('fonts/css/fonts.css');

        return view('frontend.logo.editor', compact("logoHash", "userLogo",'logoFontUrl'));
    }

    /**
     * @param UserLogo $userLogo
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws AuthorizationException
     */
    public function sendEditorLink(UserLogo $userLogo): JsonResponse
    {
        $this->authorize('view', [UserLogo::class, $userLogo]);

        // Send email notification
        dispatch(new SendLinkToEditor([
            'email'    => $userLogo->user->email,
            'edit_url' => route('logotypes.edit', $userLogo->hash),
        ]));

        return response()->json([
            'status'  => HttpStatusEnum::HTTP_SUCCESS,
            'message' => __('client.editor.edit_link'),
        ]);
    }

    /**
     * @param string $logoHash
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function getLogo($logoHash)
    {
        $sessionUserLogo = session($this->userLogo::TEMP_USER_HASH.$logoHash);
        if(!$sessionUserLogo) {
            $userLogo = UserLogo::where("hash", $logoHash)->firstorfail();
            $this->authorize('view', [UserLogo::class, $userLogo]);

            return response()->json([
                'logotype' => [
                    'content'   => $userLogo->getEncryptedLogoContent(),
                    'is_edited' => $this->userLogo->isEdited($userLogo),
                    'is_premium' => $userLogo->logo->premium,
                    'tutorial' => $userLogo->logo->tutorial->id,
                    'hash' => $userLogo->logo->hash,
                    'groupLogos'=>$userLogo->logo->getGroupLogos()
                ],
            ]);
        }else {

            return response()->json([
                'logotype' => [
                    'content'   => $sessionUserLogo->getEncryptedLogoContent(),
                    'is_edited' => false,
                    'is_premium' => $sessionUserLogo->logo->premium,
                    'tutorial' => $sessionUserLogo->logo->tutorial->id,
                    'hash' => $sessionUserLogo->logo->hash,
                    'groupLogos'=>$sessionUserLogo->logo->getGroupLogos()
                ],
            ]);
        }
    }

    /**
     * @param string        $logoHash
     * @param UserLogoRequest $request
     *
     * @throws AuthorizationException
     * @throws \Throwable
     */
    public function saveLogo($logoHash, UserLogoRequest $request)
    {
        try {
            $sessionUserLogo = session($this->userLogo::TEMP_USER_HASH.$logoHash);

            if(!$sessionUserLogo){

                $userLogo = UserLogo::where("hash", $logoHash)->firstorfail();
                $this->authorize('saveLogo', [UserLogo::class, $userLogo]);

                $this->userLogo->synchronize($request->logotype, $userLogo->hash, $userLogo->version);
            }else {
                $this->userLogo->syncGuestLogo($request->logotype, $sessionUserLogo, $sessionUserLogo->version?? '');
            }
            return $this->jsonSuccess();
        } catch (\Exception $e){
            return $this->jsonExceptionError($e);
        }
    }
    public function saveLogoFinal($logoHash, UserLogoRequest $request)
    {
        try {
            $sessionUserLogo = session($this->userLogo::TEMP_USER_HASH.$logoHash);
            $exit = $request->exit;

            $data['redirect'] = 0;
            $data['route'] = '';

            if(auth()->check())
            {
                if(!$sessionUserLogo){
                    $userLogo = UserLogo::where("hash", $logoHash)->firstorfail();
                    $this->authorize('saveLogo', [UserLogo::class, $userLogo]);

                    if($exit['version_type']==='create')
                    {
                        $newHash = $this->userLogo->createNewVersion($request->logotype, $userLogo, $exit['version_name']?? 'default');

                        $data['redirect'] = 1;
                        $data['route'] = route('logotypes.edit', $newHash);

                    }else {
                        $this->userLogo->synchronize($request->logotype, $userLogo->hash, $exit['version_name']?? $userLogo->version);
                    }
                }else {
                    $this->userLogo->saveUserLogoFromGuestLogo($request->logotype, $sessionUserLogo, $exit['version_name']?? '');
                }
            }else {
                $sessionUserLogo = $this->userLogo->syncGuestLogo($request->logotype, $sessionUserLogo, $exit['version_name']?? '');

                session()->put(['sessionLogo'=>$sessionUserLogo]);
                if($request->exit==0)
                {
                    session()->put(['url.intended'=>route('logotypes.edit', $sessionUserLogo->hash)]);
                }
            }

            return $this->jsonSuccess($data);
        } catch (\Exception $exception){
            return  $this->jsonExceptionError($exception);
        }
    }
    public function saveUserLogo($logoHash)
    {
        $sessionUserLogo = session($this->userLogo::TEMP_USER_HASH.$logoHash);

        if($sessionUserLogo) {

            $this->userLogo->saveUserLogoFromGuestLogo(null, $sessionUserLogo);

            return redirect()->route('user.logotypes.index');
        }else {
            return back()->with("error", "Sorry, sessino is expired");
        }
    }
    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLogoPreviews(Request $request)
    {
        $loadedLogos = (array) $request->get('loaded_logos');
        $total = UserLogo::where("user_id", user()->id)->count();
        return response()->json([
            'logos'=>$this->userLogo->getLiveLogos($loadedLogos),
            'total'=>$total
        ]);
//        return response()->json($this->logotype->getPreviewPaths($category, $loadedLogos));
    }

    /**
     * @param string $logoHash
     *
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function getLogoPreview(UserLogoRepository $userLogo, LogotypeService $service, string $logoHash): JsonResponse
    {
        if(!session($userLogo::TEMP_USER_HASH.$logoHash))
        {
            $this->authorize('view', [UserLogo::class, $userLogo]);
            // Actualize logo preview
            $userLogo = UserLogo::where("hash", $logoHash)->firstorfail();
            dispatch_now(new ActualizeLogoPreview($userLogo));
        }else {
            $userLogo = session($userLogo::TEMP_USER_HASH.$logoHash);
        }

        $preview = $service->getLogoPreview($userLogo);

        return response()->json([
            'preview' => $preview,
        ]);
    }
}
