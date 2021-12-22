@extends('layouts.logoApp')

@section('meta')
    @include("components.front.seo", $seo)
@endsection
@section('title', $seo['title']?? '')
@section('content')
    <div class="container-fluid">
        <div class="row">
            <header-page :live-view="1"></header-page>
        </div>
        <choose-logo ></choose-logo>
        <div class="row">
            <footer-page></footer-page>
        </div>
    </div>
@endsection
@section('hidden', $seo['hidden']?? '')
@section('scripts')
    <script type="text/javascript">
        window.editorType = 'logotypes';
        window.user = @json(auth()->user());
        window.user.roles = @json(auth()->user()->roles)
    </script>
@endsection
