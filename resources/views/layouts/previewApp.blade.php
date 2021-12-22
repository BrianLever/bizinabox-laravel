<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>@yield('title') | Bizinabox</title>

    <link rel="icon" href="{{asset('assets/img/favicon.ico')}}" />

    <meta name="keywords" content="Bizinabox, Preview, Template, Business, Website" />
    <meta name="description" content="Bizinabox, Preview, Template, Business, Website">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <link rel="stylesheet" href="{{asset('assets/css/app.css')}}" />
    <link rel="stylesheet" href="{{asset('assets/css/fontawesome.min.css')}}" />

    {!! $template->css??'' !!}

    @if($template->header_id!==null)
        {!! $template->header->css??'' !!}
    @endif
    @if($template->footer_id!==null)
        {!! $template->footer->css??'' !!}
    @endif

    @yield('style')

    <link href="{{asset('assets/css/dev1/preview.css')}}" rel="stylesheet" type="text/css" />
</head>
<body>
    @if($template->header_id!==null)
        {!! $template->getHeader($preview) !!}
    @endif

    @yield('content')

    @if($template->footer_id!==null)
        {!! $template->getFooter($preview) !!}
    @endif

    <a href="#" class="scroll-to-top" style="display: inline;">
        &#8593;
    </a>

    @routes

    @include('components.global.toast')

    <script src="{{asset('assets/vendors/jquery/jquery.min.js')}}" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    @yield('script')

    {!! $template->script??'' !!}

    @if($template->header_id!==null)
        {!! $template->header->script??'' !!}
    @endif
    @if($template->footer_id!==null)
        {!! $template->footer->script??'' !!}
    @endif

    <script src="{{asset('assets/js/dev1/preview.js')}}" type="text/javascript"></script>

</body>

</html>
