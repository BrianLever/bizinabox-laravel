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
                        Gradient Color Palette (<span class="palette_count">0</span>)
                    </h3>
                </div>
            </div>
            <div class="m-portlet__head-tools">

            </div>
        </div>
        <div class="m-portlet__body">
            <div class="palette_body" id="admin_vue">
                <gradient-palette
                        :category_id="{{$palette->category_id}}"
                        :palette_id="{{$palette->id}}"
                        :attrs_prop="{{$palette->data}}"
                        name_prop="{{$palette->name}}"
                ></gradient-palette>
            </div>
        </div>
    </div>
    <x-admin.logo.sortModal />
@endsection
@section('script')
    <script src="{{asset('assets/js/admin/logo/admin-vue.js')}}?v={{time()}}"></script>
@endsection
