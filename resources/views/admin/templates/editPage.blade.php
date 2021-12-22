@extends('layouts.pageApp')

@section('title', 'Template Management')
@section('style')
    {!! $template->css !!}
    @if($template->header_id!==null)
        {!! $template->header->css !!}
    @endif
    @if($template->footer_id!==null)
        {!! $template->footer->css !!}
    @endif
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/section.css')}}">
    <script src="{{asset('assets/vendors/tinycolor/tinycolor.min.js')}}"></script>
    <script src="{{asset('assets/vendors/lc-mouse-drag/lc-mouse-drag.min.js')}}"></script>
@endsection
@section('breadcrumb')
@endsection

@section('content')
    <div id="app" class="bz-page bz-page-edit">
        <edit-page></edit-page>
    </div>
@endsection
@section('script')
    {!! $template->script !!}
    @if($template->header_id!==null)
        {!! $template->header->script !!}
    @endif
    @if($template->footer_id!==null)
        {!! $template->footer->script !!}
    @endif
@endsection
