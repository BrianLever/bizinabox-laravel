<?php

use Illuminate\Support\Facades\Route;
use Spatie\Honeypot\ProtectAgainstSpam;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers as Root;
use App\Http\Controllers\Front as Front;
use App\Http\Controllers\User as User;

Route::domain('accounts.'.config('app.domain'))->group(function () {
    Auth::routes([
        'login'    => true,
        'logout'   => true,
        'register' => false,
        'reset'    => true,
        'confirm'  => true,
        'verify'   => true,
    ]);

    Route::get('register', 'Auth\CustomController@email')
        ->name('register');
    Route::post('register/email', 'Auth\CustomController@emailSubmit')
        ->name('register.email');

    Route::get('register/password', 'Auth\CustomController@password')->name('register.password');
    Route::post('register/password', 'Auth\CustomController@passwordSubmit');

    Route::get('/{any}', function (){
        return redirect('/login');
    })->where('any', '.*');
});

Route::get('ssoLogin', [Root\Auth\CustomController::class,'ssoLogin'])->name('ssoLogin');
Route::get('ssoRegister', [Root\Auth\CustomController::class,'ssoRegister'])->name('ssoRegister');
Route::post('ssoLogout', [Root\Auth\CustomController::class,'ssoLogout'])->name('ssoLogout');

Route::domain(config('app.domain'))->group(function () {


    Route::get('/videos', [Root\HomeController::class, 'videos'])->name('videos');

    Route::group(['namespace'=>'Front'], function() {

        Route::get('/hacker/{slug}', 'HomeController@hacker')->name('hacker');

        Route::get('/', 'HomeController@index')->name('home');

        Route::post('/subscribe', 'HomeController@subscribe')->name('subscribe')->middleware(ProtectAgainstSpam::class);
        Route::get('/subscribe/{token}', 'HomeController@subscribeConfirm')->name('subscribe.confirm');
        Route::get('/unsubscribe', 'HomeController@unsubscribe')->name('unsubscribe');
        Route::post('/unsubscribe', 'HomeController@unsubscribeConfirm')->name('unsubscribe.confirm')->middleware(ProtectAgainstSpam::class);
        Route::get('/getImage/{path}', 'HomeController@getImage')->name('getImage')->where('path', '(.*)');
        Route::get('/legal/{slug}', 'HomeController@legal')->name('legal');

        Route::get('/faq', 'FaqController@index')->name('faq.index');
        Route::get('/contact', 'FaqController@contact')->name('contact');
        Route::get('/mail/{id}', 'HomeController@mail')->name('mail.view');

        Route::get('/templates', 'TemplateController@index')->name('template.index');
        Route::get('/templates/{slug}', [Front\TemplateController::class,'detail'])->name('template.detail');
        Route::get('/preview/{slug}/{url?}', [Front\TemplateController::class,'preview'])->name('template.preview');
        Route::get('/start/{slug}', 'TemplateController@start')->name('template.start');

        Route::get('/services', 'ServiceController@index')->name('service.index');
        Route::get('/services/{slug}', 'ServiceController@detail')->name('service.detail');
        Route::get('/services/{id}/addtocart', 'ServiceController@addtoCart')->name('service.addtoCart');

        Route::get('/plugins', 'PluginController@index')->name('plugin.index');
        Route::get('/plugins/{slug}', 'PluginController@detail')->name('plugin.detail');
        Route::get('/plugins/{id}/addtocart', 'PluginController@addtoCart')->name('plugin.addtoCart');

        Route::get('/lacarte', 'LacarteController@index')->name('lacarte.index');
        Route::get('/lacarte/{slug}', 'LacarteController@detail')->name('lacarte.detail');
        Route::get('/lacarte/{id}/addtocart', 'LacarteController@addtoCart')->name('lacarte.addtoCart');

        Route::get('/modules', 'ModuleController@index')->name('module.index');
        Route::get('/modules/{slug}', 'ModuleController@detail')->name('module.detail');
        Route::get('/modules/{id}/addtocart', 'ModuleController@addtoCart')->name('module.addtoCart');

        Route::get('/package', [Front\PackageController::class,'index'])->name('package.index');
        Route::get('/package/{slug}', [Front\PackageController::class,'detail'])->name('package.detail');
        Route::get('/package/{id}/addtocart', [Front\PackageController::class,'addtoCart'])->name('package.addtoCart');

        Route::get('/readymade', [Front\ReadyMadeController::class,'index'])->name('readymade.index');
        Route::get('/readymade/{slug}', [Front\ReadyMadeController::class,'detail'])->name('readymade.detail');
        Route::get('/readymade/{id}/addtocart', [Front\ReadyMadeController::class,'addtoCart'])->name('readymade.addtoCart');

        Route::group(['prefix'=>'cart','as'=>'cart.'], function (){
            Route::get('/', [Front\CartController::class,'index'])->name('index');
            Route::get('/remove', [Front\CartController::class,'remove'])->name('remove');
            Route::get('/coupon', [Front\CartController::class,'coupon'])->name('coupon');
            Route::get('/empty', [Front\CartController::class,'empty'])->name('empty');
            Route::post('/update', [Front\CartController::class,'update'])->name('update');
            Route::get('/checkout', [Front\PaymentController::class,'checkout'])->name('checkout');
            Route::get('/login', 'PaymentController@login')->name('login');
            Route::post('/checkEmail', 'CartController@checkEmail')->name('checkEmail')
                ->middleware(ProtectAgainstSpam::class);
            Route::post('/paypal/getUrl', 'PaymentController@paypalGetUrl')->name('paypal.getUrl')
                ->middleware(ProtectAgainstSpam::class);
            Route::get('/paypal/execute', 'PaymentController@paypalExecute')->name('paypal.execute');
            Route::post('/stripe/execute', 'PaymentController@stripeExecute')->name('stripe.execute')
                ->middleware(ProtectAgainstSpam::class);
        });

        Route::get('/slider/{id}', 'SliderController@detail')->name('slider.detail');
        Route::get('/slider/addtocart/{id}', 'SliderController@addtocart')->name('slider.addtocart');

        Route::get('/livechat', 'LiveChatController@index')->name('livechat.index');
        Route::get('/livechat/end', 'LiveChatController@end')->name('livechat.end');
        Route::post('/livechat/getSession', 'LiveChatController@getSession')->name('livechat.getSession');
        Route::post('/livechat/createSession', 'LiveChatController@createSession')->name('livechat.createSession')
            ->middleware(ProtectAgainstSpam::class);
        Route::post('/livechat/sendMessage', 'LiveChatController@sendMessage')->name('livechat.sendMessage');
        Route::post('/livechat/getService', 'LiveChatController@getService')->name('livechat.getService');
        Route::post('/livechat/sessionClear', 'LiveChatController@sessionClear')->name('livechat.sessionClear');

        Route::post('/livechat/submitService', 'LiveChatController@submitService')->name('livechat.submitService')
            ->middleware(ProtectAgainstSpam::class);

        Route::group(['prefix'=>'blogAds','as'=>'blogAds.'], function (){
            Route::get('/', [Front\BlogAdsController::class,'index'])->name('index');
            Route::post('/addToCart/{id}', [Front\BlogAdsController::class,'addToCart'])->name('addtocart');
            Route::get('/spot/{slug}', [Front\BlogAdsController::class,'spot'])->name('spot');
            Route::post('/impClick', [Front\BlogAdsController::class,'impClick'])->name('impClick');
            Route::post('/getData', [Front\BlogAdsController::class,'getData'])->name('getData');
        });

        Route::group(['prefix'=>'blog','as'=>'blog.'], function (){
            Route::get('', [Front\BlogController::class,'index'])->name('index');
            Route::get('/packages', [Front\BlogController::class,'package'])->name('package');
            Route::get('/packages/{slug}', [Front\BlogController::class,'packageDetail'])->name('package.detail');
            Route::get('/packages/{id}/addToCart', [Front\BlogController::class,'addToCart'])->name('addtocart');
            Route::get('/ajaxPage', 'BlogController@ajaxPage')->name('ajaxPage');
            Route::get('/ajaxCategory/{id}', 'BlogController@ajaxCategory')->name('ajaxCategory');
            Route::get('/ajaxTag/{id}', 'BlogController@ajaxTag')->name('ajaxTag');
            Route::get('/ajaxAuthor/{username}', 'BlogController@ajaxAuthor')->name('ajaxAuthor');
            Route::get('/ajaxComment/{slug}', 'BlogController@ajaxComment')->name('ajaxComment');
            Route::get('/detail/{slug}', 'BlogController@detail')->name('detail');
            Route::get('/tag/{slug}', 'BlogController@tag')->name('tag');
            Route::get('/category/{slug}', 'BlogController@category')->name('category');
            Route::get('/all-posts', 'BlogController@allPosts')->name('allPosts');
            Route::get('/search', 'BlogController@search')->name('search');
            Route::get('/getCommentForm/{id}', 'BlogController@getCommentForm')->name('getCommentForm');
            Route::get('/author/{username}', [Front\BlogController::class,'author'])->name('author');
            Route::get('/favoriteComment/add', 'BlogController@favoriteComment')->name('favoriteComment');
        });

        Route::get('/portfolio', 'PortfolioController@index')->name('portfolio.index');
        Route::get('/portfolio/categories', 'PortfolioController@categories')->name('portfolio.categories');
        Route::get('/portfolio/category/{slug}', 'PortfolioController@category')->name('portfolio.category');
        Route::get('/portfolio/{slug}', 'PortfolioController@detail')->name('portfolio.detail');

        Route::get('/review', [Front\ReviewController::class,'index'])->name('review.index');
        Route::middleware(ProtectAgainstSpam::class)->group(function() {
            Route::post('/review', [Front\ReviewController::class,'store'])->name('review.store');
            Route::post('/blog/postComment/{id}', 'BlogController@postComment')->name('blog.postComment');
        });

        Route::group(['as'=>'directory.', 'prefix'=>'directory'], function() {
            Route::get('/', [Front\DirectoryController::class,'index'])->name('index');
            Route::get('/categories', [Front\DirectoryController::class,'categories'])->name('categories');
            Route::get('/category/{slug}', [Front\DirectoryController::class,'category'])->name('category');
            Route::get('/category/{category}/{subCategory}', [Front\DirectoryController::class,'subCategory'])->name('subCategory');
            Route::get('/tag/{slug}', [Front\DirectoryController::class,'tag'])->name('tag');
            Route::get('/detail/{slug}', [Front\DirectoryController::class,'detail'])->name('detail');
            Route::get('/packages', [Front\DirectoryController::class,'package'])->name('package');
            Route::get('/packages/{slug}', [Front\DirectoryController::class,'packageDetail'])->name('package.detail');
            Route::get('/packages/{id}/addtocart', [Front\DirectoryController::class,'addtocart'])->name('package.addtocart');
        });
    });

    Route::get('/caddy/allowed-domain', 'CaddyResponseController@index')
        ->name('caddy.response')
        ->middleware('fw-block-blacklisted');


    Route::get('auth/{provider}', 'Auth\SocialController@redirectToProvider')->name('social.login');
    Route::get('auth/{provider}/callback', 'Auth\SocialController@handleProviderCallback')->name('social.redirect');

    Route::get('/home', 'HomeController@index')->name('dashboard');
    Route::get('/check-file-existence', 'HomeController@checkFileExistence')->name('check-file-existence');

    Route::group(['middleware'=>['auth','verified']], function(){
        Route::get('/{role}/profile', 'HomeController@profile')->name('profile');
        Route::post('/account/profileUpdate', 'HomeController@profileUpdate')->name('account.profile.update');
        Route::post('/account/passwordUpdate', 'HomeController@passwordUpdate')->name('account.password.update');
    });

    Route::group(['middleware'=>['auth','verified','passwordCheck']], function(){
        Route::get('/{role}/subscribed', 'HomeController@subscribed')->name('subscribed');
        Route::post('/{role}/subscribed', 'HomeController@subscribedUpdate')->name('subscribed.update')->middleware(ProtectAgainstSpam::class);
        Route::get('/{role}/subscribed/switch', 'HomeController@subscribedSwitch')->name('subscribed.switch');
        Route::get('/{role}/notifications', 'HomeController@notifications')->name('notification');
        Route::get('/{role}/notifications/{id}/detail', 'HomeController@notificationDetail')->name('notification.detail');
        Route::get('/{role}/notifications/switch', 'HomeController@notificationSwitch')->name('notification.switch');

        Route::post('/uploadImage/{folder?}', 'HomeController@uploadImage')->name('uploadImage');
        Route::post('/uploadImages/{id}', 'HomeController@uploadImages')->name('uploadImages');

    });


// Fonts routing
    Route::get('fonts/get', [Root\FontController::class, 'getFonts'])->name('fonts.get');

// Logotypes routing
    Route::group(['prefix'=>'logotypes','as'=>'logotypes.'], function (){

        Route::get('/', [Front\LogoController::class,'index'])->name('index');
        Route::get('categories', [Front\LogoController::class,'categories'])->name('categories');
        Route::get('category/{id}', [Front\LogoController::class,'category'])->name('category');

        Route::get('choose', [User\LogoController::class, 'showChooseLogo'])->name('show.choose');
        Route::get('getCategories', [User\LogoController::class, 'getCategories'])->name('show.getCategory');
        Route::get('choose/{logotype}', [User\LogoController::class, 'chooseLogo'])->name('choose');
        Route::get('/edit/{logoHash}/send-editor-link',[User\LogoController::class, 'sendEditorLink'])->name('send-editor-link');
        Route::get('/edit/{logoHash}', [User\LogoController::class, 'editLogo'])->name('edit');

        Route::group(['middleware' => ['auth', 'verified']], function () {

            // Logo purchase routes
            Route::get('purchase/callback/package', [Root\LogoPurchaseController::class, 'purchasePackageCallback'])->name('purchase.callback.package');
            Route::get('purchase/callback/logotype', [Root\LogoPurchaseController::class, 'purchaseLogotypeCallback'])->name('purchase.callback.logotype');

            Route::get('download/{logoHash}/logotype/logotype', [Root\LogoPurchaseController::class, 'downloadLogo'])->name('download.logotype')->middleware('throttle:download');
            Route::get('download/{logoHash}/package', [\App\Http\Controllers\LogoPurchaseController::class, 'downloadPackage'])->name('download.package')->middleware('throttle:download');
        });

        Route::get('download/{logoHash}/logotype/preview', [Root\User\LogoController::class, 'getLogoPreview'])->name('download.logotype.preview')->middleware('throttle:download');

        Route::get('choose', [Root\LogoController::class, 'showChooseLogo'])->name('show.choose');
        Route::get('getCategories', [Root\LogoController::class, 'getCategories'])->name('show.getCategory');

        Route::get('choose/{logotype}', [Root\LogoController::class, 'chooseLogo'])->name('choose');
        Route::get('/edit/{logoHash}/send-editor-link',[Root\LogoController::class, 'sendEditorLink'])->name('send-editor-link');
        Route::get('/edit/{logoHash}', [Root\LogoController::class, 'editLogo'])->name('edit');

        Route::group(['middleware' => ['auth', 'verified']], function () {
            Route::get('download/{logoHash}/logotype/logotype', [Root\LogoController::class, 'downloadLogo'])->name('download')->middleware('throttle:download');
            Route::get('download/{logoHash}/package', [Root\LogoController::class, 'downloadPackage'])->name('download.package')->middleware('throttle:download');
        });

        Route::get('download/{logoHash}/logotype/preview', [Root\LogoController::class, 'getLogoPreview'])->name('download.preview')->middleware('throttle:download');


        Route::post('previews/list/get', [Root\LogoController::class, 'getLogoPreviews'])->name('previews.list.get');
        Route::get('{logoHash}/get', [Root\LogoController::class, 'getLogo'])->name('get');
        Route::get('getPresetCategory', [Root\LogoController::class, 'getPresetCategory'])->name('getPresetCategory');
        Route::get('getPresetItem/{category_id}', [Root\LogoController::class, 'getPresetItem'])->name('getPresetItem');
        Route::get('getTutorial/{id}', [Root\LogoController::class, 'getTutorial'])->name('getTutorial');
        Route::post('save/{logoHash}', [Root\LogoController::class, 'saveLogo'])->name('save');
        Route::post('saveFinal/{logoHash}', [Root\LogoController::class, 'saveLogoFinal'])->name('saveFinal');
        Route::get('saveUserLogo/{logoHash}', [Root\LogoController::class, 'saveUserLogo'])->name('saveUserLogo')->middleware(["auth", "verified"]);
    });

// Favicon Routes
    Route::group(['prefix'=>'favicon','as'=>'favicon.'], function (){
        Route::get('/', [Front\FaviconController::class,'index'])->name('index');
        Route::get('categories', [Front\FaviconController::class,'categories'])->name('categories');
        Route::get('category/{id}', [Front\FaviconController::class,'category'])->name('category');


        Route::get('choose', [Root\FaviconController::class, 'showChooseFavicon'])->name('show.choose');
        Route::get('getCategories', [Root\FaviconController::class, 'getCategories'])->name('show.getCategory');

        Route::get('choose/{faviconItem}', [Root\FaviconController::class, 'chooseFavicon'])->name('choose');
        Route::get('/edit/{faviconHash}/send-editor-link',[Root\FaviconController::class, 'sendEditorLink'])->name('send-editor-link');
        Route::get('/edit/{faviconHash}', [Root\FaviconController::class, 'editFavicon'])->name('edit');

        Route::group(['middleware' => ['auth', 'verified']], function () {
            Route::get('download/{faviconHash}', [Root\FaviconController::class, 'downloadFavicon'])->name('download')->middleware('throttle:download');
            Route::get('download/{faviconHash}/package', [Root\FaviconController::class, 'downloadPackage'])->name('download.package')->middleware('throttle:download');
        });

        Route::get('download/{faviconHash}/favicon/preview', [Root\FaviconController::class, 'getFaviconPreview'])->name('download.preview')->middleware('throttle:download');

        Route::post('previews/list/get', [Root\FaviconController::class, 'getFaviconPreviews'])->name('previews.list.get');
        Route::get('{faviconHash}/get', [Root\FaviconController::class, 'getFavicon'])->name('get');
        Route::get('getPresetCategory', [Root\FaviconController::class, 'getPresetCategory'])->name('getPresetCategory');
        Route::get('getPresetItem/{category_id}', [Root\FaviconController::class, 'getPresetItem'])->name('getPresetItem');
        Route::get('getTutorial/{id}', [Root\FaviconController::class, 'getTutorial'])->name('getTutorial');
        Route::post('{faviconHash}/save', [Root\FaviconController::class, 'saveFavicon'])->name('save');
        Route::post('{faviconHash}/saveLogo', [Root\FaviconController::class, 'saveFinal'])->name('saveFinal');
        Route::get('{faviconHash}/saveUserLogo', [Root\FaviconController::class, 'saveUserLogo'])->name('saveUserLogo')->middleware(["auth", "verified"]);
    });
});
