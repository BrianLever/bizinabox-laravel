
@extends('layouts.adminApp')

@section('title', 'Logo Types Color Palette')
@section('style')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css">
@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <x-layout.breadcrumb :menus="['Logo Types', 'Color Category', 'Palettes']"/>
    </div>
@endsection

@section('content')

    <div class="m-portlet m-portlet--mobile tab_area area-active md-pt-50" id="palette_area">
        <div class="m-portlet__head bg-333">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text text-white">
                        Color Palette (<span class="palette_count">0</span>)
                    </h3>
                </div>
            </div>
            <div class="m-portlet__head-tools">

            </div>
        </div>
        <div class="m-portlet__body">
            <div class="text-right">
                <a href="{{route('admin.logotypes.color.index')}}" class="ml-auto btn m-btn--square m-btn--custom m-btn--sm btn-outline-primary mb-2">Back</a>
                <a href="#" class="ml-auto btn m-btn--square m-btn--sm btn-outline-info m-btn--custom sortBtn mb-2" data-gradient="1">Sort Order</a>
                <a href="{{route('admin.logotypes.color.item.create', $category->id)}}" class="ml-auto btn m-btn--sm btn-outline-success m-btn--custom mb-2 create_cat_btn" >Add New</a>
            </div>
            <div class="palette_body">
                <div class="text-center"><i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></div>
            </div>
        </div>
    </div>
    <x-admin.logo.sortModal />
@endsection
@section('script')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.ui.position.js"></script>
    <script src="{{asset('assets/vendors/jquery/jquery-ui.min.js')}}"></script>
    <script>var category_id = "{{$category->id}}";</script>
    <script src="{{asset('assets/js/admin/logo/logoType/palette.js')}}?v={{time()}}"></script>
@endsection
