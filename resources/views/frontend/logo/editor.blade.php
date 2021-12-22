@extends('layouts.logoApp')

@section('title', 'Edit logo')
@section('content')
    <input type="hidden" id="user-logo-hash" value="{{ $logoHash }}">
    <div class="editor">
        <header-page user-logo="{{$userLogo}}"></header-page>
        <editor></editor>
        <footer-page></footer-page>
    </div>
@endsection

@section('styles')
    <link rel="stylesheet" href="{{ mix('assets/logo/editor/sass-editor.css') }}" type="text/css"/>
    <link rel="stylesheet" href="{{ mix('assets/logo/editor/custom-editor.css') }}" type="text/css"/>
    <link rel="stylesheet" href="{{$logoFontUrl}}?v={{config('app.version')}}" type="text/css"/>
@endsection

@section('scripts')
    <script type="text/javascript">
        window.editorType = 'logotypes';
        @auth
            window.user = @json(auth()->user());
            window.user.roles = @json(auth()->user()->roles);
        @endauth
        window.svgData = {!! json_encode([
            'hash' => optional($userLogo)->hash,
            'preview' => optional($userLogo)->preview,
            'version' => optional($userLogo)->version,
            'favicon' =>  optional($userLogo)->getFavicon(),
            'fontUrl'=>$logoFontUrl
        ]) !!} ;
    </script>

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Base64/1.1.0/base64.min.js"></script>
    <script type="text/javascript" src="{{ mix('assets/logo/js/jquery.js') }}"></script>
    <script type="text/javascript" src="{{ mix('assets/logo/js/editor/vue.js') }}"></script>
@endsection
