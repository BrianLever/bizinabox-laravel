@extends('layouts.adminApp')

@section('title', 'Logo Types Fonts')
@section('style')
@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <x-layout.breadcrumb :menus="['Logo Types', 'Fonts']"/>
    </div>
    <div class="col-md-6 text-right">
        <label class="btn m-btn--custom btn-outline-info" for="upload-fonts">
            Upload New Fonts
            <input type="file" hidden id="upload-fonts" multiple  accept=".ttf,.woff,.otf"/>
        </label>
    </div>
@endsection

@section('content')

    <div class="m-portlet m-portlet--mobile tab_area area-active md-pt-50" id="all_area">
        <div class="m-portlet__head bg-333">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text text-white">
                        Logo Type Fonts (<span class="all_count">0</span>)
                    </h3>
                </div>
            </div>
            <div class="m-portlet__head-tools">
            </div>
        </div>
        <div class="m-portlet__body">
            @include('components.admin.logo.logoTypeFont', ['selector'=>'datatable-all'])
        </div>
    </div>


    <x-layout.modal title="Upload fonts" id="upload_fonts_modal">
        <div class="mt-1 d-flex justify-content-between align-items-center mb-3">
            <b class="text-16px">File</b>
            <b class="text-16px">Font Name</b>
        </div>
        <div class="fonts-container"></div>
    </x-layout.modal>
@endsection
@section('script')
    <script src="{{asset('assets/js/admin/logo/logoType/font.js')}}?v={{time()}}"></script>
@endsection
