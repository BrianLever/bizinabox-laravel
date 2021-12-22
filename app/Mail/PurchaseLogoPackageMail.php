<?php

namespace App\Mail;

use App\Models\Logo\UserLogo;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PurchaseLogoPackageMail extends Mailable
{
    use SerializesModels;

    /**
     * @var UserLogo
     */
    protected $userLogo;

    /**
     * @var string
     */
    protected $attachmentPath;

    /**
     * PurchaseLogoMail constructor.
     *
     * @param UserLogo $userLogo
     * @param string   $attachmentPath
     */
    public function __construct(UserLogo $userLogo, string $attachmentPath)
    {
        $this->userLogo = $userLogo;
        $this->attachmentPath = $attachmentPath;
    }

    /**
     * @return string
     */
    protected function getAttachmentPath()
    {
        return $this->attachmentPath;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->view('mail.archive-images')
            ->subject('Your Logo From '.config('app.name'))
            ->from(config('app.emails.robot'), config('app.name'))
            ->to($this->userLogo->user->email, $this->userLogo->user->name)
            ->attachFromStorage($this->getAttachmentPath());
//            ->bcc(config('app.emails.support'), 'Admin reply')
    }
}
