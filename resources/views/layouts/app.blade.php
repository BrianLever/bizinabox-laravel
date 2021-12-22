<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>@yield('title', $seo['title']) | Bizinabox</title>
    <link rel="icon" href="{{asset('assets/img/favicon.ico')}}" />

    <meta name="keywords" content="{{$seo['keywords']}}" />
    <meta name="description" content="{{$seo['description']}}">
    <meta name="og:image" content="{{$seo['image']}}"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}"/>

    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>

    <link rel="stylesheet" href="{{asset('assets/css/style.css')}}" />

    {!!$seo['head_code']!!}

    @yield('seo')

    @yield('style')

    @stack('style')

</head>
<body>
<div class="main-wrapper">
    <x-front.header></x-front.header>

    @yield('content')

    <x-front.feature></x-front.feature>

    <x-front.footer></x-front.footer>

    <a href="#" class="scroll-to-top"><i class="fas fa-angle-up" aria-hidden="true"></i></a>
</div>

<script src="{{asset('assets/js/script.js')}}"></script>

<x-global.toast></x-global.toast>

<script>
    var token = $('meta[name="csrf-token"]').attr('content');
</script>

@yield('script')

@stack('script')

{!!$seo['bottom_code']!!}

@isWhitelisted
<x-front.livechat></x-front.livechat>
@endisWhitelisted
</body>

</html>
