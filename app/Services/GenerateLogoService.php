<?php

namespace App\Services;

use App\Mail\PurchaseLogoMail;

class GenerateLogoService extends GenerateLogoPackageService
{
    /**
     * @throws \Exception
     */
    public function sendToMail()
    {
        // Send archive to email
        \Mail::send(new PurchaseLogoMail(
            $this->userLogo,
            $this->getLogoPreview($this->userLogo, $addDataImage = false)
        ));
    }
}