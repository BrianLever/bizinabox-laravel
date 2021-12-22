<?php

namespace App\Http\Controllers;

use App\Enums\HttpStatusEnum;
use App\Enums\PurchaseTypeEnum;
use App\Jobs\ActualizeLogoPreview;
use App\Jobs\SendLogotypeToClient;
use App\Jobs\SendPackageToClient;
use App\Models\Logo\UserLogo;
use App\Repositories\UserLogoRepository;
use App\Services\BuyLogoService;
use App\Services\LogotypeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LogoPurchaseController extends Controller
{
    /**
     * @var BuyLogoService
     */
    protected $buyLogoService;


    /**
     * LogoController constructor.
     *
     * @param BuyLogoService $buyLogoService
     */
    public function __construct(BuyLogoService $buyLogoService)
    {
        $this->buyLogoService = $buyLogoService;
    }

    /**
     * @param string $logoHash
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function downloadPackage(UserLogoRepository $userLogoRepo, string $logoHash)
    {
        $sessionLogo = session($userLogoRepo::TEMP_USER_HASH.$logoHash);
        if(!$sessionLogo)
        {
            $userLogo = UserLogo::where("hash", $logoHash)->firstorfail();
        }else {
            $userLogo = $userLogoRepo->saveUserLogoFromGuestLogo(null, $sessionLogo);
        }

        if(!user()->isDownloadPossible($userLogo))
        {
            session()->put(['logo'=>$userLogo]);
            return redirect()->route('package')->with("info", "This is premium logo type or you are out of free logo download limits. Please purchase package.");
        }
        $userLogo = $userLogo->setAsInProgress();

        dispatch(new SendPackageToClient($userLogo))->onQueue('high');

        return redirect()->route("user.logotypes.index")
            ->with("success", "Success, A system will generate full package in a few minutes.");


//        return redirect()->to(back()->getTargetUrl().'?'.http_build_query([
//                'type'     => HttpStatusEnum::HTTP_SUCCESS,
//                'message'  => trans('client.purchase.package.success', ['email' => $userLogo->user->email]),
//                'duration' => 0,
//            ]));
//
//        try {
//            $this->authorize('neededPurchasePackage', [UserLogo::class, $userLogo]);
//
//            // Redirect to payment cart if logo is not purchased
//            return redirect()->to($this->buyLogoService->getPaymentCartUrl($userLogo, PurchaseTypeEnum::PACKAGE));
//        } catch (AuthorizationException $e) {
//            // Send archive to email
//            dispatch(new SendPackageToClient($userLogo))->onQueue('high');
//
//            return redirect()->to(back()->getTargetUrl().'?'.http_build_query([
//                    'type'     => HttpStatusEnum::HTTP_SUCCESS,
//                    'message'  => trans('client.purchase.package.success', ['email' => $userLogo->user->email]),
//                    'duration' => 0,
//                ]));
//        } catch (\Throwable $e) {
//            return redirect()->route('client.profile.show', [
//                'type'     => HttpStatusEnum::HTTP_ERROR,
//                'message'  => trans('client.purchase.package.error'),
//                'duration' => 0,
//            ]);
//        }
    }

    /**
     * @param string $logoHash
     *
     * @return JsonResponse
     */
    public function downloadLogo(UserLogoRepository $userLogo, LogotypeService $service, string $logoHash): JsonResponse
    {
        if(!session($userLogo::TEMP_USER_HASH.$logoHash))
        {
            $userLogo = UserLogo::where("hash", $logoHash)->firstorfail();
            dispatch_now(new ActualizeLogoPreview($userLogo));
        }else {
            $userLogo = session($userLogo::TEMP_USER_HASH.$logoHash);
        }

        if(!user()||!user()->isDownloadPossible($userLogo))
        {
            session()->put(['logo'=>$userLogo]);

            return response()->json([
                'type'        => HttpStatusEnum::HTTP_SUCCESS,
                'isPurchased' => false,
                'message'    => 'This is premium logo type or you are out of free logo download limits. Please purchase package.',
                'redirect'    => route('package'),
            ]);

        }

        $content = $service->getLogoPreview($userLogo);

        return response()->json([
            'type'        => HttpStatusEnum::HTTP_SUCCESS,
            'isPurchased' => true,
            'logotype'    => $content,
        ]);
//
//        try {
//            $this->authorize('neededPurchaseLogo', [UserLogo::class, $userLogo]);
//
//            $paymentUrl = $this->buyLogoService->getPaymentCartUrl($userLogo, PurchaseTypeEnum::LOGOTYPE);
//
//            return response()->json([
//                'type'        => HttpStatusEnum::HTTP_SUCCESS,
//                'isPurchased' => false,
//                'paymentUrl'  => $paymentUrl,
//            ]);
//
//        } catch (AuthorizationException $e) {
//            // AuthorizationException is throwed when logotype is purchased
//            dispatch_now(new ActualizeLogoPreview($userLogo));
//
//            $content = $userLogo->preview()->first()->content;
//
//            return response()->json([
//                'type'        => HttpStatusEnum::HTTP_SUCCESS,
//                'isPurchased' => true,
//                'logotype'    => $content,
//            ]);
//        } catch (\Throwable $e) {
//            return response()->json([
//                'title'   => trans('client.purchase.logotype.error'),
//                'type'    => HttpStatusEnum::HTTP_ERROR,
//                'message' => trans('client.purchase.logotype.error'),
//            ]);
//        }
    }


    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     * @throws \App\Exceptions\UnexpectedException
     */
    public function purchasePackageCallback(Request $request)
    {
        // Get data from request
        $data = $request->all();

        // Set type
        $data['type'] = PurchaseTypeEnum::PACKAGE;

        // Save data about purchase
        $userLogo = $this->buyLogoService->savePurchaseData($data);

        // If logo is purchased
        if ($userLogo->packageIsPurchased()) {
            // Send archive to email
            dispatch(new SendPackageToClient($userLogo))->onQueue('high');

            return redirect()->route('logotypes.edit', [
                'userLogoHash' => $userLogo->hash,
                'type'         => HttpStatusEnum::HTTP_SUCCESS,
                'message'      => trans('client.purchase.package.success', ['email' => $request->user()->email]),
                'duration'     => 0,
            ]);
        }

        return redirect()->route('logotypes.edit', [
            'userLogoHash' => $userLogo->hash,
            'type'         => HttpStatusEnum::HTTP_ERROR,
            'message'      => trans('client.purchase.package.error'),
            'duration'     => 0,
        ]);
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     * @throws \App\Exceptions\UnexpectedException
     */
    public function purchaseLogotypeCallback(Request $request)
    {
        // Get data from request
        $data = $request->all();

        // Set type
        $data['type'] = PurchaseTypeEnum::LOGOTYPE;

        // Save data about purchase
        $userLogo = $this->buyLogoService->savePurchaseData($data);

        // If logo is purchased then send logotype to client
        if ($userLogo->logotypeIsPurchased()) {
            // Send archive to email
            dispatch(new SendLogotypeToClient($userLogo))->onQueue('high');

            return redirect()->route('logotypes.edit', [
                'userLogoHash' => $userLogo->hash,
                'type'         => HttpStatusEnum::HTTP_SUCCESS,
                'message'      => trans('client.purchase.logotype.success', ['email' => $request->user()->email]),
                'duration'     => 0,
            ]);
        }

        return redirect()->route('logotypes.edit', [
            'userLogoHash' => $userLogo->hash,
            'type'         => HttpStatusEnum::HTTP_ERROR,
            'message'      => trans('client.purchase.logotype.error'),
            'duration'     => 0,
        ]);
    }

}
