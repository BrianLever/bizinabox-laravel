@extends('layouts.master')

@section('title', 'Websites')
@section('style')

@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <ul class="m-subheader__breadcrumbs m-nav m-nav--inline">
            <li class="m-nav__item m-nav__item--home">
                <a href="" class="m-nav__link m-nav__link--icon">
                    <i class="m-nav__link-icon la la-home"></i>
                </a>
            </li>
            <li class="m-nav__separator">/</li>
            <li class="m-nav__item">
                <a href="" class="m-nav__link">
                    <span class="m-nav__link-text">Websites</span>
                </a>
            </li>
            <li class="m-nav__separator">/</li>
            <li class="m-nav__item">
                <a href="" class="m-nav__link">
                    <span class="m-nav__link-text">List</span>
                </a>
            </li>
        </ul>
    </div>
    <div class="col-md-6 text-right">
        <a href="{{route('admin.website.list.create')}}" class="ml-auto btn m-btn--square m-btn--sm btn-outline-info mb-2">Create New Website</a>
    </div>
@endsection

@section('content')
    <div class="tabs-wrapper">
        <ul class="tab-nav">
            <li class="tab-item"><a class="tab-link tab-active" data-area="#all" href="#/all">All (<span class="all_count">0</span>)</a></li>
            <li class="tab-item"><a class="tab-link" data-area="#active" href="#/active">Active (<span class="active_count">0</span>)</a></li>
            <li class="tab-item"><a class="tab-link" data-area="#inactive" href="#/inactive">Inactive (<span class="inactive_count">0</span>)</a></li>
            <li class="tab-item"><a class="tab-link" data-area="#expired" href="#/expired">Expired (<span class="expired_count">0</span>)</a></li>
        </ul>
    </div>
    <div class="m-portlet m-portlet--mobile tab_area area-active md-pt-50" id="all_area">
        <div class="m-portlet__body">
            @include('components.admin.websiteTable', ['selector'=>'datatable-all', 'user'=>1])
        </div>
    </div>
    <div class="m-portlet m-portlet--mobile tab_area md-pt-50" id="active_area">
        <div class="m-portlet__body">
            @include('components.admin.websiteTable', ['selector'=>'datatable-active', 'user'=>1])
        </div>
    </div>
    <div class="m-portlet m-portlet--mobile tab_area md-pt-50" id="inactive_area">
        <div class="m-portlet__body">
            @include('components.admin.websiteTable', ['selector'=>'datatable-inactive', 'user'=>1])
        </div>
    </div>
    <div class="m-portlet m-portlet--mobile tab_area md-pt-50" id="expired_area">
        <div class="m-portlet__body">
            @include('components.admin.websiteTable', ['selector'=>'datatable-expired', 'user'=>1])
        </div>
    </div>
@endsection
@section('script')
    <script src="{{asset('assets/js/admin/websites/index.js')}}"></script>
@endsection
