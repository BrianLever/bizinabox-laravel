<?php

use Illuminate\Support\Facades\Route;
use Spatie\Honeypot\ProtectAgainstSpam;
use App\Http\Controllers\User\SettingController;
use App\Http\Controllers\User as User;

Route::group(['as'=>'user.', 'prefix'=>'account', 'namespace'=>'User','middleware'=>['auth','verified','passwordCheck', 'fw-only-whitelisted']], function(){
    Route::get('/getting-started', 'GettingStartedController@index')->name('getting.started');
    Route::post('/getting-started/username', 'GettingStartedController@username')->name('getting.started.username');
    Route::post('/getting-started/demographics', 'GettingStartedController@demographics')->name('getting.started.demographics');
    Route::post('/getting-started/time', 'GettingStartedController@time')->name('getting.started.time');
    Route::get('/getting-started/complete', 'GettingStartedController@complete')->name('getting.started.complete');
});

Route::group(['as'=>'user.', 'prefix'=>'account', 'namespace'=>'User','middleware'=>['auth','verified','passwordCheck', 'getting-started',  'fw-only-whitelisted']], function(){
    Route::get('/todo', 'TodoController@index')->name('todo.index');
    Route::get('/getTodoCount', 'TodoController@getTodoCount')->name('todo.getTodoCount');
    Route::get('/todo/{type}', 'TodoController@detail')->name('todo.detail');

    Route::get('/started', 'DashboardController@started')->name('started');
    Route::get('/dashboard', 'DashboardController@index')->name('dashboard');


    Route::group(['namespace'=>'Domain'], function() {
        Route::get('domainList', 'DomainListController@index')->name('domainList.index');
        Route::get('domainList/show/{id}', 'DomainListController@show')->name('domainList.show');
        Route::get('domainList/getDetail/{id}', 'DomainListController@getDetail')->name('domainList.getDetail');
        Route::get('domainList/getContact/{id}', 'DomainListController@getContact')->name('domainList.getContact');
        Route::post('domainList/getContact/{id}', 'DomainListController@updateContact')->name('domainList.updateContact');
        Route::get('domainList/getHosts/{id}', 'DomainListController@getHosts')->name('domainList.getHosts');
        Route::post('domainList/setHosts/{id}', 'DomainListController@setHosts')->name('domainList.setHosts');
        Route::get('domainList/getLocked/{id}', 'DomainListController@getLocked')->name('domainList.getLocked');
        Route::get('domainList/switchAction/{id}', 'DomainListController@switchAction')->name('domainList.switchAction');
        Route::get('domainList/getDns/{id}', 'DomainListController@getDns')->name('domainList.getDns');
        Route::post('domainList/getDns/{id}', 'DomainListController@updateDns')->name('domainList.updateDns');
        Route::put('domainList/getDns/{id}', 'DomainListController@setDefaultDns')->name('domainList.setDefaultDns');
        Route::get('domainList/renew/{id}', 'DomainListController@renew')->name('domainList.renew');
        Route::get('domainList/renewConfirm', 'DomainListController@renewConfirm')->name('domainList.renewConfirm');

        Route::post('domainList/renewWithStripe', 'DomainListController@renewWithStripe')
            ->name('domainList.renewWithStripe')
            ->middleware(ProtectAgainstSpam::class);
        Route::post('domainList/renewWithPaypal', 'DomainListController@renewWithPaypal')
            ->name('domainList.renewWithPaypal')
            ->middleware(ProtectAgainstSpam::class);
        Route::get('domainList/renewWithPaypalExecute/{status}', 'DomainListController@renewWithPaypalExecute')
            ->name('domainList.renewWithPaypalExecute');

        Route::get('domain/search', 'DomainController@search')->name('domain.search');
        Route::post('domain/search', 'DomainController@check')->name('domain.check');
        Route::get('domain/loadMore', 'DomainController@loadMore')->name('domain.loadMore');
        Route::get('domain/duration', 'DomainController@duration')->name('domain.duration');
        Route::get('domain/setDuration', 'DomainController@setDuration')->name('domain.setDuration');
        Route::post('domain/setContact', 'DomainController@setContact')->name('domain.setContact');
        Route::get('domain/getConfirm', 'DomainController@getConfirm')->name('domain.getConfirm');
        Route::post('domain/getNow', 'DomainController@getNow')->name('domain.getNow');

        Route::post('domain/paywithStripe', 'PaymentController@paywithStripe')->name('domain.paywithStripe')
            ->middleware(ProtectAgainstSpam::class);
        Route::post('domain/paywithPaypal', 'PaymentController@paywithPaypal')->name('domain.paywithPaypal')
            ->middleware(ProtectAgainstSpam::class);
        Route::get('domain/paywithPaypalExecute/{status}', 'PaymentController@paywithPaypalExecute')->name('domain.paywithPaypalExecute');

        Route::get('domain/transfer', 'DomainTransferController@transfer')->name('domain.transfer');
        Route::get('domain/connect', 'DomainTransferController@connect')->name('domain.connect');
        Route::post('domain/connect', 'DomainTransferController@connectPost')
            ->middleware(ProtectAgainstSpam::class);
        Route::get('domain/disconnect', 'DomainTransferController@disconnect')->name('domain.disconnect');
    });

    Route::get('blog', 'BlogController@index')->name('blog.index');
    Route::get('blog/create', 'BlogController@create')->name('blog.create');
    Route::post('blog/create', 'BlogController@store')->name('blog.store');
    Route::get('blog/detail/{slug}', 'BlogController@detail')->name('blog.detail');
    Route::get('blog/edit/{slug}', 'BlogController@edit')->name('blog.edit');
    Route::post('blog/edit/{slug}', 'BlogController@update')->name('blog.update');

    Route::get('portfolio', [User\PortfolioController::class,'index'])->name('portfolio.index');
    Route::post('portfolio', [User\PortfolioController::class,'store'])->name('portfolio.store');

    Route::get('blogAds', 'BlogAdsController@index')->name('blogAds.index');
    Route::get('blogAds/detail/{id}', 'BlogAdsController@detail')->name('blogAds.detail');
    Route::get('blogAds/edit/{id}', 'BlogAdsController@edit')->name('blogAds.edit');
    Route::post('blogAds/edit/{id}', 'BlogAdsController@update')->name('blogAds.update');
    Route::get('blogAds/tracking/{id}', 'BlogAdsController@tracking')->name('blogAds.tracking');
    Route::get('blogAds/getChart/{id}', 'BlogAdsController@getChart')->name('blogAds.getChart');

    Route::group(['prefix'=>'directory', 'as'=>'directory.'], function() {
        Route::get('/', 'DirectoryController@index')->name('index');
        Route::get('select', 'DirectoryController@select')->name('select');
        Route::get('/create/{id}', 'DirectoryController@create')->name('create');
        Route::post('create/{id}', 'DirectoryController@store')->name('store');
        Route::get('show/{slug}', 'DirectoryController@show')->name('show');
        Route::get('edit/{slug}', 'DirectoryController@edit')->name('edit');
        Route::post('edit/{slug}', 'DirectoryController@update')->name('update');
    });

    Route::get('website/getting-started', [User\WebsiteController::class,'gettingStarted'])->name('website.getting.started');
    Route::get('website/getting-started/getTemplates', [User\WebsiteController::class,'getTemplates'])->name('website.getting.getTemplates');
    Route::get('website/getting-started/getDomains', [User\WebsiteController::class,'getDomains'])->name('website.getting.getDomains');
    Route::get('website/getting-started/previewTemplate', [User\WebsiteController::class,'previewTemplate'])->name('website.getting.previewTemplate');
    Route::get('website/getting-started/checkSubDomain', [User\WebsiteController::class,'checkSubDomain'])->name('website.getting.checkSubDomain');
    Route::get('website/getting-started/getModuleFeatures', [User\WebsiteController::class,'getModuleFeatures'])->name('website.getting.getModuleFeatures');
    Route::get('website/getting-started/getModules', [User\WebsiteController::class,'getModules'])->name('website.getting.getModules');
    Route::get('website/getting-started/saveStep', [User\WebsiteController::class,'saveStep'])->name('website.getting.saveStep');
    Route::post('website/getting-started/submit', [User\WebsiteController::class,'submit'])->name('website.getting.submit');

    Route::get('website', [User\WebsiteController::class,'index'])->name('website.index');
    Route::get('website/create', [User\WebsiteController::class,'create'])->name('website.create');
    Route::get('website/select/{id}', [User\WebsiteController::class,'select'])->name('website.select');
    Route::get('website/domainKeyUp', [User\WebsiteController::class,'domainKeyUp'])->name('website.domainKeyUp');

    Route::post('website/connectDomain', 'WebsiteController@connectDomain')->name('website.connectDomain');
    Route::post('website/updateDomain/{id}', 'WebsiteController@updateDomain')->name('website.updateDomain');
    Route::get('website/loadCustom', 'WebsiteController@loadCustom')->name('website.loadCustom');
    Route::get('website/checkDns', 'WebsiteController@checkDns')->name('website.checkDns');
    Route::post('website/select/{id}', 'WebsiteController@store')->name('website.store');
    Route::get('website/detail/{id}', 'WebsiteController@detail')->name('website.detail');
    Route::get('website/edit/{id}', [User\WebsiteController::class,'edit'])->name('website.edit');
    Route::get('website/editContent/{id}', [User\WebsiteController::class,'editContent'])->name('website.editContent');
    Route::post('website/updateData/{id}', [User\WebsiteController::class,'updateData'])->name('website.updateData');
    Route::post('website/updatePagesOrder', [User\WebsiteController::class,'updatePagesOrder'])->name('website.updatePagesOrder');
    Route::post('website/updatePages/{id}', [User\WebsiteController::class,'updatePage'])->name('website.updatePages');
    Route::post('website/duplicatePage/{id}', [User\WebsiteController::class,'duplicatePage'])->name('website.duplicatePage');
    Route::post('website/deletePage/{pageId}', [User\WebsiteController::class,'deletePage'])->name('website.deletePage');
    Route::post('website/updateBasic/{id}', 'WebsiteController@updateBasic')->name('website.updateBasic');
    Route::post('website/updateOwner/{id}', 'WebsiteController@updateOwner')->name('website.updateOwner');
    Route::post('website/updateModule/{id}', 'WebsiteController@updateModule')->name('website.updateModule');
    Route::get('website/getDomain/{id}', 'WebsiteController@getDomain')->name('website.getDomain');
    Route::get('website/setPrimary/{id}', 'WebsiteController@setPrimary')->name('website.setPrimary');

    Route::group(['namespace'=>'Purchase', 'prefix'=>'purchase', 'as'=>'purchase.'], function() {
        Route::get('order', 'OrderController@index')->name('order.index');
        Route::get('order/detail/{id}', 'OrderController@detail')->name('order.detail');

        Route::get('subscription', 'SubscriptionController@index')->name('subscription.index');
        Route::get('subscription/detail/{id}', 'SubscriptionController@detail')->name('subscription.detail');
        Route::post('subscription/cancel', 'SubscriptionController@cancel')->name('subscription.cancel');

        Route::get('transaction', 'TransactionController@index')->name('transaction.index');
        Route::get('transaction/invoice/{id}', 'TransactionController@invoice')->name('transaction.invoice');
        Route::get('transaction/invoice/{id}/download', 'TransactionController@invoiceDownload')->name('transaction.invoiceDownload');

        Route::get('form', 'FormController@index')->name('form.index');
        Route::get('form/detail/{id}', 'FormController@detail')->name('form.detail');
        Route::get('form/edit/{id}', 'FormController@edit')->name('form.edit');
        Route::post('form/edit/{id}', 'FormController@update')->name('form.update');
        Route::get('form/switch', 'FormController@switchForm')->name('form.switch');

        Route::get('package', 'ProductController@package')->name('package.index');
        Route::get('package/detail/{id}', 'ProductController@packageDetail')->name('package.detail');
        Route::get('readymade', 'ProductController@readymade')->name('readymade.index');
        Route::get('readymade/detail/{id}', 'ProductController@readymadeDetail')->name('readymade.detail');
        Route::get('blog', 'ProductController@blog')->name('blog.index');
        Route::get('blog/detail/{id}', 'ProductController@blogDetail')->name('blog.detail');
        Route::get('plugin', 'ProductController@plugin')->name('plugin.index');
        Route::get('plugin/detail/{id}', 'ProductController@pluginDetail')->name('plugin.detail');
        Route::get('lacarte', 'ProductController@lacarte')->name('lacarte.index');
        Route::get('lacarte/detail/{id}', 'ProductController@lacarteDetail')->name('lacarte.detail');
        Route::get('service', 'ProductController@service')->name('service.index');
        Route::get('service/detail/{id}', 'ProductController@serviceDetail')->name('service.detail');
        Route::get('module', 'ProductController@module')->name('module.index');

    });

    Route::get('file', 'FileController@index')->name('file.index');
    Route::get('file/show/{id}', 'FileController@show')->name('file.show');
    Route::get('file/edit/{id}', 'FileController@edit')->name('file.edit');

    Route::get('ticket', 'TicketController@index')->name('ticket.index');
    Route::get('ticket/create', 'TicketController@create')->name('ticket.create');
    Route::post('ticket/create', 'TicketController@store')->name('ticket.store');
    Route::get('ticket/reply/{id}', 'TicketController@edit')->name('ticket.edit');
    Route::get('ticket/show/{id}', 'TicketController@show')->name('ticket.show');
    Route::post('ticket/reply/{id}', 'TicketController@update')->name('ticket.update');
    Route::get('ticket/switch', 'TicketController@switch')->name('ticket.switch');

    Route::get('tutorial', 'TutorialController@index')->name('tutorial.index');
    Route::get('tutorial/getData', 'TutorialController@getData')->name('tutorial.getData');

    Route::get('appointment', 'AppointmentController@index')->name('appointment.index');
    Route::get('appointment/create', 'AppointmentController@create')->name('appointment.create');
    Route::get('appointment/detail/{id}', 'AppointmentController@detail')->name('appointment.detail');
    Route::get('appointment/edit/{id}', 'AppointmentController@edit')->name('appointment.edit');
    Route::get('appointment/cancel/{id}', 'AppointmentController@cancel')->name('appointment.cancel');
    Route::get('appointment/selectProduct', 'AppointmentController@selectProduct')->name('appointment.selectProduct');
    Route::get('appointment/selectCategory', 'AppointmentController@selectCategory')->name('appointment.selectCategory');
    Route::post('appointment/store', 'AppointmentController@store')->name('appointment.store');

    Route::get('note', 'NoteController@index')->name('note.index');
    Route::post('note', 'NoteController@store')->name('note.store');
    Route::get('note/toggle', 'NoteController@toggle')->name('note.toggle');

    Route::group(['prefix'=>'setting','as'=>'setting.'], function (){
        Route::get('/',[SettingController::class,'index'])->name('index');
    });

    // User logo routes
    Route::group(['prefix'=>'color-palettes','as'=>'color-palettes.'], function(){
        Route::get('/', [User\ColorPaletteController::class, 'index'])->name('index');
        Route::get('/{userPalette}', [User\ColorPaletteController::class, 'edit'])->name('edit');
        Route::delete('/{userPalette}', [User\ColorPaletteController::class, 'delete'])->name('edit');
        Route::get('create/{type}', [User\ColorPaletteController::class, 'create'])->name('create');
        Route::post('/{type}', [User\ColorPaletteController::class, 'store'])->name('store');
        Route::get('/sort/get/{type}', [User\ColorPaletteController::class, 'sortGet'])->name('sortGet');
        Route::post('/sort/store', [User\ColorPaletteController::class, 'sortStore'])->name('sortStore');
    });

    // User logo routes
    Route::group(['prefix'=>'logotypes','as'=>'logotypes.'], function(){
        Route::get('/', [User\UserLogoController::class, 'index'])->name('index');
        Route::get('/edit/{logoHash}', [User\UserLogoController::class, 'editLogo'])->name('edit');
        Route::get('live', [User\UserLogoController::class, 'live'])->name('live');
        Route::get('preview/{hash}', [User\UserLogoController::class, 'preview'])->name('preview');
        Route::get('download/{hash}', [User\UserLogoController::class, 'downloadLogoType'])->name('download')
            ->middleware('throttle:download');
        Route::get('download/package/{hash}', [User\UserLogoController::class, 'downloadPackage'])->name('download.package');
        Route::delete('delete/{hash}', [User\UserLogoController::class, 'delete'])->name('delete');
        Route::get('progress', [User\UserLogoController::class, 'progress'])->name('progress');
    });

    Route::group(['prefix'=>'favicon','as'=>'favicon.'], function(){
        Route::get('/', [User\FaviconController::class, 'index'])->name('index');
        Route::get('/edit/{faviconHash}', [User\FaviconController::class, 'editFavicon'])->name('edit');
        Route::get('live', [User\FaviconController::class, 'live'])->name('live');
        Route::get('preview/{hash}', [User\FaviconController::class, 'preview'])->name('preview');
        Route::get('download/{hash}', [User\FaviconController::class, 'downloadFavicon'])->name('download')
            ->middleware('throttle:download');
        Route::get('download/package/{hash}', [User\FaviconController::class, 'downloadPackage'])->name('download.package');
        Route::delete('delete/{hash}', [User\FaviconController::class, 'delete'])->name('delete');
        Route::get('progress', [User\FaviconController::class, 'progress'])->name('progress');
    });
});
