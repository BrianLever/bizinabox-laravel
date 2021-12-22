<?php

namespace App\Jobs;

use App\Models\Logo\UserLogo;
use App\Services\LogotypeService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ActualizeLogoPreview
{
    use Dispatchable, InteractsWithQueue, SerializesModels;

    protected $userLogo;
    protected bool $create;

    /**
     * CreateLogoPreview constructor.
     *
     * @param UserLogo $userLogo
     * @param $create
     */
    public function __construct(UserLogo $userLogo, $create = false)
    {
        $this->userLogo = $userLogo;
        $this->create = $create;
    }

    /**
     * Execute the job.
     *
     * @param LogotypeService $service
     */
    public function handle(LogotypeService $service)
    {
        // Get base64 logo preview
        $b64Data = $service->getLogoPreview($this->userLogo);

        // Actualize data
        $this->userLogo->preview()->updateOrCreate([
            'user_logo_id' => $this->userLogo->id,
        ], [
            'content' => $b64Data,
        ]);

    }

    /**
     * @return array
     */
    public function tags()
    {
        return ['actualize_logo_preview', 'user_logo_id:'.$this->userLogo->id];
    }
}
