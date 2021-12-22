<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * The path to the "home" route for your application.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //
        $this->configureRateLimiting();

        RateLimiter::for("download", function($request) {
            return Limit::perMinute(60);
        });

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {

        $this->mapApiRoutes();

        Route::group(['middleware'=>['web', 'HtmlMinifier']], function() {

            $this->mapWebRoutes();

            Route::group(['middleware'=>['fw-block-blacklisted']], function() {

                $this->mapAdminRoutes();

                $this->mapUserRoutes();

                $this->mapEmployeeRoutes();

                $this->mapClientRoutes();
            });
        });

        Route::group(['middleware'=>['fw-block-blacklisted']], function() {
            $this->ipnRoutes();
        });

    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    protected function mapAdminRoutes()
    {
        Route::middleware(['auth','role:admin'])
            ->namespace($this->namespace)
            ->group(base_path('routes/admin.php'));
    }

    protected function mapUserRoutes()
    {
        Route::namespace($this->namespace)
            ->group(base_path('routes/user.php'));
    }

    protected function mapEmployeeRoutes()
    {
        Route::middleware(['auth', 'verified', 'role:employee'])
            ->namespace($this->namespace)
            ->group(base_path('routes/employee.php'));
    }

    protected function mapClientRoutes()
    {
        Route::middleware(['auth', 'verified', 'role:client'])
            ->namespace($this->namespace)
            ->group(base_path('routes/client.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware(['api','cors'])
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }
    protected function ipnRoutes()
    {
        Route::namespace($this->namespace)
            ->group(base_path('routes/ipn.php'));
    }

    public function configureRateLimiting()
    {
        RateLimiter::for("download", function($request) {
            return Limit::perMinute(2);
        });
    }
}
