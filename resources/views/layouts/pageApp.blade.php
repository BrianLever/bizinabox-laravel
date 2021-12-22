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

    @yield('style')

    <link href="{{asset('assets/css/dev1/preview.css')}}" rel="stylesheet" type="text/css" />
</head>
<body>

@yield('content')

@yield('script')

@routes

<script>
    window.token = '{{ csrf_token() }}';
    window.appURL = '{{env("APP_URL")}}';
    window.imageHost = '{{env("STATIC_IMAGE_HOST")}}';
    window.appDomain = '{{env("APP_DOMAIN")}}';
    window.appEnv = '{{env("APP_ENV")}}';
</script>
<script src="{{asset('assets/js/page.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/js/dev1/preview.js')}}" type="text/javascript"></script>
</body>

</html>
