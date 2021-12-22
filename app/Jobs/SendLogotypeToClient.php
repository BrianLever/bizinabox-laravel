<?php

namespace App\Jobs;

use App\Models\UserLogo;
use App\Services\GenerateLogoService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendLogotypeToClient implements ShouldQueue
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
     * @param GenerateLogoService $service
     *
     * @throws \Exception
     */
    public function handle(GenerateLogoService $service)
    {
        $service->setUserLogo($this->userLogo);

        $service->sendToMail();
    }

    /**
     * @return array
     */
    public function tags()
    {
        return ['send_logo', 'user_logo_id:'.$this->userLogo->id];
    }
}
