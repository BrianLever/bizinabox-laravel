<?php

namespace App\Jobs;

use App\Models\UserFavicon;
use App\Services\FaviconService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ActualizeFaviconPreview
{
    use Dispatchable, InteractsWithQueue, SerializesModels;

    protected UserFavicon $userFavicon;
    protected bool $create;

    /**
     * CreateFaviconPreview constructor.
     *
     * @param UserFavicon $userFavicon
     * @param $create
     */
    public function __construct(UserFavicon $userFavicon, $create = false)
    {
        $this->userFavicon = $userFavicon;
        $this->create = $create;
    }

    /**
     * Execute the job.
     *
     * @param FaviconService $service
     */
    public function handle(FaviconService $service)
    {
        // Get base64 favicon preview
        $b64Data = $service->getFaviconPreview($this->userFavicon);

        // Actualize data
        $this->userFavicon->preview()->updateOrCreate([
            'user_favicon_id' => $this->userFavicon->id,
        ], [
            'content' => $b64Data,
        ]);

    }

    /**
     * @return array
     */
    public function tags()
    {
        return ['actualize_favicon_preview', 'user_favicon_id:'.$this->userFavicon->id];
    }
}
