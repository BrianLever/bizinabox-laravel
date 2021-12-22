<?php


namespace App\Services;

use App\Models\Logo\UserLogo;
use App\Repositories\FontRepository;
use App\Repositories\LogotypeRepository;
use enshrined\svgSanitize\Sanitizer;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use SVG\Nodes\Structures\SVGStyle;
use SVG\SVG;

class LogotypeService
{
    /**
     * @var Sanitizer
     */
    protected $sanitizer;

    /**
     * @var FontRepository
     */
    protected $fonts;

    const PREVIEW_QUALITY = 1;

    /**
     * LogotypeRepository constructor.
     *
     * @param Sanitizer      $sanitizer
     * @param FontRepository $fonts
     *
     * @throws \Exception
     */
    public function __construct(Sanitizer $sanitizer, FontRepository $fonts)
    {
        $this->sanitizer = $sanitizer;
        $this->fonts = $fonts;
    }

    /**
     * @param UserLogo $logo
     *
     * @return SVG
     */
    public function getSvgForPreview(UserLogo $logo): ?SVG
    {
        try {
            // Get svg path
            $svg = SVG::fromString($logo->getContent());

            $fonts = $this->getSvgFonts($svg);

            // Include fonts to svg as css style
            foreach ($fonts as $font) {
                // Encode font to base64
                if(Storage::disk($this->fonts::DISK)->exists($font->public_path)){

                    $path = Storage::disk($this->fonts::DISK)->url($font->public_path);

                    $encodedFont = base64_encode(file_get_contents($path));

                    // Add dynamic font style
                    $svg->getDocument()->addChild((new SVGStyle(
                        "@font-face {font-family: {$font->name}; src:url('data:font/{$font->extension};base64,{$encodedFont}');"
                    )));
                } else {
                    Log::channel('single')->error("LogotypeService->getSvgForPreview/font {$font->name} does not exist");
                }
            }
            return $svg;
        } catch (\Exception $exception){
            $ID = time();
            Log::channel('single')->error("#{$ID}: LogotypeService->getSvgForPreview/font {$font->name} does not exist");
            Log::error("#{$ID}");
            Log::error($exception);
            return  null;
        }
    }

    /**
     * @param SVG $svg
     * @return Collection
     */
    public function getSvgFonts(SVG $svg): Collection
    {
        $fontNames = [];
        $content = $this->sanitizer->sanitize($svg->toXMLString());
        $exploded = explode('font-family:', $content);

        // Find font names
        foreach ($exploded as $key => $item) {
            if ($key === 0) {
                continue;
            }

            // Search first ; symbol
            $symbol1 = ';';
            $search1 = (int) strpos($item, $symbol1);

            // Search first " symbol
            // (if font-family in end in inline style)
            $symbol2 = '"';
            $search2 = (int) strpos($item, $symbol2);

            if ($search2 < $search1) {
                $font = trim(substr($item, 0, $search2));
            } else {
                $font = trim(Arr::first(explode(';', $item)));
            }

            if (is_string($font)) {
                $fontNames[] = $font;
            }
        }

        // Search fonts in DB
        return $this->fonts->findWhereIn('name', $fontNames);
    }

    /**
     * @param UserLogo $userLogo
     * @param bool     $addDataImage
     *
     * @return string
     */
    public function getLogoPreview(UserLogo $userLogo, bool $addDataImage = true): string
    {
        $svg = $this->getSvgForPreview($userLogo);

        $encoded = base64_encode(BrowserShot::html($svg->toXMLString())
            ->hideBackground()
            ->windowSize((int) $svg->getDocument()->getAttribute('width'), 0)
            ->setScale(self::PREVIEW_QUALITY)
            ->noSandbox()
            ->screenshot());

        if ($addDataImage) {
            return 'data:image/'.LogotypeRepository::PREVIEW_EXTENSION.';base64,'.$encoded;
        }

        return $encoded;
    }
}
