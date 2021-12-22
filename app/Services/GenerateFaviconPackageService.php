<?php

namespace App\Services;

use App\Models\UserFavicon;
use Illuminate\Support\Facades\Storage;
use SVG\SVG;
use ZipArchive;

class GenerateFaviconPackageService extends FaviconService
{
    protected const GUIDELINE_NAME = 'guideline.pdf';

    /**
     * @var UserFavicon
     */
    protected UserFavicon $userFavicon;

    protected const STORAGE_DISK = 's3-pub-bizinabox';

    /**
     * @param UserFavicon $userFavicon
     *
     * @return GenerateFaviconPackageService
     */
    public function setUserFavicon(UserFavicon $userFavicon): self
    {
        $this->userFavicon = $userFavicon;

        return $this;
    }

    /**
     * @return UserFavicon
     */
    public function getUserFavicon(): object
    {
        return $this->userFavicon;
    }

    /**
     * @return string
     */
    protected function getUserDir(): string
    {
        return 'users'.'/'.$this->userFavicon->user->id.'/'.'favicons'.'/';
    }

    /**
     * @return string
     */
    protected function getPngDir(): string
    {
        return 'png/';
    }

    /**
     * @return string
     */
    protected function getIcoDir(): string
    {
        return 'ico/';
    }


    /**
     * @return GenerateLogoPackageService
     */
    public function createDirectories(): self
    {
        $logoDir = $this->getFaviconDir();

        // Dir for images
        $pngDir = $logoDir.$this->getPngDir();
        Storage::disk(self::STORAGE_DISK)->makeDirectory($pngDir);

        // Dir for vectors
        $icoDir = $logoDir.$this->getIcoDir();
        Storage::disk(self::STORAGE_DISK)->makeDirectory($icoDir);

        return $this;
    }

    /**
     * @return string
     */
    protected function getFaviconDir(): string
    {
        $userDir = $this->getUserDir();

        return $userDir.$this->userFavicon->hash.'/';
    }



    public function getArchivePath(string $name = 'favicon.zip'): string
    {
        // Get dynamic logo path
        $faviconPath = $this->userFavicon->hash.'/'.$name;
        return $this->getUserDir().$faviconPath;
    }


    protected function getFaviconWidth(SVG $favicon): int
    {
        return (int)$favicon->getDocument()->getAttribute('width');
    }

    protected function getFaviconHeight(SVG $favicon): int
    {
        return (int)$favicon->getDocument()->getAttribute('height');
    }

    public function createPreview(array $options = []): self
    {

        // Get prepared svg
        $name = $options['name'].'.'.$options['extension'];
        $path = $this->userFavicon->hash.'/'.$options['extension'].'/'.$name;
        $path = $this->getUserDir().$path;

        $svg = $this->getSvgForPreview($this->userFavicon);

        $svg->getDocument()
            ->setStyle('width', $options['width'])
            ->setStyle('height', $options['height']);

        $html = view('etc.svg-demonstration')->with(compact('svg'))->render();

        $base64Data = BrowserShot::html($html)
            ->select('svg')
            ->noSandbox()
            ->showBackground()
            ->base64Screenshot();

        $image = base64_decode($base64Data);

        Storage::disk(self::STORAGE_DISK)->put($path, $image);

        return $this;
    }

    public function createArchive()
    {
        /**
         * New code for php 8.6
         */
        $zip = new ZipArchive();


        If(Storage::disk('public')->exists('temp/favicon.zip')){
            Storage::disk('public')->delete('temp/favicon.zip');
        }

        $zipFilePath = Storage::disk('public')->path('temp/favicon.zip');

        if ($zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {

            $userDir = $this->getUserDir().$this->userFavicon->hash;

            $files = Storage::disk('s3-pub-bizinabox')->allFiles($userDir);

            foreach ($files as $filePath) {
                // Add current file to archive
                $relativePath = str_replace($userDir.'/','',$filePath);
                $file = Storage::disk('s3-pub-bizinabox')->get($filePath);
                Storage::disk('public')->put('temp/'.$relativePath, $file);
                if(strpos($relativePath,'.zip') > 0){
                    continue;
                }
                $zip->addFile(Storage::disk('public')->path('temp/'.$relativePath), $relativePath);
            }

            // Zip archive will be created only after closing object
            $zip->close();
        }

        Storage::disk(self::STORAGE_DISK)->put($userDir.'/favicon.zip', file_get_contents($zipFilePath));
    }


    public function updateProgress($progress): self
    {
        $this->userFavicon->progress = $progress;
        $this->userFavicon->save();
        return $this;
    }


    public function setAdsCompleted(): self
    {
        $this->userFavicon->progress = 100;
        $this->userFavicon->downloadable = 1;
        $this->userFavicon->save();
        return $this;
    }


    public function sendToMail()
    {
        // Send archive to email
//       Mail::send(new PurchaseLogoPackageMail($this->userFavicon, $this->getArchivePath()));
    }
}
