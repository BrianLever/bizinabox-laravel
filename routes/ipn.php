<?php


use Illuminate\Support\Facades\Route;

Route::stripeWebhooks('/ipn/stripe')->name("ipn.stripe");

Route::group(['namespace'=>'Front'], function() {
    Route::post('/ipn/paypal', 'IpnController@paypal')->name('ipn.paypal');
});
