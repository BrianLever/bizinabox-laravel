<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;


Route::post('/login', [LoginController::class, 'ssoLogin']);

Route::group(['middleware'=>'auth:api'], function (){
    Route::get('/user', function (Request $request){ return $request->user; });
});
