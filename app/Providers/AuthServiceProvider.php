<?php

namespace App\Providers;

use App\Models\Logo\UserLogo;
use App\Models\UserFavicon;
use App\Policies\UserFaviconPolicy;
use App\Policies\UserLogoPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        UserLogo::class => UserLogoPolicy::class,
        UserFavicon::class => UserFaviconPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}
