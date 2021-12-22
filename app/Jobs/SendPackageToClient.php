<?php

namespace App\Jobs;

use App\Models\Logo\UserLogo;
use App\Services\GenerateLogoPackageService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendPackageToClient implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var UserLogo
     */
    protected $userLogo;

    /**
     * CreateLogoPreview constructor.
     *
     * @param UserLogo $userLogo
     */
    public function __construct(UserLogo $userLogo)
    {
        $this->userLogo = $userLogo;
    }

    /**
     * @param GenerateLogoPackageService $service
     *
     * @throws \Throwable
     */
    public function handle(GenerateLogoPackageService $service)
    {
        try {
            $service->setUserLogo($this->userLogo);

            $service->createDirectories();

            //Update progress percentage
            $service->updateProgress(5);

            /**
             * Favicon
             */
            if($this->userLogo->favicon){
                $service->createFaviconPreview([
                    'name'      => '16X16',
                    'extension' => 'png',
                    'width'     => '16px',
                    'height'    => '16px',
                ]);

                $service->createFaviconPreview([
                    'name'      => '32X32',
                    'extension' => 'png',
                    'width'     => '32px',
                    'height'    => '32px',
                ]);

                $service->createFaviconPreview([
                    'name'      => '64X64',
                    'extension' => 'png',
                    'width'     => '64px',
                    'height'    => '64px',
                ]);

                $service->createFaviconPreview([
                    'name'      => '128X128',
                    'extension' => 'png',
                    'width'     => '128px',
                    'height'    => '128px',
                ]);

                $service->createFaviconPreview([
                    'name'      => '512X512',
                    'extension' => 'png',
                    'width'     => '512px',
                    'height'    => '512px',
                ]);
            }

            /**
             * Create social media previews
             */
            // Facebook
            $service->createSocialMediaPreview([
                'name'      => 'facebook-profile',
                'extension' => 'png',
                'width'     => '800px',
                'height'    => '800px',
            ]);

            //Update progress percentage
            $service->updateProgress(10);

            $service->createSocialMediaPreview([
                'name'      => 'facebook-cover',
                'extension' => 'png',
                'width'     => '820px',
                'height'    => '360px',
            ]);

            //Update progress percentage
            $service->updateProgress(15);
            // Instagram
            $service->createSocialMediaPreview([
                'name'      => 'instagram-profile',
                'extension' => 'png',
                'width'     => '800px',
                'height'    => '800px',
            ]);

            //Update progress percentage
            $service->updateProgress(20);
            // Linkedin
            $service->createSocialMediaPreview([
                'name'      => 'linkedin-cover',
                'extension' => 'png',
                'width'     => '1584px',
                'height'    => '396px',
            ]);

            //Update progress percentage
            $service->updateProgress(25);
            // Twitter
            $service->createSocialMediaPreview([
                'name'      => 'twitter-profile',
                'extension' => 'png',
                'width'     => '800px',
                'height'    => '800px',
            ]);

            //Update progress percentage
            $service->updateProgress(30);

            $service->createSocialMediaPreview([
                'name'      => 'twitter-cover',
                'extension' => 'png',
                'width'     => '1500px',
                'height'    => '500px',
            ]);

            //Update progress percentage
            $service->updateProgress(35);

            //Pinterest
            $service->createSocialMediaPreview([
                'name'      => 'pinterest-profile',
                'extension' => 'png',
                'width'     => '800px',
                'height'    => '800px',
            ]);

            //Update progress percentage
            $service->updateProgress(40);

            $service->createSocialMediaPreview([
                'name'      => 'pinterest-cover',
                'extension' => 'png',
                'width'     => '222px',
                'height'    => '150px',
            ]);

            //Update progress percentage
            $service->updateProgress(45);
            // Youtube
            $service->createSocialMediaPreview([
                'name'      => 'youtube-cover',
                'extension' => 'png',
                'width'     => '2560px',
                'height'    => '1440px',
            ]);

            //Update progress percentage
            $service->updateProgress(50);

            $service->createSocialMediaPreview([
                'name'      => 'youtube-profile',
                'extension' => 'png',
                'width'     => '800px',
                'height'    => '800px',
            ]);

            //Update progress percentage
            $service->updateProgress(55);
            /**
             * Create logo previews
             */
            $firstPreviewConfig = [
                'name'       => 'colored (transparent bg)',
                'extension'  => 'png',
                'background' => 'hideBackground',
            ];

            //Update progress percentage
            $service->updateProgress(60);
            // Create first preview
            $service->createPreview($firstPreviewConfig);

            $service->createPreview([
                'name'       => 'colored (white bg)',
                'extension'  => 'png',
                'background' => 'showBackground',
            ]);

            //Update progress percentage
            $service->updateProgress(65);

            $service->createPreview([
                'name'       => 'monochrome (transparent bg)',
                'extension'  => 'png',
                'background' => 'hideBackground',
                'filter'     => 'grayscale(100%)',
            ]);

            //Update progress percentage
            $service->updateProgress(70);
            $service->createPreview([
                'name'       => 'monochrome (white bg)',
                'extension'  => 'jpg',
                'background' => 'showBackground',
                'filter'     => 'grayscale(100%)',
            ]);

            //Update progress percentage
            $service->updateProgress(75);
            $service->createPreview([
                'name'       => 'monochrome-invert (transparent bg)',
                'extension'  => 'png',
                'background' => 'hideBackground',
                'filter'     => 'grayscale(100%) invert(100%)',
            ]);

            //Update progress percentage
            $service->updateProgress(80);
            $service->createPreview([
                'name'       => 'monochrome-invert (white bg)',
                'extension'  => 'png',
                'background' => 'showBackground',
                'filter'     => 'grayscale(100%) invert(100%)',
            ]);

            //Update progress percentage
            $service->updateProgress(85);
            // Create first preview
            $service->createPreview([
                'name'       => 'colored small (transparent bg)',
                'extension'  => 'png',
                'background' => 'hideBackground',
                'fit'        => true,
                'selector'   => '.only_svg_content',
                'width'      => 400,
                'height'     => 225,
            ]);

            //Update progress percentage
            $service->updateProgress(90);
            // Create guideline
            $previewName = urlencode($firstPreviewConfig['name']).'.'.$firstPreviewConfig['extension'];

            $service->createGuidelineByImage($service->getWebImagePath($previewName));

            /**
             * Create logo vectors
             */
            $service->createSvgVector('logo-colored.svg');
            $service->createPdfVector('logo-colored.pdf');
            $service->createPdfVector('logo-monochrome.pdf', 'grayscale(100%)');
            $service->createPdfVector('logo-monochrome-invert.pdf', 'grayscale(100%) invert(100%)');



            //Update progress percentage
            $service->updateProgress(95);
            // Create archive with images
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
        return ['send_package', 'user_logo_id:'.$this->userLogo->id];
    }
}
