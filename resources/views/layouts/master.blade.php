<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>@yield('title') | Bizinabox</title>

    <link rel="icon" href="{{asset('assets/img/favicon.ico')}}" />

    <meta name="description" content="Latest updates and statistic charts">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="{{asset('assets/css/all.css')}}" rel="stylesheet"/>

    @yield('style')

</head>

<body id="masterBody" class="m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default m-aside-left--fixed">

<div class="m-grid m-grid--hor m-grid--root m-page">
    <x-account.header></x-account.header>

    <div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">

        @if(user()->hasRole('admin')&&Request::is('admin*'))
            <x-admin.sidebar></x-admin.sidebar>

        @elseif(user()->hasRole('employee')&&Request::is('employee*'))
            <x-employee.sidebar></x-employee.sidebar>
        @elseif(user()->hasRole('client')&&Request::is('client*'))
            <x-client.sidebar></x-client.sidebar>
        @elseif(Auth::check()&&Request::is('account*'))
            <x-user.sidebar></x-user.sidebar>
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

<x-account.right_sidebar></x-account.right_sidebar>

<div id="m_scroll_top" class="m-scroll-top">
    <i class="la la-arrow-up"></i>
</div>

<script src="{{asset('assets/js/all.js').'?=asdfasdf'}}"></script>
<script src="{{asset('assets/vendors/tinymce/tinymce.min.js')}}"></script>

@if(request()->getHost()=='bizinabox.com')
<script src="https://cdn.lr-ingest.io/LogRocket.min.js" crossorigin="anonymous"></script>
<script>
    window.LogRocket && window.LogRocket.init('bizinabox/bizinaboxcom');
    LogRocket.identify('{{user()->id}}', {
        name: '{{user()->name}}',
        email: '{{user()->email}}',

        // Add your own custom user variables here, ie:
        subscriptionType: 'pro'
    });
</script>
@endif
<script>
    var token = $('meta[name="csrf-token"]').attr('content');
</script>

<x-global.toast></x-global.toast>

@if(user()->hasRole('admin')&&Request::is('admin*'))
    <script src="{{asset('assets/js/admin/sidebar.js')}}"></script>
@else
    <script src="{{asset('assets/js/user/sidebar.js')}}"></script>
@endif

@yield('script')

@include("components.account.titleEditForm")

<script>
    $('#title_edit_modal').on('shown.bs.modal', function() {
        $(document).off('focusin.modal');
    });
</script>
</body>

</html>
