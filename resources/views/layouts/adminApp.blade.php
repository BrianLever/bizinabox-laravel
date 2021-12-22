<!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">

<head>
    <meta charset="utf-8" />
    <title>Bizinabox - @yield('title')</title>

    <link rel="icon" href="{{asset('assets/img/favicon.ico')}}" />

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    {!! $basic['back_head'] !!}

    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
    <link href="{{mix('assets/css/all.css')}}" rel="stylesheet"/>

    @yield('style')

</head>

<body id="masterBody" class="m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default m-aside-left--fixed">

<div class="m-grid m-grid--hor m-grid--root m-page">
    @include("components.account.header")

    <div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">

        @if(Request::is('admin*'))
            @include("components.admin.sidebar")
        @else
            @include("components.user.sidebar")
        @endif
        <div class="m-grid__item m-grid__item--fluid m-wrapper">

            <div class="m-subheader">
                <div class="row">
                    @yield('breadcrumb')
                </div>
            </div>

            <div class="m-content position-relative md-plr-10">
                @yield('content')
            </div>
        </div>
    </div>
</div>

<div id="m_scroll_top" class="m-scroll-top">
    <i class="la la-arrow-up"></i>
</div>

<script src="{{mix('assets/js/all.js')}}"></script>
<script src="{{asset('assets/vendors/tinymce/tinymce.min.js')}}"></script>

<script>
    var token = $('meta[name="csrf-token"]').attr('content');
</script>

<x-global.toast></x-global.toast>


@yield('script')

{!! $basic['back_bottom'] !!}

@include('cookieConsent::index')
</body>

</html>
