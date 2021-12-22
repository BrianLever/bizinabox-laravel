<header class="bz-front-component--header">
    <div class="navbar navbar-expand-md">
        <div class="container mx-w-1350px">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item"><a class="nav-link c-link {{Request::is('portfolio*') ? 'active': ''}}" href="{{route('portfolio.index')}}">Portfolio</a></li>
                    @isWhitelisted
                    <li class="nav-item"><a class="nav-link c-link {{Request::is('templates*') ? 'active': ''}}" href="{{route('template.index')}}">Templates</a></li>
                    <li class="nav-item"><a class="nav-link c-link {{Request::is('package*') ? 'active': ''}}" href="{{route('package.index')}}">Package</a></li>
                    <li class="nav-item"><a class="nav-link c-link {{Request::is('readymade*') ? 'active': ''}}" href="{{route('readymade.index')}}">Ready Made BIZ</a></li>
                    <li class="nav-item has-sub">
                        <span class="submenu-button"></span>
                        <a class="nav-link c-link {{Request::is('module*') ? 'active': ''}}" href="{{route('module.index')}}">Modules</a>
                        <ul>
                            <li><a href="{{route('service.index')}}" class="{{Request::is('services*') ? 'active': ''}}">Services</a></li>
                            <li><a href="{{route('plugin.index')}}" class="{{Request::is('plugins*') ? 'active': ''}}">Plugins</a></li>
                            <li><a href="{{route('lacarte.index')}}" class="{{Request::is('lacarte*') ? 'active': ''}}">A La Carte</a></li>
                        </ul>
                    </li>
                    @endisWhitelisted
                    <li class="nav-item"><a class="nav-link c-link {{Request::is('blog*') ? 'active': ''}}" href="{{route('blog.index')}}">Blog</a></li>
                    <li class="nav-item"><a class="nav-link c-link {{Request::is('directory*') ? 'active': ''}}" href="{{route('directory.index')}}">Directory</a></li>
                    <li class="nav-item"><a class="nav-link c-link {{Request::is('logo*') ? 'active': ''}}" href="{{route('logotypes.index')}}">Logo</a></li>
                    <li class="nav-item"><a class="nav-link c-link {{Request::is('favicon*') ? 'active': ''}}" href="{{route('favicon.index')}}">Favicon</a></li>
                </ul>
                <ul class="user-cart-item ml-auto">
                    <li class="nav-item d-flex align-items-center pl-2">
                        <a href="{{route('cart.index')}}" class="position-relative hover-none nav-link">
                            <i class="fa fa-shopping-cart"></i>
                            @if(session()->has("cart"))
                                <span class="cart_badge_btn">{{session("cart")->totalQty?? 0}}</span>
                            @endif
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <nav class="navbar">
        <div class="w-100 py-2 mx-auto mx-w-1350px d-flex justify-content-between align-items-center">
            <a class="navbar-brand" href="{{ url('/') }}">
                <img src="{{asset('assets/img/logo.png')}}" alt="" class="nav_logo_img">
            </a>
            <ul class="user-cart-item ml-auto">
                @guest
                    <li class="nav-item">
                        <a class="nav-link account_btn" href="{{ route('ssoLogin') }}">
                            Log In
                        </a>
                    </li>
                    <li class="nav-item d-none d-md-block">
                        <a class="nav-link account_btn" href="{{ route('ssoRegister') }}">
                            SignUp
                        </a>
                    </li>
                @else
                    <li class="nav-item">
                        <a class="nav-link account_btn" href="{{route('dashboard')}}">
                            My Account
                        </a>
                    </li>
                @endguest
                <li class="nav-item d-block d-md-none">
                    <div class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</header>

@push('script')
    <script>
        $('.submenu-button').click(function (){
            $(this).parent().toggleClass('active');
        })
    </script>
@endpush
