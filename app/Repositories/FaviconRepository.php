<?php

namespace App\Repositories;

use App\Models\FaviconCategory;
use App\Models\FaviconItem;
use enshrined\svgSanitize\Sanitizer;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FaviconRepository extends BaseRepository
{
    /**
     * @var string
     */
    public $model = FaviconItem::class;

    /**
     * @var FontRepository
     */
    protected $font;

    /**
     * @var Sanitizer
     */
    protected $sanitizer;

    const DISK                     = 's3-pub-bizinabox';
    const EXTENSION                = 'svg';
    const DIRECTORY                = 'favicons';
    const PREVIEW_DIRECTORY        = 'favicons/previews/';
    const PREVIEW_EXTENSION        = 'png';
    const COMPARE_FONTS_PERCENTAGE = 65;

    /**
     * LogotypeRepository constructor.
     *
     * @param FontRepository $font
     * @param Sanitizer      $sanitizer
     *
     * @throws \Exception
     */
    public function __construct(FontRepository $font, Sanitizer $sanitizer)
    {
        $this->font = $font;
        $this->sanitizer = $sanitizer;

        parent::__construct();
    }

    /**
     * @param array $data
     *
     * @return mixed
     * @throws \Throwable
     */
    public function create(array $data)
    {
        return \DB::transaction(function () use ($data) {
            $svgContent = $data['favicon']->get();
            $faviconFile = $this->actualizeFontNames($svgContent, $data['fonts']);
            $previewFile = $data['preview'];

            $request = $data['request'];

            $hash = $this->getHash($faviconFile);
            $path = $this->getPath($hash);

            // Save logo to disk
            $this->saveToDisk($faviconFile, $hash);
            // Save preview image to disk
            $this->savePreview($previewFile, $hash);

            // Check existing logo
            $logotype = $this->first('hash', $hash);

            // Create record in DB
            if (!$logotype) {
                $logotype = $this->model->create([
                    'hash' => $hash,
                    'path' => $path,
                    'name'=>$request->name,
                    'status'=>$request->status?1:0,
                    'premium'=>$request->premium?1:0,
                    'recommend'=>$request->recommend?1:0,
                    'order'=>$request->order,
                    'global_order'=>$request->global_order,
                ]);

                $logotype->categories()->sync($request->categories);
            }

            return $logotype;
        });
    }

    /**
     * @param string $svg
     * @param array  $fonts
     *
     * @return string
     * @throws \FontLib\Exception\FontNotFoundException
     */
    protected function actualizeFontNames(string $svg, array $fonts): string
    {
        $splitByFonts = explode('font-family="', $svg);
        $existingFonts = $this->font->all();

        foreach ($splitByFonts as $key => $svgChunk) {
            if ($key === 0) {
                continue;
            }

            $fontsStatistics = [];
            $fontNameInSvg = substr($svgChunk, 0, strpos($svgChunk, '"'));
            $fontNameInSvgForCompare = str_replace('-', ' ', str_replace('\'', '', $fontNameInSvg));

            foreach ($fonts as $font) {
                if (!is_object($font)) {
                    continue;
                }

                // Get original font name
                $originalFontName = $this->font->getFontName($font->getRealPath());

                // Get font name with family
                $fullFontName = $this->font->getFullFontName($font->getRealPath());

                // Compare font names (original name and name from svg content)
                similar_text($originalFontName, $fontNameInSvgForCompare, $percentage);

                if ((int)$percentage > self::COMPARE_FONTS_PERCENTAGE) {
                    $this->replaceFontName($svg, $fontNameInSvg, $fullFontName);

                    break;
                }
            }

            foreach ($existingFonts as $existingFont) {
                // Compare font names (original name and name from svg content)
                $existingFontNameV1 = preg_replace('/\W\w+\s*(\W*)$/', '$1', $existingFont->name);

                similar_text($existingFontNameV1, $fontNameInSvgForCompare, $percentage);

                $fontsStatistics[] = [
                    'id'         => $existingFont->id,
                    'name'       => $existingFont->name,
                    'percentage' => $percentage,
                ];

                // Compare font names with font family
                $existingFontNameV2 = $existingFont->name;

                similar_text($existingFontNameV2, $fontNameInSvgForCompare, $percentage);

                $fontsStatistics[] = [
                    'id'         => $existingFont->id,
                    'name'       => $existingFont->name,
                    'percentage' => $percentage,
                ];
            }

            $fontsStatistics = collect($fontsStatistics);
            $maxPercentage = $fontsStatistics->max('percentage');

            if ($maxPercentage > self::COMPARE_FONTS_PERCENTAGE) {
                $similarFont = $fontsStatistics->where('percentage', $maxPercentage)->first();

                $this->replaceFontName($svg, $fontNameInSvg, $similarFont['name']);
            }
        }

        return $svg;
    }

    /**
     * @param string $svg
     * @param string $from
     * @param string $to
     *
     * @return string
     */
    protected function replaceFontName(string &$svg, string $from, string $to): string
    {
        $svg = Str::replaceFirst($from, $to, $svg);

        $svg = $this->sanitizeSvg($this->sanitizer->sanitize($svg));

        return $svg;
    }

    /**
     * @param string $svg
     *
     * @return string
     */
    public function sanitizeSvg(string $svg): string
    {
        $svg = Str::replaceFirst('id="Слой_1"', '', $svg);
        $svg = Str::replaceFirst('<!-- Generator: Adobe Illustrator 23.0.2, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->',
            '', $svg);
        $svg = preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $svg);

        return $svg;
    }

    /**
     * @param string       $preview
     * @param string       $hash
     *
     * @return $this
     */
    public function savePreview($preview, string $hash): self
    {
        // Get preview name
        $name = "{$hash}.png";

        // Move preview file
        $image = json_decode($preview)->output->image;
        $image = preg_replace('#^data:image/\w+;base64,#i', '', $image);
        $image = base64_decode($image);

        Storage::disk(self::DISK)->put(self::PREVIEW_DIRECTORY.$name, $image);

        return $this;
    }

    /**
     * @param string $logotype
     *
     * @return string
     */
    public function getHash(string $logotype): string
    {
        return hash('sha256', $logotype);
    }

    /**
     * @param string $logotype
     * @param string $hash
     *
     * @return bool
     */
    public function saveToDisk(string $logotype, string $hash): bool
    {
        return Storage::disk(self::DISK)->put($this->getPath($hash), $logotype);
    }

    /**
     * @param $hash
     *
     * @return string
     */
    public function getPath($hash): string
    {
        return self::DIRECTORY.'/'.$hash.'.'.self::EXTENSION;
    }

    /**
     * @param string $hash
     *
     * @return string
     */
    public function getPreviewPath(string $hash): string
    {
        return $this->getPreviewDir().$hash.'.'.self::PREVIEW_EXTENSION;
    }

    /**
     * @param string $hash
     *
     * @return string
     */
    public function getPreviewUrl(string $hash): string
    {
        return asset(self::PREVIEW_DIRECTORY.$hash.'.'.self::PREVIEW_EXTENSION);
    }

    /**
     * @param iterable $loadedLogos
     *
     * @return array
     */
    public function getPreviewPaths($category, iterable $loadedLogos = []): array
    {
        $previews = [];
        if($category==='all')
        {
            $query = $this->model->query();
        }else {
            $category = FaviconCategory::findorfail($category);
            $query = $category->logoTypes();
        }
        $hashes = $query->whereNotIn('hash', $loadedLogos)
            ->where('enabled', true)
            ->inRandomOrder()
            ->limit(6)
            ->get()
            ->pluck('hash');

        foreach ($hashes as $hash) {
            $previews[$hash] = $this->getPreviewUrl($hash);
        }

        return $previews;
    }

    /**
     * @return string
     */
    public function getPreviewDir(): string
    {
        return Storage::disk(self::DISK)->path(self::DIRECTORY.'/'.self::PREVIEW_DIRECTORY);
    }


}
