<?php

namespace App\Repositories;

use App\Jobs\ActualizeLogoPreview;
use App\Models\Logo\LogoType;
use App\Models\User;
use App\Models\Logo\UserLogo;
use App\Services\LogotypeService;
use Carbon\Carbon;
use enshrined\svgSanitize\Sanitizer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class UserLogoRepository extends BaseRepository
{
    public $model = UserLogo::class;

    /**
     * @var LogotypeRepository
     */
    protected $logotype;

    /**
     * @var LogotypeService
     */
    protected $logoService;

    /**
     * @var Sanitizer
     */
    protected $sanitizer;

    const LAST_USER_HASH = 'last_user_hash';
    const TEMP_USER_HASH = 'temp_user_hash';
    const TEMP_FAVICON_HASH = 'temp_favicon_hash';
    const LAST_FAVICON_HASH = 'last_favicon_hash';

    public function __construct(LogotypeRepository $logotype, Sanitizer $sanitizer, LogotypeService $logoService)
    {
        parent::__construct();

        $this->logotype = $logotype;
        $this->sanitizer = $sanitizer;
        $this->logoService = $logoService;

    }

    /**
     * @param UserFaviconRepository $userFaviconRepo
     * @param Logotype $logotype
     * @param bool $saveUserFavicon
     *
     * @return UserLogo
     * @throws \Throwable
     */
    public function createByLogo(UserFaviconRepository $userFaviconRepo, Logotype $logotype, bool $saveUserFavicon = false): UserLogo
    {

        return \DB::transaction(function () use ($userFaviconRepo, $logotype, $saveUserFavicon) {
            $userHash = $this->getUserHash($logotype);

            // Save user hash to session
            $userLogo = new UserLogo([
                'logo_id'      => $logotype->id,
                'hash'         => $userHash,
                'logo_content' => $logotype->content,
                'version' => "first_version",
            ]);

            $this->saveTempUserLogoToSession($userHash, $userLogo);

            if ($saveUserFavicon && $logotype->favicon){
                $favicon = $logotype->favicon;
                $userFavicon = $userFaviconRepo->createByFavicon($this, $favicon);
                $userFaviconRepo->saveTempUserFaviconToSession($userFavicon->hash, $userFavicon);
                $userFaviconRepo->saveTempUserLogoToSession($userFavicon->hash, $userLogo);

                $this->saveTempUserFaviconToSession($userHash, $userFavicon);
            }

            return $userLogo;
        });
    }


    /**
     * @param string $hash
     *
     * @return $this
     */
    public function saveHashToSession(string $hash)
    {
        Session::put(self::LAST_USER_HASH, $hash);

        return $this;
    }

    public function saveTempUserLogoToSession(string $hash, $userLogo)
    {
        Session::put(self::TEMP_USER_HASH.$hash, $userLogo);

        return $this;
    }

    public function saveTempUserFaviconToSession(string $hash, $userFavicon)
    {
        Session::put(self::TEMP_FAVICON_HASH.$hash, $userFavicon);

        return $this;
    }

    /**
     * @param Logotype $logotype
     * @param bool     $isRepeatedLogo
     *
     * @return string
     */
    public function getUserHash(Logotype $logotype, $isRepeatedLogo = false): string
    {
        return hash('sha256', $logotype->hash.time());
    }


    public function synchronize(string $logotype, $hash, $version='default')
    {
        return DB::transaction(function () use ($logotype, $hash, $version) {
            // Encrypt logo
            $logotype = $this->decodeLogotype($logotype);

            // Sanitize logo
            $sanitizedLogo = $this->sanitizer->sanitize($logotype);

            // Get some valid svg logo
            $logotype = $sanitizedLogo ?: $logotype;

            $userLogo = $this->first('hash', $hash);

            $userLogo->update([
                'logo_content' => $logotype,
                'version' => $version,
            ]);

            return $userLogo->fresh();
        });
    }
    public function createNewVersion($logotype, $userLogo, $version)
    {
        $userHash = hash('sha256', $userLogo->hash.time());
        // Encrypt logo
        $logotype = $this->decodeLogotype($logotype);

        // Sanitize logo
        $sanitizedLogo = $this->sanitizer->sanitize($logotype);

        // Get some valid svg logo
        $logotype = $sanitizedLogo ?: $logotype;

        $userLogo = UserLogo::create([
            'logo_id'      => $userLogo->logo_id,
            'user_id'      => user()->id,
            'hash'         => $userHash,
            'logo_content' => $logotype,
            'version' => $version,
        ]);

        dispatch(new ActualizeLogoPreview($userLogo, true));

        return $userLogo->hash;
    }
    public function syncGuestLogo($logotype, $sessionUserLogo, $version='default')
    {
        $logotype = $this->decodeLogotype($logotype);
        // Sanitize logo
        $sanitizedLogo = $this->sanitizer->sanitize($logotype);
        // Get some valid svg logo
        $logotype = $sanitizedLogo ?: $logotype;

        $sessionUserLogo->logo_content = $logotype;

        $sessionUserLogo->version = $version;

        session()->put([self::TEMP_USER_HASH.$sessionUserLogo->hash=>$sessionUserLogo]);

        return $sessionUserLogo;
    }

    public function saveUserLogoFromGuestLogo(string $logotype, UserLogo $sessionUserLogo, string $version='default'): UserLogo
    {
        if($logotype)
        {
            $logotype = $this->decodeLogotype($logotype);
            // Sanitize logo
            $sanitizedLogo = $this->sanitizer->sanitize($logotype);
            // Get some valid svg logo
            $logotype = $sanitizedLogo ?: $logotype;
            $sessionUserLogo->logo_content = $logotype;
        }

        $sessionUserLogo->user_id = user()->id;
        $sessionUserLogo->version = $version;

        $sessionUserLogo->save();
        $sessionUserLogo->saveFavicon();

        dispatch(new ActualizeLogoPreview($sessionUserLogo));

        session()->forget(self::TEMP_USER_HASH.$sessionUserLogo->hash);

        return $sessionUserLogo;
    }

    /**
     * @param string $logotype
     *
     * @return string
     */
    protected function decodeLogotype(string $logotype): string
    {
        return base64_decode(str_rot13($logotype));
    }

    /**
     * @param Model $userLogo
     *
     * @return bool
     */
    public function isEdited(Model $userLogo): bool
    {
        return !((string) $userLogo->created_at === (string) $userLogo->updated_at);
    }

    /**
     * @param User $user
     *
     * @return array
     */
    public function getLogotypesPreviews(User $user): array
    {
        $result = [];
        $logotypes = $this->model
            ->whereUserId($user->id)
            ->with(['preview', 'purchases'])
            ->orderBy('updated_at', 'desc')
            ->get();

        foreach ($logotypes as $logotype) {
            $preview = $logotype->preview;

            $result[] = [
                'url'        => route('logotypes.edit', $logotype->hash),
                'updated_at' => Carbon::parse($logotype->updated_at)->format('d F Y'),
                'preview'    => optional($preview)->content,
                'hash'       => $logotype->hash,
            ];

            // If logo preview is outdated
            if ($preview) {
                if (Carbon::parse($preview->updated_at)->diffInMinutes($logotype->updated_at) > 0) {
                    // Actualize logo preview
                    dispatch(new ActualizeLogoPreview($logotype))->onQueue('low');
                }
            }
        }

        return $result;
    }

    public function getLiveLogos(iterable $loadedLogos = []): array
    {
        $previews = [];

        $logos = $this->model->with('preview')
            ->where("user_id", user()->id)
            ->whereNotIn('hash', $loadedLogos)
            ->latest()
            ->limit(6)
            ->get();

        foreach ($logos as $logo) {
            $previews[$logo->hash] = $logo->preview->content;
        }

        return $previews;
    }
}
