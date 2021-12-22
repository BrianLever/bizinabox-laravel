<?php

namespace App\Jobs;

use App\Models\UserFavicon;
use App\Services\GenerateFaviconPackageService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendFaviconPackageToClient implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var UserFavicon
     */
    protected UserFavicon $userFavicon;

    /**
     * CreateLogoPreview constructor.
     *
     * @param UserFavicon $userFavicon
     */
    public function __construct(UserFavicon $userFavicon)
    {
        $this->userFavicon = $userFavicon;
    }


    public function handle(GenerateFaviconPackageService $service)
    {
        try {
            $service->setUserFavicon($this->userFavicon);

            $service->createDirectories();

            //Update progress percentage
            $service->updateProgress(10);

            $service->createPreview([
                'name'      => '16X16',
                'extension' => 'png',
                'width'     => '16px',
                'height'    => '16px',
            ]);

            $service->updateProgress(20);

            $service->createPreview([
                'name'      => '32X32',
                'extension' => 'png',
                'width'     => '32px',
                'height'    => '32px',
            ]);

            $service->createPreview([
                'name'      => '64X64',
                'extension' => 'png',
                'width'     => '64px',
                'height'    => '64px',
            ]);

            $service->updateProgress(30);

            $service->createPreview([
                'name'      => '128X128',
                'extension' => 'png',
                'width'     => '128px',
                'height'    => '128px',
            ]);

            $service->updateProgress(40);

            $service->createPreview([
                'name'      => '512X512',
                'extension' => 'png',
                'width'     => '512px',
                'height'    => '512px',
            ]);

            $service->updateProgress(50);

            $service->createPreview([
                'name'      => '16X16',
                'extension' => 'ico',
                'width'     => '16px',
                'height'    => '16px',
            ]);

            $service->updateProgress(60);

            $service->createPreview([
                'name'      => '32X32',
                'extension' => 'ico',
                'width'     => '32px',
                'height'    => '32px',
            ]);

            $service->createPreview([
                'name'      => '64X64',
                'extension' => 'ico',
                'width'     => '64px',
                'height'    => '64px',
            ]);

            $service->updateProgress(70);

            $service->createPreview([
                'name'      => '128X128',
                'extension' => 'ico',
                'width'     => '128px',
                'height'    => '128px',
            ]);

            $service->updateProgress(80);

            $service->createPreview([
                'name'      => '512X512',
                'extension' => 'ico',
                'width'     => '512px',
                'height'    => '512px',
            ]);

            $service->updateProgress(90);

            // Create archive with favicons
            $service->createArchive();

            $service->setAdsCompleted();
        } catch (\Exception $exception){
            Log::info($exception);
            $service->setAdsCompleted();
        }
    }

    /**
     * @return array
     */
    public function tags()
    {
        return ['send_package', 'user_logo_id:'.$this->userFavicon->id];
    }
}
