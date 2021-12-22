<?php

namespace App\Repositories;

use App\Jobs\ActualizeFaviconPreview;
use App\Models\FaviconItem;
use App\Models\User;
use App\Models\UserFavicon;
use App\Services\FaviconService;
use Carbon\Carbon;
use enshrined\svgSanitize\Sanitizer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class UserFaviconRepository extends BaseRepository
{
    public $model = UserFavicon::class;

    protected FaviconRepository $favicon;

    protected FaviconService $faviconService;

    protected Sanitizer $sanitizer;

    const LAST_USER_HASH = 'last_user_hash';
    const TEMP_USER_HASH = 'temp_user_hash';
    const TEMP_LOGO_HASH = 'temp_logo_hash';
    const LAST_LOGO_HASH = 'last_logo_hash';

    public function __construct(FaviconRepository $favicon, Sanitizer $sanitizer, FaviconService $faviconService)
    {
        parent::__construct();

        $this->favicon = $favicon;
        $this->sanitizer = $sanitizer;
        $this->faviconService = $faviconService;

    }

    /**
     * @param UserLogoRepository $userLogoRepo
     * @param FaviconItem $favicon
     * @param bool $saveUserLogo
     *
     * @return UserFavicon
     * @throws \Throwable
     */
    public function createByFavicon(UserLogoRepository $userLogoRepo, FaviconItem $favicon, bool $saveUserLogo = false): UserFavicon
    {
        return DB::transaction(function () use ($userLogoRepo, $favicon, $saveUserLogo) {
            $userHash = $this->getUserHash($favicon);

            // Save user hash to session
            $userFavicon = new UserFavicon([
                'favicon_id'      => $favicon->id,
                'hash'         => $userHash,
                'favicon_content' => $favicon->content,
                'version' => "first_version",
            ]);

            $this->saveTempUserFaviconToSession($userHash, $userFavicon);

            if ($saveUserLogo && $favicon->logo){
                $logoType = $favicon->logo;
                $userLogo = $userLogoRepo->createByLogo($this, $logoType);
                $userLogoRepo->saveTempUserLogoToSession($userLogo->hash, $userLogo);
                $userLogoRepo->saveTempUserFaviconToSession($userLogo->hash, $userFavicon);

                $this->saveTempUserLogoToSession($userHash, $userLogo);
            }

            return $userFavicon;
        });
    }

    /**
     * @param string $hash
     *
     * @return $this
     */
    public function saveHashToSession(string $hash): object
    {
        Session::put(self::LAST_USER_HASH, $hash);

        return $this;
    }
    public function saveTempUserFaviconToSession(string $hash, $userFavicon): object
    {
        Session::put(self::TEMP_USER_HASH.$hash, $userFavicon);

        return $this;
    }

    public function saveTempUserLogoToSession(string $hash, $userLogo): object
    {
        Session::put(self::TEMP_LOGO_HASH.$hash, $userLogo);

        return $this;
    }

    /**
     * @param FaviconItem $favicon
     * @param bool     $isRepeatedFavicon
     *
     * @return string
     */
    public function getUserHash(FaviconItem $favicon, $isRepeatedFavicon = false): string
    {
        return hash('sha256', $favicon->hash.time());
    }

    /**
     * @param string $favicon
     * @param        $hash
     * @param        $version
     *
     * @return mixed
     * @throws \Throwable
     */
    public function synchronize(string $favicon, $hash, $version='default')
    {
        return DB::transaction(function () use ($favicon, $hash, $version) {
            // Encrypt Favicon
            $favicon = $this->decodeFavicon($favicon);

            // Sanitize Favicon
            $sanitizedFavicon = $this->sanitizer->sanitize($favicon);

            // Get some valid svg favicon
            $favicon = $sanitizedFavicon ?: $favicon;

            $userFavicon = $this->first('hash', $hash);

            $userFavicon->update([
                'favicon_content' => $favicon,
                'version' => $version,
            ]);

            return $userFavicon->fresh();
        });
    }
    public function createNewVersion($favicon, $userFavicon, $version)
    {
        $userHash = hash('sha256', $userFavicon->hash.time());
        // Encrypt Favicon
        $favicon = $this->decodeFavicon($favicon);

        // Sanitize Favicon
        $sanitizedFavicon = $this->sanitizer->sanitize($favicon);

        // Get some valid svg favicon
        $favicon = $sanitizedFavicon?: $favicon;

        $userFavicon = UserFavicon::create([
            'favicon_id'      => $userFavicon->favicon_id,
            'user_id'      => user()->id,
            'hash'         => $userHash,
            'favicon_content' => $favicon,
            'version' => $version,
        ]);

        dispatch(new ActualizeFaviconPreview($userFavicon, true));

        return $userFavicon->hash;
    }
    public function syncGuestFavicon($favicon, $sessionUserFavicon, $version='default')
    {
        $favicon = $this->decodeFavicon($favicon);
        // Sanitize favicon
        $sanitizedFavicon = $this->sanitizer->sanitize($favicon);
        // Get some valid svg favicon
        $favicon = $sanitizedFavicon ?: $favicon;
        $sessionUserFavicon->favicon_content = $favicon;
        $sessionUserFavicon->version = $version;
        session()->put([self::TEMP_USER_HASH.$sessionUserFavicon->hash=>$sessionUserFavicon]);

        return $sessionUserFavicon;
    }
    public function saveUserFaviconFromGuestFavicon(string $favicon, UserFavicon $sessionUserFavicon, $version='default'): UserFavicon
    {
        if($favicon)
        {
            $favicon = $this->decodeFavicon($favicon);
            // Sanitize favicon
            $sanitizedFavicon = $this->sanitizer->sanitize($favicon);
            // Get some valid svg favicon
            $favicon = $sanitizedFavicon ?: $favicon;
            $sessionUserFavicon->favicon_content = $favicon;
        }
        $sessionUserFavicon->user_id = user()->id;
        $sessionUserFavicon->version = $version;
        $sessionUserFavicon->save();
        $sessionUserFavicon->saveLogo();

        dispatch(new ActualizeFaviconPreview($sessionUserFavicon));

        session()->forget(self::TEMP_USER_HASH.$sessionUserFavicon->hash);

        return $sessionUserFavicon;
    }

    /**
     * @param string $favicon
     * @return string
     */
    protected function decodeFavicon(string $favicon): string
    {
        return base64_decode(str_rot13($favicon));
    }

    /**
     * @param Model $userFavicon
     *
     * @return bool
     */
    public function isEdited(Model $userFavicon): bool
    {
        return !((string) $userFavicon->created_at === (string) $userFavicon->updated_at);
    }

    /**
     * @param User $user
     *
     * @return array
     */
    public function getFaviconPreviews(User $user): array
    {
        $result = [];
        $favicons = $this->model
            ->whereUserId($user->id)
            ->with(['preview', 'purchases'])
            ->orderBy('updated_at', 'desc')
            ->get();

        foreach ($favicons as $favicon) {
            $preview = $favicon->preview;

            $result[] = [
                'url'        => route('favicon.edit', $favicon->hash),
                'updated_at' => Carbon::parse($favicon->updated_at)->format('d F Y'),
                'preview'    => optional($preview)->content,
                'hash'       => $favicon->hash,
            ];

            // If favicon preview is outdated
            if ($preview) {
                if (Carbon::parse($preview->updated_at)->diffInMinutes($favicon->updated_at) > 0) {
                    // Actualize favicon preview
                    dispatch(new ActualizeFaviconPreview($favicon))->onQueue('low');
                }
            }
        }

        return $result;
    }

    public function getLiveFavicons(iterable $loadedFavicons = []): array
    {
        $previews = [];

        $favicons = $this->model->with('preview')
            ->where("user_id", user()->id)
            ->whereNotIn('hash', $loadedFavicons)
            ->latest()
            ->limit(6)
            ->get();

        foreach ($favicons as $favicon) {
            $previews[$favicon->hash] = $favicon->preview->content;
        }

        return $previews;
    }
}
