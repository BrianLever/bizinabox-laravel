<?php

use Illuminate\Support\Facades\Route;
use Spatie\Honeypot\ProtectAgainstSpam;

use App\Http\Controllers\Admin as Admin;

Route::domain('{slug}.tpl.'.config('app.domain'))->group(function () {
    Route::get('/{url?}', [Admin\Template\ItemController::class, 'v2View'])->name('template.v2View')->withoutMiddleware(['auth','role:admin']);
});

Route::group(['as'=>'admin.', 'prefix'=>'admin', 'namespace'=>'Admin', 'middleware'=>'fw-only-whitelisted'], function(){
    Route::get('/todo', 'TodoController@index')->name('todo.index');
    Route::get('/getTodoCount', 'TodoController@getTodoCount')->name('todo.getTodoCount');
    Route::get('/todo/{type}', 'TodoController@detail')->name('todo.detail');

    Route::get('/dashboard', 'DashboardController@index')->name('dashboard');
    Route::get('/getTitle', 'DashboardController@getTitle')->name('getTitle');
    Route::post('/saveTitle', 'DashboardController@saveTitle')->name('saveTitle');
    Route::get('/test/{name}', 'DashboardController@test')->name('test');
    Route::get('/selectUser', 'DashboardController@selectUser')->name('selectUser');
    Route::get('/dashboard/analytics', 'DashboardController@analytics')->name('dashboard.analytics');
    Route::post('/dashboard/analytics', 'DashboardController@submitAnalytics')->name('dashboard.analytics.submit');
    Route::put('/dashboard/analytics', 'DashboardController@revokeAnalytics')->name('dashboard.analytics.revoke');
    Route::get('/dashboard/getCardData', 'DashboardController@getCardData')->name('dashboard.getCardData');

    Route::group(['as'=>'userManage.', 'prefix'=>'userManage'], function (){
        Route::get('/', [Admin\UserManageController::class, 'index'])->name('index');
        Route::get('/getLogin', [Admin\UserManageController::class,'getLogin'])->name('getLogin');
        Route::get('/create', [Admin\UserManageController::class,'create'])->name('create');
        Route::get('/switchStatus', [Admin\UserManageController::class,'switchStatus'])->name('switchStatus');
        Route::post('/create', [Admin\UserManageController::class,'store'])->name('store');
        Route::get('/detail/{id}', [Admin\UserManageController::class,'detail'])->name('detail');
        Route::get('/edit/{id}', [Admin\UserManageController::class,'edit'])->name('edit');
        Route::post('/updateProfile/{id}', [Admin\UserManageController::class,'updateProfile'])->name('updateProfile');
        Route::post('/updatePassword/{id}', [Admin\UserManageController::class,'updatePassword'])->name('updatePassword');
        Route::post('/uploadStockFiles', [Admin\UserManageController::class,'uploadStockFiles'])->name('uploadStockFiles');
        Route::get('/getStockFiles', [Admin\UserManageController::class,'getStockFiles'])->name('getStockFiles');
        Route::post('/deleteStockFiles', [Admin\UserManageController::class,'deleteStockFiles'])->name('deleteStockFiles');
        Route::get('/{user}', [Admin\UserManageController::class,'delete'])->name('delete');
    });

    Route::group(['namespace'=>'Blog', 'prefix'=>'blog', 'as'=>'blog.'], function() {

        Route::get('front', [Admin\Blog\FrontController::class,'index'])->name('front.index');
        Route::post('front', [Admin\Blog\FrontController::class,'store'])->name('front.store');

        Route::get('setting', 'SettingController@index')->name('setting.index');
        Route::post('setting', 'SettingController@store')->name('setting.store');

        Route::get('package', 'PackageController@index')->name('package.index');
        Route::get('package/switch', 'PackageController@switch')->name('package.switch');
        Route::get('package/sort', 'PackageController@getSort')->name('package.sort');
        Route::post('package/sort', 'PackageController@updateSort');

        Route::get('package/create', 'PackageController@create')->name('package.create');
        Route::post('package/create', 'PackageController@store')->name('package.store');
        Route::get('package/edit/{id}', 'PackageController@edit')->name('package.edit');
        Route::post('package/edit/{id}', 'PackageController@update')->name('package.update');

        Route::post('package/updateMeetingForm/{id}', 'PackageController@updateMeetingForm')->name('package.updateMeetingForm');
        Route::post('package/createPrice/{id}', 'PackageController@createPrice')->name('package.createPrice');
        Route::delete('package/deletePrice/{id}', 'PackageController@deletePrice')->name('package.deletePrice');


        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::post('category', 'CategoryController@store')->name('category.store');
        Route::get('category/switch', 'CategoryController@switch')->name('category.switch');
        Route::get('category/sort', 'CategoryController@getSort')->name('category.sort');
        Route::post('category/sort', 'CategoryController@updateSort');

        Route::get('tag', 'TagController@index')->name('tag.index');
        Route::post('tag', 'TagController@store')->name('tag.store');
        Route::get('tag/switch', 'TagController@switch')->name('tag.switch');

        Route::get('post', 'PostController@index')->name('post.index');
        Route::get('post/create', 'PostController@create')->name('post.create');
        Route::post('post/create', 'PostController@store')->name('post.store');
        Route::get('post/show/{id}', 'PostController@show')->name('post.show');
        Route::get('post/edit/{id}', 'PostController@edit')->name('post.edit');
        Route::post('post/edit/{id}', 'PostController@update')->name('post.update');
        Route::get('post/switchPost', 'PostController@switchPost')->name('post.switchPost');

        Route::get('comment', 'CommentController@index')->name('comment.index');
        Route::get('comment/show/{id}', 'CommentController@show')->name('comment.show');
        Route::get('comment/edit/{id}', 'CommentController@edit')->name('comment.edit');
        Route::post('comment/edit/{id}', 'CommentController@update')->name('comment.update');
        Route::get('comment/switchComment', 'CommentController@switchComment')->name('comment.switchComment');

        Route::get('author', 'AuthorController@index')->name('author.index');
    });

    Route::group(['namespace'=>'BlogAds', 'prefix'=>'blogAds', 'as'=>'blogAds.'], function() {
        Route::get('type', 'TypeController@index')->name('type.index');
        Route::post('type', 'TypeController@store')->name('type.store');
        Route::get('type/switch', 'TypeController@switch')->name('type.switch');

        Route::get('position', 'PositionController@index')->name('position.index');
        Route::post('position', 'PositionController@store')->name('position.store');
        Route::get('position/switch', 'PositionController@switchPosition')->name('position.switch');

        Route::get('spot', 'SpotController@index')->name('spot.index');
        Route::get('spot/create', 'SpotController@create')->name('spot.create');
        Route::post('spot/create', 'SpotController@store')->name('spot.store');
        Route::get('spot/switch', 'SpotController@switchSpot')->name('spot.switch');
        Route::get('spot/getPosition', 'SpotController@getPosition')->name('spot.getPosition');
        Route::get('spot/edit/{id}', 'SpotController@edit')->name('spot.edit');
        Route::post('spot/edit/{id}', 'SpotController@update')->name('spot.update');
        Route::post('spot/createPrice/{id}', 'SpotController@createPrice')->name('spot.createPrice');
        Route::delete('spot/deletePrice/{id}', 'SpotController@deletePrice')->name('spot.deletePrice');
        Route::post('spot/updateListing/{id}', 'SpotController@updateListing')->name('spot.updateListing');

        Route::get('listing', 'ListingController@index')->name('listing.index');
        Route::get('listing/select', 'ListingController@select')->name('listing.select');
        Route::get('listing/create/{slug}', 'ListingController@create')->name('listing.create');
        Route::post('listing/create/{slug}', 'ListingController@store')->name('listing.store');
        Route::get('listing/show/{id}', 'ListingController@show')->name('listing.show');
        Route::get('listing/edit/{id}', 'ListingController@edit')->name('listing.edit');
        Route::post('listing/edit/{id}', 'ListingController@update')->name('listing.update');
        Route::get('listing/tracking/{id}', 'ListingController@tracking')->name('listing.tracking');
        Route::get('listing/getChart/{id}', 'ListingController@getChart')->name('listing.getChart');
        Route::post('listing/updateStatus/{id}', 'ListingController@updateStatus')->name('listing.updateStatus');
        Route::get('listing/switch', 'ListingController@switchListing')->name('listing.switch');

        Route::get('calendar', 'CalendarController@index')->name('calendar.index');
        Route::get('calendar/spot/{id}', 'CalendarController@spot')->name('calendar.spot');
        Route::get('calendar/events', 'CalendarController@events')->name('calendar.events');
    });

    Route::group(['namespace'=>'Directory', 'prefix'=>'directory', 'as'=>'directory.'], function() {

        Route::get('front', [Admin\Directory\FrontController::class,'index'])->name('front.index');
        Route::post('front', [Admin\Directory\FrontController::class,'store'])->name('front.store');

        Route::get('setting', 'SettingController@index')->name('setting.index');
        Route::post('setting', 'SettingController@store')->name('setting.store');

        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::post('category', 'CategoryController@store')->name('category.store');
        Route::get('category/switch', 'CategoryController@switch')->name('category.switch');
        Route::get('category/sort', 'CategoryController@getSort')->name('category.sort');
        Route::post('category/sort', 'CategoryController@updateSort');

        Route::get('tag', 'TagController@index')->name('tag.index');
        Route::post('tag', 'TagController@store')->name('tag.store');
        Route::get('tag/switch', 'TagController@switch')->name('tag.switch');

        Route::get('package', 'PackageController@index')->name('package.index');
        Route::get('package/switch', 'PackageController@switch')->name('package.switch');
        Route::get('package/sort', 'PackageController@getSort')->name('package.sort');
        Route::post('package/sort', 'PackageController@updateSort');

        Route::get('package/create', 'PackageController@create')->name('package.create');
        Route::post('package/create', 'PackageController@store')->name('package.store');
        Route::get('package/edit/{id}', 'PackageController@edit')->name('package.edit');
        Route::post('package/edit/{id}', 'PackageController@update')->name('package.update');

        Route::post('package/updateMeetingForm/{id}', 'PackageController@updateMeetingForm')->name('package.updateMeetingForm');
        Route::post('package/createPrice/{id}', 'PackageController@createPrice')->name('package.createPrice');
        Route::delete('package/deletePrice/{id}', 'PackageController@deletePrice')->name('package.deletePrice');

        Route::get('listing', 'ListingController@index')->name('listing.index');
        Route::get('listing/create', 'ListingController@create')->name('listing.create');
        Route::post('listing/create', 'ListingController@store')->name('listing.store');
        Route::get('listing/show/{id}', 'ListingController@edit')->name('listing.show');
        Route::get('listing/edit/{id}', 'ListingController@edit')->name('listing.edit');
        Route::get('listing/approve/{id}', 'ListingController@approve')->name('listing.approve');
    });

    Route::group(['namespace'=>'Email', 'prefix'=>'email', 'as'=>'email.'], function() {

        Route::get('package', 'PackageController@index')->name('package.index');
        Route::get('package/create', 'PackageController@create')->name('package.create');
        Route::post('package/create', 'PackageController@store')->name('package.store');
        Route::get('package/edit/{id}', 'PackageController@edit')->name('package.edit');
        Route::post('package/edit/{id}', 'PackageController@update')->name('package.update');
        Route::post('package/updateMeeting/{id}', 'PackageController@updateMeeting')->name('package.updateMeeting');
        Route::post('package/createPrice/{id}', 'PackageController@createPrice')->name('package.createPrice');
        Route::post('package/updatePrice/{id}', 'PackageController@updatePrice')->name('package.updatePrice');
        Route::delete('package/deletePrice/{id}', 'PackageController@deletePrice')->name('package.deletePrice');
        Route::get('package/switch', 'PackageController@switch')->name('package.switch');
        Route::get('package/sort', 'PackageController@getSort')->name('package.sort');
        Route::post('package/sort', 'PackageController@updateSort');

        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::post('category', 'CategoryController@store')->name('category.store');
        Route::get('category/switch', 'CategoryController@switch')->name('category.switch');
        Route::get('category/sort', 'CategoryController@getSort')->name('category.sort');
        Route::post('category/sort', 'CategoryController@updateSort');

        Route::get('/template', 'TemplateController@index')->name('template.index');
        Route::get('/template/create', 'TemplateController@create')->name('template.create');
        Route::post('/template/create', 'TemplateController@store')->name('template.store');
        Route::get('/template/edit/{id}', 'TemplateController@edit')->name('template.edit');
        Route::post('/template/updateBody/{id}', 'TemplateController@updateBody')->name('template.updateBody');
        Route::get('/template/switch', 'TemplateController@switch')->name('template.switch');

        Route::get('/campaign', 'CampaignController@index')->name('campaign.index');
        Route::get('/campaign/create', 'CampaignController@create')->name('campaign.create');
        Route::post('/campaign/create', 'CampaignController@store')->name('campaign.store');
        Route::get('/campaign/edit/{id}', 'CampaignController@edit')->name('campaign.edit');
        Route::get('/campaign/show/{id}', 'CampaignController@show')->name('campaign.show');
        Route::get('/campaign/switch', 'CampaignController@switch')->name('campaign.switch');
        Route::get('/campaign/sendNow', 'CampaignController@sendNow')->name('campaign.sendNow');
        Route::get('/campaign/getCategory', 'CampaignController@getCategory')->name('campaign.getCategory');
        Route::get('/campaign/getTemplate', 'CampaignController@getTemplate')->name('campaign.getTemplate');

        Route::get('subscriber', 'SubscriberController@index')->name('subscriber.index');
        Route::get('subscriber/switch', 'SubscriberController@switch')->name('subscriber.switch');
    });

    Route::group(['namespace'=>'Domain'], function() {
        Route::get('domainTld', 'DomainTldsController@index')->name('domainTld.index');
        Route::get('domainTld/switch', 'DomainTldsController@switch')->name('domainTld.switch');
        Route::get('domainTld/get', 'DomainTldsController@get')->name('domainTld.get');
        Route::get('domainTld/show/{id}', 'DomainTldsController@show')->name('domainTld.show');
        Route::get('domainTld/edit/{id}', 'DomainTldsController@edit')->name('domainTld.edit');

        Route::get('domainPrice/switch', 'DomainPricesController@switch')->name('domainPrice.switch');
        Route::get('domainPrice/get', 'DomainPricesController@get')->name('domainPrice.get');
        Route::put('domainPrice/update/{id}', 'DomainPricesController@update')->name('domainPrice.update');

        Route::get('domain/search', 'DomainController@search')->name('domain.search');
        Route::post('domain/search', 'DomainController@check')->name('domain.check');
        Route::get('domain/loadMore', 'DomainController@loadMore')->name('domain.loadMore');
        Route::get('domain/duration', 'DomainController@duration')->name('domain.duration');
        Route::get('domain/setDuration', 'DomainController@setDuration')->name('domain.setDuration');
        Route::post('domain/setContact', 'DomainController@setContact')->name('domain.setContact');
        Route::post('domain/getNow', 'DomainController@getNow')->name('domain.getNow');

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
        Route::post('domainList/renewNow', 'DomainListController@renewNow')->name('domainList.renewNow');

        Route::get('domain/transfer', 'DomainTransferController@transfer')->name('domain.transfer');
        Route::get('domain/connect', 'DomainTransferController@connect')->name('domain.connect');
        Route::get('domain/connectList', 'DomainTransferController@connectList')->name('domain.connectList');
        Route::post('domain/connect', 'DomainTransferController@connectPost')
            ->middleware(ProtectAgainstSpam::class);
        Route::get('domain/disconnect', 'DomainTransferController@disconnect')->name('domain.disconnect');
    });

    Route::group(['namespace'=>'File', 'prefix'=>'file', 'as'=>'file.'], function() {
        Route::get('storage', 'StorageController@index')->name('storage.index');
        Route::get('storage/getData', 'StorageController@getData')->name('storage.getData');
        Route::get('storage/loadSize', 'StorageController@loadSize')->name('main.loadSize');

        Route::get('website', 'WebsiteController@index')->name('website.index');
        Route::get('website/show/{id}', 'WebsiteController@show')->name('website.show');
        Route::get('website/edit/{id}', 'WebsiteController@edit')->name('website.edit');
    });

    Route::group(['namespace'=>'Template', 'prefix'=>'template', 'as'=>'template.'], function() {

        Route::get('category', [Admin\Template\CategoryController::class,'index'])->name('category.index');
        Route::post('category', [Admin\Template\CategoryController::class,'store'])->name('category.store');
        Route::get('category/switch', [Admin\Template\CategoryController::class,'switch'])->name('category.switch');
        Route::get('category/sort', [Admin\Template\CategoryController::class,'getSort'])->name('category.sort');
        Route::post('category/sort', [Admin\Template\CategoryController::class,'updateSort']);

        Route::get('header', [Admin\Template\HeaderController::class,'index'])->name('header.index');
        Route::post('header', [Admin\Template\HeaderController::class,'store'])->name('header.store');
        Route::get('header/switch', [Admin\Template\HeaderController::class,'switch'])->name('header.switch');
        Route::get('header/edit/{id}', [Admin\Template\HeaderController::class,'edit'])->name('header.edit');

        Route::get('footer', [Admin\Template\FooterController::class,'index'])->name('footer.index');
        Route::post('footer', [Admin\Template\FooterController::class,'store'])->name('footer.store');
        Route::get('footer/switch', [Admin\Template\FooterController::class,'switch'])->name('footer.switch');
        Route::get('footer/edit/{id}', [Admin\Template\FooterController::class,'edit'])->name('footer.edit');

        Route::get('section', [Admin\Template\SectionController::class,'index'])->name('section.index');
        Route::post('section/category', [Admin\Template\SectionController::class,'categoryStore'])->name('section.category.store');
        Route::post('section/itemStore/{id}', [Admin\Template\SectionController::class,'itemStore'])->name('section.item.store');
        Route::post('section/itemUpdate/{id}', [Admin\Template\SectionController::class,'itemUpdate'])->name('section.item.update');
        Route::get('section/category/switch', [Admin\Template\SectionController::class,'switch'])->name('section.category.switch');
        Route::get('section/item/switch', [Admin\Template\SectionController::class,'itemSwitch'])->name('section.item.switch');
        Route::get('section/create/{id}', [Admin\Template\SectionController::class,'create'])->name('section.create');
        Route::get('section/edit/{id}', [Admin\Template\SectionController::class,'edit'])->name('section.edit');

        Route::get('item', [Admin\Template\ItemController::class, 'index'])->name('item.index');
        Route::post('item', [Admin\Template\ItemController::class, 'store'])->name('item.store');
        Route::get('item/switch', [Admin\Template\ItemController::class, 'switch'])->name('item.switch');
        Route::get('item/edit/{id}', [Admin\Template\ItemController::class, 'edit'])->name('item.edit');
        Route::post('item/edit/{id}', [Admin\Template\ItemController::class, 'update'])->name('item.update');
        Route::get('item/preview/{slug}/{url?}', [Admin\Template\ItemController::class, 'preview'])->name('item.preview')->withoutMiddleware(['auth','role:admin']);
        Route::get('item/getTemplatePreviewData/{id}', [Admin\Template\ItemController::class, 'getTemplatePreviewData'])->name('item.getTemplatePreviewData')->withoutMiddleware(['auth','role:admin']);;
        Route::get('item/editPages/{id}', [Admin\Template\ItemController::class, 'editPages'])->name('item.editPages');

        Route::get('page/{template_id}', [Admin\Template\PageController::class,'index'])->name('page.index');
        Route::post('page/{template_id}', [Admin\Template\PageController::class,'store'])->name('page.store');
        Route::post('addNewPage/{template_id}', [Admin\Template\PageController::class,'addNewPage'])->name('page.addNewPage');
        Route::get('page/edit/{id}', [Admin\Template\PageController::class,'edit'])->name('page.edit');
        Route::get('page/switch/edit', [Admin\Template\PageController::class,'switch'])->name('page.switch');
        Route::get('page/editPage/{id}', [Admin\Template\PageController::class,'editPage'])->name('page.editPage');
        Route::post('page/addNewPage/{pageName}', [Admin\Template\PageController::class,'addNewPage'])->name('page.addNewPage');
        Route::post('page/duplicatePage/{id}', [Admin\Template\PageController::class,'duplicatePage'])->name('page.duplicatePage');
        Route::post('page/deletePage/{id}', [Admin\Template\PageController::class,'deletePage'])->name('page.deletePage');
        Route::get('page/editContent/{id}/{type}', [Admin\Template\PageController::class,'editContent'])->name('page.editContent');
        Route::post('page/editContent/{id}/{type}', [Admin\Template\PageController::class,'updateContent']);
        Route::post('page/update/page/{id}', [Admin\Template\PageController::class,'updatePage'])->name('page.updatePage');
        Route::post('page/update/order', [Admin\Template\PageController::class,'updateOrder'])->name('page.updateOrder');

        Route::post('/page/upload/cover/{page_id}', [Admin\Template\PageController::class,'uploadCover'])->name('page.uploadCover');
        Route::post('/page/upload/largeImage/{page_id}', [Admin\Template\PageController::class,'uploadLarageImage'])->name('page.largeImage');
        Route::post('/page/upload/moduleImage/{page_id}', [Admin\Template\PageController::class,'uploadModuleImage'])->name('page.moduleImage');
        Route::post('/page/upload/saveImage/{page_id}', [Admin\Template\PageController::class,'storeImage'])->name('page.saveImage');

    });

    Route::group(['namespace'=>'Website', 'prefix'=>'website', 'as'=>'website.'], function() {
        Route::get('list', [Admin\Website\ListController::class,'index'])->name('list.index');
        Route::get('list/create', [Admin\Website\ListController::class,'create'])->name('list.create');
        Route::post('list/create', [Admin\Website\ListController::class,'store'])->name('list.store');
        Route::get('list/show/{id}', [Admin\Website\ListController::class,'show'])->name('list.show');
        Route::get('list/edit/{id}', [Admin\Website\ListController::class,'edit'])->name('list.edit');
        Route::get('list/switch', [Admin\Website\ListController::class,'switch'])->name('list.switch');
        Route::post('list/connectDomain', [Admin\Website\ListController::class,'connectDomain'])->name('list.connectDomain');
        Route::post('list/updateDomain/{id}', [Admin\Website\ListController::class,'updateDomain'])->name('list.updateDomain');
        Route::post('list/updateModule/{id}', [Admin\Website\ListController::class,'updateModule'])->name('list.updateModule');
        Route::get('list/loadCustom', [Admin\Website\ListController::class,'loadCustom'])->name('list.loadCustom');
        Route::get('list/checkDns', [Admin\Website\ListController::class,'checkDns'])->name('list.checkDns');
        Route::get('list/setPrimary/{id}', [Admin\Website\ListController::class,'setPrimary'])->name('list.setPrimary');
        Route::post('list/profileUpdate/{id}', [Admin\Website\ListController::class,'profileUpdate'])->name('list.profileUpdate');
        Route::post('list/basicUpdate/{id}', [Admin\Website\ListController::class,'basicUpdate'])->name('list.basicUpdate');
    });

    Route::group(['namespace'=>'Mail', 'prefix'=>'mail', 'as'=>'mail.'], function() {
        Route::get('domain', 'DomainController@index')->name('domain.index');
        Route::get('domain/create', 'DomainController@create')->name('domain.create');
        Route::post('domain/create', 'DomainController@store')->name('domain.store');
        Route::get('domain/edit/{id}', 'DomainController@edit')->name('domain.edit');
        Route::post('domain/edit/{id}', 'DomainController@update')->name('domain.update');
        Route::delete('domain/delete', 'DomainController@delete')->name('domain.delete');

        Route::get('domain/{id}/accounts', 'AccountController@index')->name('account.index');
        Route::get('domain/{id}/accounts/create', 'AccountController@create')->name('account.create');
        Route::post('domain/{id}/accounts/create', 'AccountController@store')->name('account.store');
        Route::get('domain/accounts/edit/{id}', 'AccountController@edit')->name('account.edit');
        Route::post('domain/accounts/edit/{id}', 'AccountController@update')->name('account.update');
        Route::delete('domain/accounts/delete', 'AccountController@delete')->name('account.delete');
    });
    Route::group(['namespace'=>'PurchaseFollowup', 'prefix'=>'purchasefollowup', 'as'=>'purchasefollowup.'], function() {
        Route::get('email', 'EmailController@index')->name('email.index');
        Route::post('email', 'EmailController@store')->name('email.store');
        Route::get('email/switch', 'EmailController@switch')->name('email.switch');

        Route::get('form', 'FormController@index')->name('form.index');
        Route::get('form/create', 'FormController@create')->name('form.create');
        Route::post('form/create', 'FormController@store')->name('form.store');
        Route::get('form/show/{id}', 'FormController@show')->name('form.show');
        Route::get('form/edit/{id}', 'FormController@edit')->name('form.edit');
        Route::get('form/switch', 'FormController@switch')->name('form.switch');
    });

    Route::group(['namespace'=>'Portfolio', 'prefix'=>'portfolio', 'as'=>'portfolio.'], function() {

        Route::get('front', [Admin\Portfolio\FrontController::class,'index'])->name('front.index');
        Route::post('front', [Admin\Portfolio\FrontController::class,'store'])->name('front.store');

        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::post('category', 'CategoryController@store')->name('category.store');
        Route::get('category/switch', 'CategoryController@switch')->name('category.switch');
        Route::get('category/sort', 'CategoryController@getSort')->name('category.sort');
        Route::post('category/sort', 'CategoryController@updateSort');

        Route::get('item', 'ItemController@index')->name('item.index');
        Route::get('item/create', 'ItemController@create')->name('item.create');
        Route::post('item/create', 'ItemController@store')->name('item.store');
        Route::get('item/edit/{id}', 'ItemController@edit')->name('item.edit');
        Route::post('item/edit/{id}', 'ItemController@update')->name('item.update');
        Route::get('item/approve/{id}', 'ItemController@approve')->name('item.approve');
        Route::get('item/switch', 'ItemController@switch')->name('item.switch');
    });

    Route::group(['namespace'=>'Service', 'prefix'=>'service', 'as'=>'service.'], function() {
        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::post('category', 'CategoryController@store')->name('category.store');
        Route::get('category/switch', 'CategoryController@switch')->name('category.switch');
        Route::get('category/sort', 'CategoryController@getSort')->name('category.sort');
        Route::post('category/sort', 'CategoryController@updateSort');

        Route::get('item', 'ItemController@index')->name('item.index');
        Route::get('item/switch', 'ItemController@switch')->name('item.switch');
        Route::get('item/create', 'ItemController@create')->name('item.create');
        Route::post('item/create', 'ItemController@store')->name('item.store');
        Route::get('item/edit/{id}', 'ItemController@edit')->name('item.edit');
        Route::post('item/edit/{id}', 'ItemController@update')->name('item.update');
        Route::post('item/updateMeetingForm/{id}', 'ItemController@updateMeetingForm')->name('item.updateMeetingForm');

    });

    Route::group(['namespace'=>'Plugin', 'prefix'=>'plugin', 'as'=>'plugin.'], function() {
        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::post('category', 'CategoryController@store')->name('category.store');
        Route::get('category/switch', 'CategoryController@switch')->name('category.switch');
        Route::get('category/sort', 'CategoryController@getSort')->name('category.sort');
        Route::post('category/sort', 'CategoryController@updateSort');

        Route::get('item', 'ItemController@index')->name('item.index');
        Route::get('item/switch', 'ItemController@switch')->name('item.switch');

        Route::get('item/create', 'ItemController@create')->name('item.create');
        Route::post('item/create', 'ItemController@store')->name('item.store');
        Route::get('item/edit/{id}', 'ItemController@edit')->name('item.edit');
        Route::post('item/edit/{id}', 'ItemController@update')->name('item.update');

        Route::post('item/updateMeetingForm/{id}', 'ItemController@updateMeetingForm')->name('item.updateMeetingForm');

    });

    Route::group(['namespace'=>'Lacarte', 'prefix'=>'lacarte', 'as'=>'lacarte.'], function() {
        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::post('category', 'CategoryController@store')->name('category.store');
        Route::get('category/switch', 'CategoryController@switch')->name('category.switch');
        Route::get('category/sort', 'CategoryController@getSort')->name('category.sort');
        Route::post('category/sort', 'CategoryController@updateSort');

        Route::get('item', 'ItemController@index')->name('item.index');
        Route::get('item/switch', 'ItemController@switch')->name('item.switch');

        Route::get('item/create', 'ItemController@create')->name('item.create');
        Route::post('item/create', 'ItemController@store')->name('item.store');
        Route::get('item/edit/{id}', 'ItemController@edit')->name('item.edit');
        Route::post('item/edit/{id}', 'ItemController@update')->name('item.update');

        Route::post('item/updateMeetingForm/{id}', 'ItemController@updateMeetingForm')->name('item.updateMeetingForm');

    });

    Route::group(['namespace'=>'Module', 'prefix'=>'module', 'as'=>'module.'], function() {
        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::post('category', 'CategoryController@store')->name('category.store');
        Route::get('category/switch', [Admin\Module\CategoryController::class,'switch'])->name('category.switch');
        Route::get('category/sort', 'CategoryController@getSort')->name('category.sort');
        Route::post('category/sort', 'CategoryController@updateSort');

        Route::get('item', 'ItemController@index')->name('item.index');
        Route::get('item/switch', 'ItemController@switch')->name('item.switch');

        Route::get('item/create', 'ItemController@create')->name('item.create');
        Route::post('item/create', 'ItemController@store')->name('item.store');
        Route::get('item/edit/{id}', 'ItemController@edit')->name('item.edit');
        Route::post('item/edit/{id}', 'ItemController@update')->name('item.update');

        Route::post('item/createPrice/{id}', 'ItemController@createPrice')->name('item.createPrice');
        Route::delete('item/deletePrice/{id}', 'ItemController@deletePrice')->name('item.deletePrice');
        Route::post('item/updateMeetingForm/{id}', 'ItemController@updateMeetingForm')->name('item.updateMeetingForm');

    });

    Route::group(['namespace'=>'Package', 'prefix'=>'package', 'as'=>'package.'], function() {
        Route::get('item', 'ItemController@index')->name('item.index');
        Route::get('item/switch', 'ItemController@switch')->name('item.switch');
        Route::get('item/sort', 'ItemController@getSort')->name('item.sort');
        Route::post('item/sort', 'ItemController@updateSort');

        Route::get('item/create', 'ItemController@create')->name('item.create');
        Route::post('item/create', 'ItemController@store')->name('item.store');
        Route::get('item/edit/{id}', 'ItemController@edit')->name('item.edit');
        Route::post('item/edit/{id}', 'ItemController@update')->name('item.update');

        Route::post('item/updateModule/{id}', 'ItemController@updateModule')->name('item.updateModule');
        Route::post('item/createPrice/{id}', 'ItemController@createPrice')->name('item.createPrice');
        Route::delete('item/deletePrice/{id}', 'ItemController@deletePrice')->name('item.deletePrice');
        Route::post('item/updateMeetingForm/{id}', 'ItemController@updateMeetingForm')->name('item.updateMeetingForm');

    });

    Route::group(['namespace'=>'ReadyMade', 'prefix'=>'readymade', 'as'=>'readymade.'], function() {
        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::post('category', 'CategoryController@store')->name('category.store');
        Route::get('category/switch', 'CategoryController@switch')->name('category.switch');
        Route::get('category/sort', 'CategoryController@getSort')->name('category.sort');
        Route::post('category/sort', 'CategoryController@updateSort');

        Route::get('item', 'ItemController@index')->name('item.index');
        Route::get('item/switch', 'ItemController@switch')->name('item.switch');

        Route::get('item/create', 'ItemController@create')->name('item.create');
        Route::post('item/create', 'ItemController@store')->name('item.store');
        Route::get('item/edit/{id}', 'ItemController@edit')->name('item.edit');
        Route::post('item/edit/{id}', 'ItemController@update')->name('item.update');

        Route::post('item/updateModule/{id}', 'ItemController@updateModule')->name('item.updateModule');
        Route::post('item/createPrice/{id}', 'ItemController@createPrice')->name('item.createPrice');
        Route::delete('item/deletePrice/{id}', 'ItemController@deletePrice')->name('item.deletePrice');
        Route::post('item/updateMeetingForm/{id}', 'ItemController@updateMeetingForm')->name('item.updateMeetingForm');

    });

    Route::group(['prefix'=>'review', 'as'=>'review.'], function() {
        Route::get('/', 'ReviewController@index')->name('index');
        Route::get('/show/{id}', 'ReviewController@show')->name('show');
        Route::get('/edit', 'ReviewController@edit')->name('edit');
        Route::post('/edit', 'ReviewController@update')->name('update');
        Route::get('/switch', 'ReviewController@switch')->name('switch');
    });

    Route::group(['prefix'=>'slider', 'as'=>'slider.'], function() {
        Route::get('/', 'SliderController@index')->name('index');
        Route::post('/', 'SliderController@store')->name('store');
        Route::get('/product', 'SliderController@product')->name('product');
        Route::get('/switch', 'SliderController@switch')->name('switch');
        Route::get('/sort', 'SliderController@getSort')->name('sort');
        Route::post('/sort', 'SliderController@updateSort');
    });

    Route::group(['prefix'=>'testimonial', 'as'=>'testimonial.'], function() {
        Route::get('/', 'TestimonialController@index')->name('index');
        Route::post('/', 'TestimonialController@store')->name('store');
        Route::get('/switch', 'TestimonialController@switch')->name('switch');
        Route::get('/sort', 'TestimonialController@getSort')->name('sort');
        Route::post('/sort', 'TestimonialController@updateSort');
    });

    Route::group(['prefix'=>'coupon', 'as'=>'coupon.'], function() {
        Route::get('/', 'CouponController@index')->name('index');
        Route::post('/', 'CouponController@store')->name('store');
        Route::get('/product', 'CouponController@product')->name('product');
        Route::get('/edit', 'CouponController@edit')->name('edit');
        Route::get('/switch', 'CouponController@switch')->name('switch');
    });

    Route::group(['prefix'=>'legalPage', 'as'=>'legalPage.'], function() {
        Route::get('/', 'LegalPageController@index')->name('index');
        Route::get('/edit/{slug}', 'LegalPageController@edit')->name('edit');
        Route::post('/edit/{slug}', 'LegalPageController@update')->name('update');
    });

    Route::group(['namespace'=>'TeamManage', 'prefix'=>'teamManage', 'as'=>'teamManage.'], function() {
        Route::get('property', 'PropertyController@index')->name('property.index');
        Route::post('property', 'PropertyController@store')->name('property.store');
        Route::get('property/switch', 'PropertyController@switch')->name('property.switch');
        Route::get('property/sort', 'PropertyController@getSort')->name('property.sort');
        Route::post('property/sort', 'PropertyController@updateSort');

        Route::get('team', 'TeamController@index')->name('team.index');
        Route::get('team/create/{slug?}', 'TeamController@create')->name('team.create');
        Route::get('team/selectUser', 'TeamController@selectUser')->name('team.selectUser');
        Route::post('team/create/{slug?}', 'TeamController@store')->name('team.store');
        Route::get('team/switch', 'TeamController@switch')->name('team.switch');
        Route::get('team/edit/{id}', 'TeamController@edit')->name('team.edit');
        Route::post('team/edit/{id}', 'TeamController@update')->name('team.update');
        Route::get('team/{slug}/subteams', 'TeamController@subteam')->name('team.subteam');

    });

    Route::group(['namespace'=>'LiveChat', 'prefix'=>'livechat', 'as'=>'livechat.'], function() {
        Route::get('setting', 'SettingController@index')->name('setting.index');
        Route::post('setting', 'SettingController@store')->name('setting.store');

        Route::get('service', 'ServiceController@index')->name('service.index');
        Route::post('service', 'ServiceController@store')->name('service.store');
        Route::get('service/switch', 'ServiceController@switch')->name('service.switch');
        Route::get('service/sort', 'ServiceController@getSort')->name('service.sort');
        Route::post('service/sort', 'ServiceController@updateSort');

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

    //HelpCenter FAQ Category routes
    Route::group(['namespace'=>'Faq', 'prefix'=>'faq', 'as'=>'faq.'], function() {
        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::post('category', 'CategoryController@store')->name('category.store');
        Route::get('category/switch', 'CategoryController@switch')->name('category.switch');
        Route::get('category/sort', 'CategoryController@getSort')->name('category.sort');
        Route::post('category/sort', 'CategoryController@updateSort');

        Route::get('item', 'ItemController@index')->name('item.index');
        Route::get('item/create', 'ItemController@create')->name('item.create');
        Route::post('item/create', 'ItemController@store')->name('item.store');
        Route::get('item/edit/{id}', 'ItemController@edit')->name('item.edit');
        Route::post('item/edit/{id}', 'ItemController@update')->name('item.update');
        Route::get('item/switch', 'ItemController@switch')->name('item.switch');
    });

    Route::group(['namespace'=>'Ticket', 'prefix'=>'ticket', 'as'=>'ticket.'], function() {
        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::post('category', 'CategoryController@store')->name('category.store');
        Route::get('category/switch', 'CategoryController@switch')->name('category.switch');
        Route::get('category/sort', 'CategoryController@getSort')->name('category.sort');
        Route::post('category/sort', 'CategoryController@updateSort');

        Route::get('item', 'ItemController@index')->name('item.index');
        Route::get('item/reply/{id}', 'ItemController@edit')->name('item.edit');
        Route::get('item/show/{id}', 'ItemController@show')->name('item.show');
        Route::post('item/reply/{id}', 'ItemController@update')->name('item.update');
        Route::get('item/switch', 'ItemController@switchTicket')->name('item.switch');
    });

    Route::group(['namespace'=>'Appointment', 'prefix'=>'appointment', 'as'=>'appointment.'], function() {
        Route::get('setting', 'SettingController@index')->name('setting.index');
        Route::post('setting', 'SettingController@store')->name('setting.store');

        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::get('category/create', 'CategoryController@create')->name('category.create');
        Route::post('category/create', 'CategoryController@store')->name('category.store');
        Route::get('category/edit/{id}', 'CategoryController@edit')->name('category.edit');
        Route::post('category/edit/{id}', 'CategoryController@update')->name('category.update');
        Route::get('category/switch', 'CategoryController@switch')->name('category.switch');
        Route::get('category/sort', 'CategoryController@getSort')->name('category.sort');
        Route::post('category/sort', 'CategoryController@updateSort');

        Route::get('unavailable-dates/{type}/{id}', 'BlockDateController@index')->name('blockDate.index');
        Route::get('unavailable-dates/edit/{type}/{id}', 'BlockDateController@edit')->name('blockDate.edit');
        Route::post('unavailable-dates/{type}/{id}', 'BlockDateController@store')->name('blockDate.store');
        Route::post('unavailable-dates/delete/{type}/{id}', 'BlockDateController@delete')->name('blockDate.delete');

        Route::get('/listing', 'ListingController@index')->name('listing.index');
        Route::get('/listing/getData', 'ListingController@getData')->name('listing.getData');
        Route::get('/listing/edit/{id}', 'ListingController@edit')->name('listing.edit');
        Route::post('/listing/approve/{id}', 'ListingController@update')->name('listing.update');
        Route::get('/listing/detail/{id}', 'ListingController@detail')->name('listing.detail');
        Route::get('/listing/switch', 'ListingController@switchListing')->name('listing.switch');
        Route::get('/listing/allListing', 'ListingController@allListing')->name('listing.allListing');

    });

    Route::group(['namespace'=>'Setting', 'prefix'=>'setting', 'as'=>'setting.'], function() {
        Route::get('seo', 'SeoController@index')->name('seo.index');
        Route::post('seo', 'SeoController@store')->name('seo.store');

        Route::get('social', 'SocialController@index')->name('social.index');
        Route::post('social', 'SocialController@store')->name('social.store');

        Route::get('payment', 'PaymentController@index')
            ->name('payment.index')
            ->middleware("password.confirm");
        Route::post('payment', 'PaymentController@store')->name('payment.store');

        Route::get('third-party', 'ThirdPartyController@index')
            ->name('third_party.index')
            ->middleware("password.confirm");

        Route::post('third-party', 'ThirdPartyController@store')
            ->name('third_party.store');

        Route::get('firewall', 'FirewallController@index')->name('firewall.index');
        Route::post('firewall', 'FirewallController@store')->name('firewall.store');
        Route::get('firewall/switch', 'FirewallController@switch')->name('firewall.switch');

    });

    Route::group(['namespace'=>'Tutorial', 'prefix'=>'tutorial', 'as'=>'tutorial.'], function() {
        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::post('category', 'CategoryController@store')->name('category.store');
        Route::get('category/switch', 'CategoryController@switch')->name('category.switch');
        Route::get('category/sort', 'CategoryController@getSort')->name('category.sort');
        Route::post('category/sort', 'CategoryController@updateSort');

        Route::get('item', 'TutorialController@index')->name('item.index');
        Route::get('item/create', 'TutorialController@create')->name('item.create');
        Route::get('item/getCategory', 'TutorialController@getCategory')->name('item.getCategory');
        Route::post('item/create', 'TutorialController@store')->name('item.store');
        Route::get('item/edit/{id}', 'TutorialController@edit')->name('item.edit');
        Route::get('item/detail/{id}', 'TutorialController@detail')->name('item.detail');
        Route::post('item/edit/{id}', 'TutorialController@update')->name('item.update');
        Route::get('item/switch', 'TutorialController@switch')->name('item.switch');
    });



    Route::get('announcement', 'AnnouncementController@index')->name('announcement.index');
    Route::post('announcement', 'AnnouncementController@store')->name('announcement.store');
    Route::get('announcement/switch', 'AnnouncementController@switch')->name('announcement.switch');

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

    Route::group(['namespace'=>'Notification', 'prefix'=>'notification', 'as'=>'notification.'], function() {
        Route::get('category', 'CategoryController@index')->name('category.index');
        Route::post('category', 'CategoryController@store')->name('category.store');
        Route::get('category/switch', 'CategoryController@switch')->name('category.switch');

        Route::get('template', 'TemplateController@index')->name('template.index');
        Route::get('template/create', 'TemplateController@create')->name('template.create');
        Route::post('template/create', 'TemplateController@store')->name('template.store');
        Route::get('template/edit/{id}', 'TemplateController@edit')->name('template.edit');
        Route::get('template/show/{id}', 'TemplateController@show')->name('template.show');
        Route::get('template/switch', 'TemplateController@switch')->name('template.switch');

    });

    Route::group(['prefix'=>'home-sliders', 'as'=>'home-sliders.'], function (){
        Route::get('/', [Admin\ContentManagement\HomeSliderController::class,'index'])->name('index');
        Route::post('/', [Admin\ContentManagement\HomeSliderController::class,'store'])->name('store');
        Route::get('/switch', [Admin\ContentManagement\HomeSliderController::class,'switch'])->name('switch');
    });

    Route::group(['prefix'=>'boxes', 'as'=>'boxes.'], function (){
        Route::get('/', [Admin\ContentManagement\BoxesController::class,'index'])->name('index');
        Route::post('/middle-box', [Admin\ContentManagement\BoxesController::class,'middleBox'])->name('middleBox');
        Route::post('/', [Admin\ContentManagement\BoxesController::class,'store'])->name('store');
        Route::get('/switch', [Admin\ContentManagement\BoxesController::class,'switch'])->name('switch');
    });

    Route::group(['prefix'=>'video','as'=>'video.'], function(){
        Route::get('/', [Admin\ContentManagement\VideoController::class,'index'])->name('index');
        Route::post('/', [Admin\ContentManagement\VideoController::class,'update'])->name('update');
    });

    Route::group(['prefix'=>'video', 'as'=>'video.'], function() {
        Route::get('category', [Admin\Logo\Video\CategoryController::class, 'index'])->name('category.index');
        Route::post('category', [Admin\Logo\Video\CategoryController::class, 'store'])->name('category.store');
        Route::get('category/switch', [Admin\Logo\Video\CategoryController::class, 'switch'])->name('category.switch');
        Route::get('category/sort', [Admin\Logo\Video\CategoryController::class, 'getSort'])->name('category.sort');
        Route::post('category/sort', [Admin\Logo\Video\CategoryController::class, 'updateSort']);

        Route::get('item', [Admin\Logo\Video\ItemController::class, 'index'])->name('item.index');
        Route::get('item/create', [Admin\Logo\Video\ItemController::class, 'create'])->name('item.create');
        Route::get('item/getCategory', [Admin\Logo\Video\ItemController::class, 'getCategory'])->name('item.getCategory');
        Route::post('item/create', [Admin\Logo\Video\ItemController::class, 'store'])->name('item.store');
        Route::get('item/edit/{id}', [Admin\Logo\Video\ItemController::class, 'edit'])->name('item.edit');
        Route::get('item/detail/{id}', [Admin\Logo\Video\ItemController::class, 'detail'])->name('item.detail');
        Route::post('item/edit/{id}', [Admin\Logo\Video\ItemController::class, 'update'])->name('item.update');
        Route::get('item/switch', [Admin\Logo\Video\ItemController::class, 'switch'])->name('item.switch');
    });

    Route::group(['prefix'=>'home','as'=>'home.'], function(){
        Route::get('/how-to-build', [Admin\ContentManagement\HomePageController::class,'howToBuild'])->name('how-to-build');
        Route::put('/how-to-build', [Admin\ContentManagement\HomePageController::class,'updateHowToBuild'])->name('update-how-to-build');
    });



    Route::group(['prefix'=>'logotypes', 'as'=>'logotypes.'], function() {
        Route::get('front', [Admin\Logo\LogoType\FrontController::class,'index'])->name('front.index');
        Route::post('front', [Admin\Logo\LogoType\FrontController::class,'store'])->name('front.store');

        //logo type category CRUD
        Route::get('category', [Admin\Logo\LogoType\CategoryController::class, 'index'])->name('category.index');
        Route::post('category', [Admin\Logo\LogoType\CategoryController::class, 'store'])->name('category.store');
        Route::delete('category/delete/{id}', [Admin\Logo\LogoType\CategoryController::class, 'delete'])->name('category.delete');
        Route::get('category/sort', [Admin\Logo\LogoType\CategoryController::class, 'getSort'])->name('category.sort');
        Route::post('category/sort', [Admin\Logo\LogoType\CategoryController::class, 'updateSort']);

        Route::get('color', [Admin\Logo\LogoType\ColorController::class, 'index'])->name('color.index');
        Route::post('color/category/store', [Admin\Logo\LogoType\ColorController::class, 'categoryStore'])->name('color.category.store');
        Route::get('color/category/sort', [Admin\Logo\LogoType\ColorController::class, 'categorySort'])->name('color.category.sort');
        Route::post('color/category/sort', [Admin\Logo\LogoType\ColorController::class, 'categoryUpdateSort']);
        Route::delete('color/category/delete/{id}', [Admin\Logo\LogoType\ColorController::class, 'categoryDelete'])->name('color.category.delete');

        Route::get('color/item/{id}', [Admin\Logo\LogoType\ColorController::class, 'item'])->name('color.item.index');
        Route::get('color/item/create/{id}', [Admin\Logo\LogoType\ColorController::class, 'itemCreate'])->name('color.item.create');
        Route::post('color/item/create/{id}', [Admin\Logo\LogoType\ColorController::class, 'itemStore'])->name('color.item.store');
        Route::get('color/item/edit/{id}', [Admin\Logo\LogoType\ColorController::class, 'itemEdit'])->name('color.item.edit');
        Route::post('color/item/edit/{id}', [Admin\Logo\LogoType\ColorController::class, 'itemUpdate'])->name('color.item.update');
        Route::get('color/item/sort/get', [Admin\Logo\LogoType\ColorController::class, 'itemSort'])->name('color.item.sort');
        Route::post('color/item/sort/get', [Admin\Logo\LogoType\ColorController::class, 'itemUpdateSort']);
        Route::delete('color/item/delete/{id}', [Admin\Logo\LogoType\ColorController::class, 'itemDelete'])->name('color.item.delete');
        Route::post('color/item/solidStore/{id}', [Admin\Logo\LogoType\ColorController::class, 'solidStore'])->name('color.item.solidStore');
        Route::post('color/item/solidUpdate/{id}', [Admin\Logo\LogoType\ColorController::class, 'solidUpdate'])->name('color.item.solidUpdate');

        Route::get('item', [Admin\Logo\LogoType\ItemController::class, 'index'])->name('item.index');
        Route::get('item/create', [Admin\Logo\LogoType\ItemController::class, 'create'])->name('item.create');
        Route::get('item/download/{hash}', [Admin\Logo\LogoType\ItemController::class, 'download'])->name('item.download');
        Route::post('item/getFontName', [Admin\Logo\LogoType\ItemController::class, 'getFontName'])->name('item.getFontName');
        Route::post('item/create', [Admin\Logo\LogoType\ItemController::class, 'store'])->name('item.store');
        Route::get('item/show/{id}', [Admin\Logo\LogoType\ItemController::class, 'show'])->name('item.show');
        Route::get('item/edit/{id}', [Admin\Logo\LogoType\ItemController::class, 'edit'])->name('item.edit');
        Route::post('item/update/{id}', [Admin\Logo\LogoType\ItemController::class, 'update'])->name('item.update');
        Route::delete('item/delete/{id}', [Admin\Logo\LogoType\ItemController::class, 'delete'])->name('item.delete');
        Route::put('item/switch/{logoType}', [Admin\Logo\LogoType\ItemController::class, 'switch'])->name('item.switch');
        Route::get('item/sort', [Admin\Logo\LogoType\ItemController::class, 'getSort'])->name('item.sort');
        Route::post('item/sort', [Admin\Logo\LogoType\ItemController::class, 'updateSort']);

        Route::get('group', [Admin\Logo\LogoType\GroupController::class, 'index'])->name('group.index');
        Route::post('group', [Admin\Logo\LogoType\GroupController::class, 'store'])->name('group.store');
        Route::delete('group/delete/{id}', [Admin\Logo\LogoType\GroupController::class, 'delete'])->name('group.delete');

        Route::get('font', [Admin\Logo\LogoType\FontController::class, 'index'])->name('font.index');
        Route::post('font', [Admin\Logo\LogoType\FontController::class, 'store'])->name('font.store');
        Route::delete('font/delete/{id}', [Admin\Logo\LogoType\FontController::class, 'delete'])->name('font.delete');


        Route::get('package', [Admin\Logo\LogoType\PackageController::class, 'index'])->name('package.index');
        Route::post('package', [Admin\Logo\LogoType\PackageController::class, 'store'])->name('package.store');
        Route::get('package/freeOffer', [Admin\Logo\LogoType\PackageController::class, 'freeOffer'])->name('package.freeOffer');
        Route::delete('package/delete/{id}', [Admin\Logo\LogoType\PackageController::class, 'delete'])->name('package.delete');
        Route::get('package/sort', [Admin\Logo\LogoType\PackageController::class, 'getSort'])->name('package.sort');
        Route::post('package/sort', [Admin\Logo\LogoType\PackageController::class, 'updateSort']);
    });

    Route::group(['prefix'=>'favicon', 'as'=>'favicon.'], function() {
        Route::get('front', [Admin\Favicon\FrontController::class,'index'])->name('front.index');
        Route::post('front', [Admin\Favicon\FrontController::class,'store'])->name('front.store');

        Route::get('category',[Admin\Favicon\FaviconCategoryController::class,'index'])->name('category.index');
        Route::post('category',[Admin\Favicon\FaviconCategoryController::class,'store'])->name('category.store');
        Route::delete('categories',[Admin\Favicon\FaviconCategoryController::class,'deleteAll'])->name('category.deleteAll');
        Route::get('category/sort',[Admin\Favicon\FaviconCategoryController::class,'getSort'])->name('category.getSort');
        Route::post('category/sort', [Admin\Favicon\FaviconCategoryController::class, 'updateSort']);


        Route::get('item', [Admin\Favicon\FaviconItemController::class, 'index'])->name('item.index');
        Route::get('item/create', [Admin\Favicon\FaviconItemController::class, 'create'])->name('item.create');
        Route::get('item/download/{hash}', [Admin\Favicon\FaviconItemController::class, 'download'])->name('item.download');
        Route::post('item/getFontName', [Admin\Favicon\FaviconItemController::class, 'getFontName'])->name('item.getFontName');
        Route::post('item/create', [Admin\Favicon\FaviconItemController::class, 'store'])->name('item.store');
        Route::get('item/show/{id}', [Admin\Favicon\FaviconItemController::class, 'show'])->name('item.show');
        Route::get('item/edit/{id}', [Admin\Favicon\FaviconItemController::class, 'edit'])->name('item.edit');
        Route::post('item/update/{id}', [Admin\Favicon\FaviconItemController::class, 'update'])->name('item.update');
        Route::delete('item/delete/{id}', [Admin\Favicon\FaviconItemController::class, 'delete'])->name('item.delete');
        Route::put('item/switch/{faviconItem}', [Admin\Favicon\FaviconItemController::class, 'switch'])->name('item.switch');
        Route::get('item/sort', [Admin\Favicon\FaviconItemController::class, 'getSort'])->name('item.sort');
        Route::post('item/sort', [Admin\Logo\LogoType\ItemController::class, 'updateSort']);

    });

    Route::group(['prefix'=>'palette-idea', 'as'=>'palette-idea.'], function() {
        Route::get('category', [Admin\Logo\Portfolio\CategoryController::class, 'index'])->name('category.index');
        Route::post('category', [Admin\Logo\Portfolio\CategoryController::class, 'store'])->name('category.store');
        Route::get('category/switch', [Admin\Logo\Portfolio\CategoryController::class, 'switch'])->name('category.switch');
        Route::get('category/sort', [Admin\Logo\Portfolio\CategoryController::class, 'getSort'])->name('category.sort');
        Route::post('category/sort', [Admin\Logo\Portfolio\CategoryController::class, 'updateSort']);

        Route::get('item', [Admin\Logo\Portfolio\ItemController::class, 'index'])->name('item.index');
        Route::get('item/create', [Admin\Logo\Portfolio\ItemController::class, 'create'])->name('item.create');
        Route::post('item/create', [Admin\Logo\Portfolio\ItemController::class, 'store'])->name('item.store');
        Route::get('item/edit/{id}', [Admin\Logo\Portfolio\ItemController::class, 'edit'])->name('item.edit');
        Route::post('item/edit/{id}', [Admin\Logo\Portfolio\ItemController::class, 'update'])->name('item.update');
        Route::get('item/switch', [Admin\Logo\Portfolio\ItemController::class, 'switch'])->name('item.switch');
    });

    Route::group(['prefix'=>'userLogo', 'as'=>'userLogo.'], function() {
        Route::get('', [Admin\Logo\UserLogoController::class, 'index'])->name('index');
        Route::get('progress', [Admin\Logo\UserLogoController::class, 'progress'])->name('progress');
        Route::get('preview/{hash}', [Admin\Logo\UserLogoController::class, 'preview'])->name('preview');
        Route::get('download/logoType/{hash}', [Admin\Logo\UserLogoController::class, 'downloadLogoType'])->name('download.logoType')
            ->middleware('throttle:download');
        Route::get('download/package/{hash}', [Admin\Logo\UserLogoController::class, 'downloadPackage'])->name('download.package')
            ->middleware('throttle:download');
        Route::delete('delete/{id}', [Admin\Logo\UserLogoController::class, 'delete'])->name('delete');
    });

});
