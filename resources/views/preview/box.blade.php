@extends('layouts.previewApp')

@section('title', $page->name)

@section('style')
    <link href="{{asset('assets/vendors/contentbuilder/box/box.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/contentbuilder/assets/minimalist-blocks/content.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/contentbuilder/assets/scripts/simplelightbox/simplelightbox.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/contentbuilder/contentbuilder/contentbuilder.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/vendors/contentbuilder/contentbox/contentbox.css')}}" rel="stylesheet" type="text/css" />
    @if($page->mainCss!=null)
        {!! $page->mainCss??'' !!}
    @endif
    @if($page->sectionCss!=null)
        {!! $page->sectionCss??'' !!}
    @endif
    {!! $page->css??'' !!}
@endsection
@section('content')
    <div class="is-wrapper">
        @if($page->content!==null)
        {!! $page->content??'' !!}
        @else
            @include('components.global.defaultBox')
        @endif
    </div>
@endsection
@section('script')
    <script src="{{asset('assets/vendors/contentbuilder/contentbox/contentbox.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/vendors/contentbuilder/assets/minimalist-blocks/content.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/vendors/contentbuilder/box/box.js')}}" type="text/javascript"></script>
    <script src="{{asset('assets/vendors/tinycolor/tinycolor.min.js')}}"></script>
    {!! $page->script !!}
@endsection
