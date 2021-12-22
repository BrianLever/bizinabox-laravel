<?php

use Illuminate\Support\Facades\Route;

Route::group(['as'=>'client.', 'prefix'=>'client', 'namespace'=>'Client', 'middleware'=>['fw-only-whitelisted', 'passwordCheck']], function(){
    Route::get('/dashboard', 'DashboardController@index')->name('dashboard');
});

Route::group(['as'=>'client.', 'prefix'=>'client', 'namespace'=>'Account', 'middleware'=>'fw-only-whitelisted'], function(){
    Route::get('chat', 'ChatController@index')->name('chat.index');
    Route::get('chatbox', 'ChatController@chatbox')->name('chatbox.index');
    Route::get('chatbox/getContent', 'ChatController@getContent')->name('chatbox.getContent');
    Route::get('chatbox/updateUnreads', 'ChatController@updateUnreads')->name('chatbox.updateUnreads');
    Route::get('chatbox/readMessage', 'ChatController@readMessage')->name('chatbox.readMessage');
    Route::get('chatbox/endGuestChat', 'ChatController@endGuestChat')->name('chatbox.endGuestChat');
    Route::get('chatbox/transcriptChat', 'ChatController@transcriptChat')->name('chatbox.transcriptChat');
    Route::get('chatbox/getDetail', 'ChatController@getDetail')->name('chatbox.getDetail');
    Route::post('chatbox/sendMessage', 'ChatController@sendMessage')->name('chatbox.sendMessage');
});
