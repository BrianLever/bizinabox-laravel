@extends('layouts.adminApp')

@section('title', 'Palette Ideas Items')
@section('style')
@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <x-layout.breadcrumb :menus="['Palette Ideas', 'Items']"/>
    </div>
    <div class="col-md-6 text-right">
        <a href="{{route('admin.palette-idea.item.create')}}" class="ml-auto btn m-btn--square btn-outline-success mb-2">Create</a>
    </div>
@endsection

@section('content')
    <div class="tab_btn_area text-center">
        <div class="show_checked d-none">
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-success switchBtn" data-action="active">Active</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-primary switchBtn " data-action="inactive">Inactive</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-success switchBtn" data-action="featured">Featured</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-primary switchBtn " data-action="unfeatured">Unfeatured</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-success switchBtn " data-action="new">New</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-primary switchBtn " data-action="undonew">Undo New</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-danger switchBtn " data-action="delete">Delete</a>
        </div>
    </div>
    <div class="tabs-wrapper">
        <div class="clearfix"></div>
        <ul class="tab-nav">
            <li class="tab-item"><a class="tab-link tab-active" data-area="#all" href="#/all"> All Palette Ideas (<span class="all_count">0</span>)</a></li>
            <li class="tab-item"><a class="tab-link" data-area="#active" href="#/active"> Active Palette Ideas (<span class="active_count">0</span>)</a></li>
            <li class="tab-item"><a class="tab-link" data-area="#inactive" href="#/inactive"> InActive Palette Ideas (<span class="inactive_count">0</span>)</a></li>
        </ul>
    </div>
    <div class="m-portlet m-portlet--mobile tab_area area-active md-pt-50" id="all_area">
        <div class="m-portlet__body">
            <div class="text-center"><i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></div>
        </div>
    </div>
    <div class="m-portlet m-portlet--mobile tab_area md-pt-50" id="active_area">
        <div class="m-portlet__body">
            <div class="text-center"><i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></div>
        </div>
    </div>
    <div class="m-portlet m-portlet--mobile tab_area md-pt-50" id="inactive_area">
        <div class="m-portlet__body">
            <div class="text-center"><i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></div>
        </div>
    </div>
@endsection
@section('script')
    <script src="{{asset('assets/js/admin/logo/portfolio/item.js')}}"></script>
@endsection
