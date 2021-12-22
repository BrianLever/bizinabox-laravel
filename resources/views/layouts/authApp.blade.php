<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>@yield('title') | Bizinabox</title>

    <link rel="icon" href="{{asset('assets/img/favicon.ico')}}" />

    <meta name="keywords" content="HTML5 Template Crizal" />
    <meta name="description" content="Latest updates and statistic charts">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
    <link rel="stylesheet" href="{{asset('assets/css/style.css')}}" />

    @yield('style')
</head>
<body>
    <div id="app" class="auth_area">
        <div class="authApp">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="main_area">
                            @yield('content')
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{asset('assets/js/script.js')}}"></script>

    @include("components.global.toast")

    @yield('script')
</body>

</html>
