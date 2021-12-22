@extends('layouts.previewApp')

@section('style')
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/section.css')}}">
@endsection

@section('content')
    <div class="out_content overflow-hidden min-vh-100">
        <div id="app" class="bz-page">
            <template-view></template-view>
        </div>
    </div>
@endsection

@section('script')
    <script>
        window.template = {!! $template !!};
    </script>
    <script src="{{asset('assets/js/section.js')}}" type="text/javascript"></script>
@endsection
