@php
$isGetStarted = user()->isGettingStarted();
$websitePackageCount = user()->websitePackages->count();
$websiteCount = user()->websites->count();
$blogPackageCount = user()->blogPackages->count();
$blogAdsListingCount = user()->blogAdsListings->count();
$orderCount = user()->orders->count();

$userMenu = [
        ['title'=>'Getting Started', 'route'=>'user.getting.started', 'url'=>'account/getting-started*', 'img'=>asset('assets/img/dashboard.svg'), 'disabled'=>!$isGetStarted],
        ['title'=>'TODO List', 'route'=>'user.todo.index', 'url'=>'account/todo', 'hasCount'=>true, 'icon'=>'flaticon-list-3'],
        ['title'=>'Dashboard', 'route'=>'user.dashboard', 'url'=>'account/dashboard','svg'=>'dashboard'],
        ['title'=>'Announcement', 'route'=>'user.appointment.index', 'url'=>'account/appointment*', 'svg'=>'layer','disabled'=>$isGetStarted],
        ['title'=>'Bizinabox Blog', 'url'=>'admin/appointment*', 'hasSub'=> true, 'svg'=>'layer', 'disabled'=>$isGetStarted && !$blogPackageCount,
            'subMenu'=>[
                ['title'=>'View Blog', 'route'=>'user.blog.index', 'url'=>'account/blog*'],
            ]
        ],
        ['title'=>'Blog Advertise', 'route'=>'user.blogAds.index', 'url'=>'account/blogAds*', 'svg'=>'layer','disabled'=>$isGetStarted && !$blogAdsListingCount],
        ['title'=>'Domain', 'url'=>'account/domain*', 'hasSub'=> true, 'svg'=>'layer','disabled'=>$isGetStarted && !$websiteCount,
            'subMenu'=>[
                ['title'=>'New Domain', 'route'=>'user.domain.search', 'url'=>'account/domain/*'],
                ['title'=>'My Domains', 'route'=>'user.domainList.index', 'url'=>'account/domainList*'],
            ]
        ],
        ['title'=>'Favicon', 'route'=>'user.favicon.index', 'url'=>'account/favicon*', 'svg'=>'layer', 'disabled'=> $isGetStarted],
        ['title'=>'File Storage', 'route'=>'user.file.index', 'url'=>'account/file*', 'svg'=>'layer','disabled'=>$isGetStarted && !$websiteCount],
        ['title'=>'Free Business Listing', 'url'=>'account/directory*', 'hasSub'=> true, 'svg'=>'layer', 'disabled'=>$isGetStarted,
            'subMenu'=>[
                ['title'=>'My Free Listing', 'route'=>'user.directory.index', 'url'=>'account/directory'],
                ['title'=>'View Directory', 'route'=>'directory.index'],
            ]
        ],
        ['title'=>'Getting Started Website', 'route'=>'user.website.getting.started', 'url'=>'account/website/getting-started','svg'=>'layer','disabled'=>$isGetStarted && $websitePackageCount],
        ['title'=>'Logo Maker', 'url'=>['account/logotypes*','account/color-palettes*'], 'hasSub'=> true, 'svg'=>'layer',
            'subMenu'=>[
                ['title'=>'My Logos', 'route'=>'user.logotypes.index', 'url'=>'account/logotypes*'],
                ['title'=>'My Color Palettes', 'route'=>'user.color-palettes.index', 'url'=>'account/color-palettes*' ],
            ]
        ],
        ['title'=>'Newsletter', 'url'=>'account/newsletter*', 'hasSub'=> true, 'svg'=>'layer', 'disabled'=>true,
            'subMenu'=>[
                ['title'=>'Newsletter', 'route'=>'user.dashboard', 'url'=>''],
                ['title'=>'Subscriptions', 'route'=>'user.dashboard', 'url'=>'' ],
            ]
        ],
        ['title'=>'Notifications', 'route'=>'user.ticket.index', 'url'=>'account/ticket*', 'svg'=>'layer','disabled'=>true],
        ['title'=>'Portfolio', 'route'=>'user.portfolio.index', 'url'=>'account/portfolio*', 'svg'=>'layer','disabled'=>$isGetStarted],
        ['title'=>'Purchase Management', 'url'=>'account/purchase*', 'hasSub'=> true, 'svg'=>'layer', 'disabled'=>$isGetStarted && $orderCount,
            'subMenu'=>[
                ['title'=>'Orders', 'route'=>'user.purchase.order.index', 'url'=>'account/purchase/order*'],
                ['title'=>'Subscriptions', 'route'=>'user.purchase.subscription.index', 'url'=>'account/purchase/subscription*'],
                ['title'=>'Transactions', 'route'=>'user.purchase.transaction.index', 'url'=>'account/purchase/transaction*'],
                ['title'=>'Forms', 'route'=>'user.purchase.form.index', 'url'=>'account/purchase/form*'],
                ['title'=>'Products', 'route'=>'user.purchase.package.index', 'url'=>['account/purchase/package*', 'account/purchase/readymade*', 'account/purchase/blog*', 'account/purchase/lacarte*', 'account/purchase/plugin*', 'account/purchase/service*']],
            ]
        ],
        ['title'=>'Tickets', 'route'=>'user.ticket.index', 'url'=>'account/ticket*', 'svg'=>'layer','disabled'=>$isGetStarted],
        ['title'=>'Tutorials', 'route'=>'user.tutorial.index', 'url'=>'account/tutorial*', 'svg'=>'layer','disabled'=>$isGetStarted],
        ['title'=>'Websites', 'route'=>'user.website.index', 'url'=>'account/website*', 'notUrl'=>'account/website/getting-started','svg'=>'layer','disabled'=>$isGetStarted && $websiteCount],
        ['title'=>'Setting', 'route'=>'user.setting.index', 'url'=>'account/setting*', 'svg'=>'layer','disabled'=>$isGetStarted],
    ];

@endphp

<button class="m-aside-left-close  m-aside-left-close--skin-dark " id="m_aside_left_close_btn">
    <i class="la la-close"></i>
</button>
<div id="m_aside_left" class="m-grid__item	m-aside-left  m-aside-left--skin-light ">

    <div id="m_ver_menu" class="m-aside-menu  m-aside-menu--skin-light m-aside-menu--submenu-skin-light position-static" m-menu-vertical="1" m-menu-scrollable="1" m-menu-dropdown-timeout="500">
        <ul class="m-menu__nav ">
            @foreach($userMenu as $menu)
                @if(!($menu['disabled']??false))
                    <li class="m-menu__item {{ Request::is($menu['url']) && (($menu['notUrl']??false) ? !Request::is($menu['notUrl']) : true)? 'm-menu__item--active m-menu__item--open' : '' }} m-menu__item--submenu" aria-haspopup="true" m-menu-submenu-toggle="hover" m-menu-link-redirect="1">
                        <a href="{{($menu['route']??false)?route($menu['route']):'javascript:void(0);'}}" class="m-menu__link m-menu__toggle">
                            <span class="m-menu__item-here"></span>
                            @if($menu['svg']??false)
                                <i class="m-menu__link-icon">
                                    <img src="{{asset('assets/img/'.$menu['svg'].'.svg')}}" alt="dashboard">
                                </i>
                            @else
                                <i class="m-menu__link-icon {{$menu['icon']??'flaticon-layers'}}"></i>
                            @endif
                            <span class="m-menu__link-text">{{$menu['title']}}</span>
                            @if($menu['hasSub']??false)
                                <i class="m-menu__ver-arrow la la-angle-right"></i>
                            @endif
                            @if($menu['hasCount']??false)
                                <span class="m-badge m-badge--danger mr-1 sidebar_todo_count" style="display:none;"></span>
                            @endif
                        </a>
                        @if($menu['hasSub']??false)
                            <div class="m-menu__submenu ">
                                <span class="m-menu__arrow"></span>
                                <ul class="m-menu__subnav">
                                    @foreach($menu['subMenu'] as $subMenu)
                                        @if(!($subMenu['disabled']??false))
                                            <li class="m-menu__item {{ Request::is($subMenu['url'] ?? '') ? 'm-menu__item--active' : '' }}" aria-haspopup="true">
                                                <a href="{{($subMenu['route']??false)?route($subMenu['route'], ($subMenu['params']??[])):'javascript:void(0);'}}" class="m-menu__link ">
                                                    @if($subMenu['svg']??false)
                                                        <i class="m-menu__link-icon">
                                                            <img src="{{asset('assets/img/'.$subMenu['svg'].'.svg')}}" alt="dashboard">
                                                        </i>
                                                    @else
                                                        <i class="m-menu__link-bullet {{$subMenu['icon']??'m-menu__link-bullet--dot'}}"><span></span></i>
                                                    @endif
                                                    <span class="m-menu__link-text">{{$subMenu['title']}}</span>
                                                </a>
                                            </li>
                                        @endif
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                        @if($menu['divider']??false)
                            <hr />
                        @endif
                    </li>
                @endif
            @endforeach
            <li class="m-menu__item" aria-haspopup="true">
                <a href="javascript:void(0);" class="m-menu__link" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                    <i class="m-menu__link-icon fa fa-sign-out-alt"></i>
                    <span class="m-menu__link-text">Log out</span>
                </a>
            </li>
        </ul>
    </div>
    <!-- END: Aside Menu -->
</div>
<!-- END: Left Aside -->
