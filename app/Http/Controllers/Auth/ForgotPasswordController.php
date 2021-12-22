<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    public function __construct()
    {
        $nocaptcha = optional(option("nocaptcha"));
        config()->set("captcha.secret", $nocaptcha['secret']);
        config()->set("captcha.sitekey", $nocaptcha['sitekey']);
    }
    public function showLinkRequestForm()
    {
        return view('frontend.auth.passwords.email');
    }

    protected function validateEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'g-recaptcha-response'=>'required|captcha'
        ], [
            'g-recaptcha-response.*' => 'Please check this field.'
        ]);
    }
}
