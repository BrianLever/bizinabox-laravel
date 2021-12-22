@extends('layouts.adminApp')

@section('title', 'Favicon Items')
@section('style')
@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <x-layout.breadcrumb :menus="['Logo Types', 'Items']"/>
    </div>
    <div class="col-md-6 text-right">
        <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm m-btn--custom btn-outline-info sortBtn mb-2">Recommend Sort Order</a>
        <a href="{{route('admin.favicon.item.create')}}" class="ml-auto btn m-btn--sm m-btn--custom m-btn--square btn-outline-success mb-2">Import New Favicon</a>
    </div>
@endsection

@section('content')

    <div class="tabs-wrapper">
        <div class="clearfix"></div>
        <ul class="tab-nav">
            <li class="tab-item"><a class="tab-link tab-active" data-area="#all" href="#/all"> All (<span class="all_count">0</span>)</a></li>
            <li class="tab-item"><a class="tab-link" data-area="#active" href="#/active"> Active (<span class="active_count">0</span>)</a></li>
            <li class="tab-item"><a class="tab-link" data-area="#inactive" href="#/inactive"> InActive (<span class="inactive_count">0</span>)</a></li>
        </ul>
    </div>

    <div class="m-portlet m-portlet--mobile tab_area area-active md-pt-50" id="all_area">
        <div class="m-portlet__body">
            @include('components.admin.logo.logoTypeItem', ['selector'=>'datatable-all'])
        </div>
    </div>
    <div class="m-portlet m-portlet--mobile tab_area md-pt-50" id="active_area">
        <div class="m-portlet__body">
            @include('components.admin.logo.logoTypeItem', ['selector'=>'datatable-active'])
        </div>
    </div>
    <div class="m-portlet m-portlet--mobile tab_area md-pt-50" id="inactive_area">
        <div class="m-portlet__body">
            @include('components.admin.logo.logoTypeItem', ['selector'=>'datatable-inactive'])
        </div>
    </div>

    <x-admin.logo.sortModal />
@endsection
@section('script')
    <script src="{{asset('assets/vendors/jquery/jquery-ui.min.js')}}"></script>
    <script src="{{asset('assets/js/admin/favicon/item.js')}}?v={{time()}}"></script>
@endsection
