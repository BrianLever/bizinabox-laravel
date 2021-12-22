<?php

namespace App\Services;

use App\Mail\PurchaseLogoPackageMail;
use App\Models\Logo\UserLogo;
use ColorThief\ColorThief;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use ourcodeworld\NameThatColor\ColorInterpreter as NameThatColor;
use function Sentry\captureException;
use Spatie\Image\Manipulations;
use SVG\Nodes\Structures\SVGStyle;
use SVG\SVG;
use ZipArchive;

class GenerateLogoPackageService extends LogotypeService
{
    protected const GUIDELINE_NAME = 'guideline.pdf';

    /**
     * @var UserLogo
     */
    protected $userLogo;

    protected const STORAGE_DISK = 's3-pub-bizinabox';

    /**
     * @param UserLogo $userLogo
     *
     * @return GenerateLogoPackageService
     */
    public function setUserLogo(UserLogo $userLogo): self
    {
        $this->userLogo = $userLogo;

        return $this;
    }

    /**
     * @return UserLogo
     */
    public function getUserLogo(): object
    {
        return $this->userLogo;
    }

    /**
     * @return string
     */
    protected function getUserDir(): string
    {
        return 'users'.'/'.$this->userLogo->user->id.'/'.'logotypes'.'/';
    }

    /**
     * @return string
     */
    protected function getWebImagesDir(): string
    {
        return 'web/';
    }

    /**
     * @return string
     */
    protected function getUserLogoVectorsDir(): string
    {
        return 'vectors/';
    }

    /**
     * @return string
     */
    protected function getPrintQualityImagesDir(): string
    {
        return 'print/';
    }

    /**
     * @return string
     */
    protected function getSocialMediaImagesDir(): string
    {
        return 'social-media/';
    }

    /**
     * @return string
     */
    protected function getFaviconImageDir(): string
    {
        return 'favicons/';
    }

    /**
     * @return GenerateLogoPackageService
     */
    public function createDirectories(): self
    {
        $logoDir = $this->getLogoDir();

        // Dir for images
        $imagesDir = $logoDir.$this->getWebImagesDir();
        Storage::disk('s3-pub-bizinabox')->makeDirectory($imagesDir);

        // Dir for vectors
        $vectorsDir = $logoDir.$this->getUserLogoVectorsDir();
        Storage::disk('s3-pub-bizinabox')->makeDirectory($vectorsDir);

        // Dir for print
        $printDir = $logoDir.$this->getPrintQualityImagesDir();
        Storage::disk('s3-pub-bizinabox')->makeDirectory($printDir);

        // Dir for social media
        $vectorsDir = $logoDir.$this->getSocialMediaImagesDir();
        Storage::disk('s3-pub-bizinabox')->makeDirectory($vectorsDir);

        if($this->userLogo->favicon){
            $faviconDir = $logoDir.$this->getFaviconImageDir();
            Storage::disk($this->userLogo::STORAGE_DISK)->makeDirectory($faviconDir);
        }

        return $this;
    }

    protected function getLogoDir(): string
    {
        $userDir = $this->getUserDir();

        return $userDir.$this->userLogo->hash.'/';
    }

    public function getWebImagePath(string $name): string
    {
        $logoPath = $this->userLogo->hash.'/'.$this->getWebImagesDir().$name;
        return $this->getUserDir().$logoPath;
    }

    public function getArchivePath(string $name = 'images.zip'): string
    {
        // Get dynamic logo path
        $logoPath = $this->userLogo->hash.'/'.$name;

        return $this->getUserDir().$logoPath;
    }

    protected function getPrintQualityPath(string $name): string
    {
        $logoPath = $this->userLogo->hash.'/'.$this->getPrintQualityImagesDir().$name;

        return  $this->getUserDir().$logoPath;
    }


    protected function getVectorPath(string $name): string
    {
        $logoPath = $this->userLogo->hash.'/'.$this->getUserLogoVectorsDir().$name;
        return $this->getUserDir().$logoPath;
    }

    protected function getSocialMediaPath(string $name): string
    {
        $logoPath = $this->userLogo->hash.'/'.$this->getSocialMediaImagesDir().$name;
        return  $this->getUserDir().$logoPath;
    }

    protected function getGuidelinePath(string $name): string
    {
        $guidelinePath = $this->userLogo->hash.'/'.$name;
        return $this->getUserDir().$guidelinePath;
    }

    protected function getFaviconPath(string $name): string
    {
        $logoPath = $this->userLogo->hash.'/'.$this->getFaviconImageDir().$name;
        return  $this->getUserDir().$logoPath;
    }

    /**
     * @param SVG $logo
     *
     * @return int
     */
    protected function getLogoWidth(SVG $logo): int
    {
        return (int)$logo->getDocument()->getAttribute('width');
    }

    /**
     * @param SVG $logo
     *
     * @return int
     */
    protected function getLogoHeight(SVG $logo): int
    {
        return (int)$logo->getDocument()->getAttribute('height');
    }

    public function createPreview(array $options = []): self
    {
        try {
            // Set images path
            $name = urldecode($options['name']).'.'.$options['extension'];
            $imagePath = $this->getWebImagePath($name);
            $imagePathHightQuality = $this->getPrintQualityPath($name);

            // Get prepared svg
            $svg = $this->getSvgForPreview($this->userLogo);

            // Set svg width/height
            $svg->getDocument()->setStyle('width', '100%')->setStyle('height', '100%');

            // Set filter
            if (data_get($options, 'filter')) {
                $svg->getDocument()->setStyle('filter', $options['filter'])
                    ->setStyle('-webkit-filter', $options['filter'])
                    ->setStyle('-moz-filter', $options['filter'])
                    ->setStyle('-ms-filter', $options['filter'])
                    ->setStyle('-o-filter', $options['filter']);
            }

            $width = $this->getLogoWidth($svg);

            if (data_get($options, 'fit')) {
                // Create png preview
                $base64Data = BrowserShot::html($svg->toXMLString())
                    ->{$options['background']}()
                    ->deviceScaleFactor(3)
                    ->select($options['selector'])
                    ->noSandbox()
                    ->fit(Manipulations::FIT_FILL, $options['width'], $options['height'])
                    ->base64Screenshot();

                $file = base64_decode($base64Data);

                Storage::disk(self::STORAGE_DISK)->put($imagePath, $file);
            } else {
                // Create png preview
                $base64Data = BrowserShot::html($svg->toXMLString())
                    ->noSandbox()
                    ->{$options['background']}()
                    ->windowSize($width, 0)
                    ->base64Screenshot();

                $file = base64_decode($base64Data);

                Storage::disk(self::STORAGE_DISK)->put($imagePath, $file);
            }

            // Create hight quality preview
            $base64Data = BrowserShot::html($svg->toXMLString())
                ->noSandbox()
                ->{$options['background']}()
                ->deviceScaleFactor(3)
                ->windowSize($width, 0)
                ->base64Screenshot();

            $file = base64_decode($base64Data);

            Storage::disk(self::STORAGE_DISK)->put($imagePathHightQuality, $file);
        } catch (\Exception $e) {
            captureException($e);
        }

        return $this;
    }

    /**
     * @param string $fileName
     *
     * @return GenerateLogoPackageService
     */
    public function createSvgVector(string $fileName): self
    {
        // Get image path
        $vectorPath = $this->getVectorPath($fileName);

        // Get prepared svg
        $svg = $this->getSvgForPreview($this->userLogo);

        // Set svg width/height and filter
        $svg->getDocument()
            ->setStyle('width', '100%')
            ->setStyle('height', '100%');

        // Create svg file
//        \File::put($vectorPath, $svg->toXMLString());

        Storage::disk(self::STORAGE_DISK)->put($vectorPath, $svg);

        return $this;
    }

    /**
     * @param string      $fileName
     * @param string|null $filter
     *
     * @return GenerateLogoPackageService
     */
    public function createPdfVector(string $fileName, string $filter = null): self
    {
        // Get image path
        $vectorPath = $this->getVectorPath($fileName);

        // Get prepared svg
        $svg = $this->getSvgForPreview($this->userLogo);
        $width = $this->getLogoWidth($svg);
        $height = $this->getLogoHeight($svg);

        // Create black-white pdf version
        if ($filter) {
            $svg->getDocument()->setStyle('filter', $filter);
        }

        // Create pdf file
        $base64Data = BrowserShot::html($svg->toXMLString())
            ->noSandbox()
            ->margins(5, 10, 5, 5, 'px')
            ->paperSize($width, $height + 12, 'px')
            ->base64Screenshot();

        $file = base64_decode($base64Data);

        Storage::disk(self::STORAGE_DISK)->put($vectorPath, $file);

        return $this;
    }

    /**
     * @param array $options
     *
     * @return GenerateLogoPackageService
     * @throws \Throwable
     */
    public function createSocialMediaPreview(array $options): self
    {

        // Get prepared svg
        $path = $this->getSocialMediaPath($options['name'].'.'.$options['extension']);

        $svg = $this->getSvgForPreview($this->userLogo);

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


    /**
     * @param array $options
     *
     * @return GenerateLogoPackageService
     * @throws \Throwable
     */
    public function createFaviconPreview(array $options): self
    {

        // Get prepared svg
        $path = $this->getFaviconPath($options['name'].'.'.$options['extension']);

        $faviconService = new FaviconService($this->sanitizer, $this->fonts);

        $userFavicon = $this->userLogo->favicon;

        $svg = $faviconService->getSvgForPreview($userFavicon);

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

    /**
     * @param string $fromImagePath
     *
     * @return GenerateLogoPackageService
     * @throws \Throwable
     */
    public function createGuidelineByImage(string $fromImagePath): self
    {
        $colorNameDetector = new NameThatColor();
        $sourceImage = Storage::disk(self::STORAGE_DISK)->url($fromImagePath);
        $palette = ColorThief::getPalette($sourceImage);

        $path = $this->getGuidelinePath(self::GUIDELINE_NAME);

        $colors = [];
        $colorNames = [];

        // Convert rgb to hex
        foreach ($palette as $rgb) {
            $colors[] = sprintf("#%02x%02x%02x", $rgb[0], $rgb[1], $rgb[2]);
        }

        // Colors to uppercase
        $colors = array_unique(array_map('strtoupper', $colors));

        // Get color names
        foreach ($colors as $color) {
            $colorNames[$color] = $colorNameDetector->name($color)['name'];
        }

        $colorNames = array_unique($colorNames);

        $svg = $this->getSvgForPreview($this->userLogo);
        $fonts = $this->getSvgFonts($svg);
        $fontNames = $fonts->pluck(['name'])->unique()->toArray();

        $template = view('etc.guideline')->with(compact('svg', 'fontNames', 'colorNames'))->render();

        $guidelineSvg = SVG::fromString($template);

        // Include fonts to svg as css style
        $defaultFonts = $this->fonts->findWhereIn('name', ['Montserrat Regular']);
        $fonts = $fonts->merge($defaultFonts);

        foreach ($fonts as $font) {
            // Encode font to base64
            $encodedFont = base64_encode(file_get_contents(Storage::disk(self::STORAGE_DISK)->url($font->public_path)));

            // Add dynamic font style
            $guidelineSvg->getDocument()->addChild((new SVGStyle(
                "@font-face {font-family: {$font->name}; src:url('data:font/{$font->extension};base64,{$encodedFont}');"
            )));
        }

        // Create pdf file
        $base64Data = BrowserShot::html($guidelineSvg->toXMLString())
            ->select('svg')
            ->noSandbox()
            ->showBackground()
            ->paperSize(0, $this->getLogoHeight($guidelineSvg), 'px')
            ->waitUntilNetworkIdle()
            ->base64pdf();

        $file = base64_decode($base64Data);

        Storage::disk(self::STORAGE_DISK)->put($path, $file);
        return $this;
    }

    /**
     * @return iterable
     */
    public function getFilesList(): iterable
    {
        $logoDir = $this->getLogoDir(). $this->userLogo->hash;
        $files = Storage::disk('s3-pub-bizinabox')->files($logoDir);

        // Get only guideline file
        foreach ($files as $key => $file) {
            if (!Str::contains($file, self::GUIDELINE_NAME)) {
                unset($files[$key]);
            }
        }

        $dirs = Storage::disk('s3-pub-bizinabox')->allDirectories($logoDir);
        $filesAndDirs = array_merge($files, $dirs);

        // Set full path for dirs and files
        foreach ($filesAndDirs as $key => $fileOrDir) {
            $filesAndDirs[$key] = Storage::disk('s3-pub-bizinabox')->url($fileOrDir);
        }

        return $filesAndDirs;
    }


    public function createArchive()
    {
        /**
         * New code for php 8.6
         */
        $zip = new ZipArchive();


        If(Storage::disk('public')->exists('temp/images.zip')){
            Storage::disk('public')->delete('temp/images.zip');
        }

        $zipFilePath = Storage::disk('public')->path('temp/images.zip');

        if ($zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {

            $userDir = $this->getUserDir().$this->userLogo->hash;

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

        Storage::disk(self::STORAGE_DISK)->put($userDir.'/images.zip', file_get_contents($zipFilePath));
    }
    /**
     * @throws \Exception
     */
    public function updateProgress($progress)
    {
        $this->userLogo->progress = $progress;
        $this->userLogo->save();
        return $this;
    } /**
     * @throws \Exception
     */
    public function setAdsCompleted()
    {
        $this->userLogo->progress = 100;
        $this->userLogo->downloadable = 1;
        $this->userLogo->save();
        return $this;
    }

    /**
     * @throws \Exception
     */
    public function sendToMail()
    {
        // Send archive to email
        Mail::send(new PurchaseLogoPackageMail($this->userLogo, $this->getArchivePath()));
    }
}
