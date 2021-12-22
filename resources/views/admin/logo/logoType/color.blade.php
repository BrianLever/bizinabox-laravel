@extends('layouts.adminApp')

@section('title', 'Logo Types Color Palette')
@section('style')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css">
@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <x-layout.breadcrumb :menus="['Logo Types', 'Color Category']"/>
    </div>
@endsection

@section('content')
    <div class="tabs-wrapper">
        <div class="clearfix"></div>
        <ul class="tab-nav">
            <li class="tab-item"><a class="tab-link tab-active" data-area="#gradient" href="#/gradient"> Gradient (<span class="gradient_count">0</span>)</a></li>
            <li class="tab-item"><a class="tab-link" data-area="#solid" href="#/solid"> Solid (<span class="solid_count">0</span>)</a></li>
        </ul>
    </div>

    <div class="m-portlet m-portlet--mobile tab_area area-active md-pt-50" id="gradient_area">
        <div class="m-portlet__body">
            <div class="text-right">
                <a href="#" class="ml-auto btn m-btn--square m-btn--sm btn-outline-info sortBtn mb-2" data-gradient="1">Sort Order</a>
                <a href="#" class="ml-auto btn m-btn--square m-btn--sm btn-outline-success mb-2 create_cat_btn" data-gradient="1">New Category</a>
            </div>
            <div class="gradient_body">
                <div class="text-center"><i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></div>
            </div>
        </div>
    </div>
    <div class="m-portlet m-portlet--mobile tab_area md-pt-50" id="solid_area">
        <div class="m-portlet__body">
            <div class="text-right">
                <a href="#" class="ml-auto btn m-btn--square m-btn--sm btn-outline-info sortBtn mb-2" data-gradient="0">Sort Order</a>
                <a href="#" class="ml-auto btn m-btn--square btn-outline-success mb-2 create_cat_btn" data-gradient="0">New Category</a>
            </div>
            <div class="solid_body">
                <div class="text-center"><i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="category_modal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Category</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">X</span>
                    </button>
                </div>
                <form id="create_modal_form" method="post" enctype="multipart/form-data" action="{{route('admin.logotypes.color.category.store')}}">
                    <div class="modal-body">
                        @csrf
                        <input type="hidden" name="gradient" id="gradient"/>
                        <input type="hidden" name="category_id" id="category_id"/>

                        <div class="form-group">
                            <label for="name" class="form-control-label">
                                Name:
                            </label>
                            <input type="text" class="form-control m-input--square" name="name" id="name">
                            <div class="form-control-feedback error-name"></div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="form-control-label">
                                Active?
                            </label>
                            <div>
                                <span class="m-switch m-switch--icon ml-1 mr-1 m-switch--info">
                                    <label>
                                        <input type="checkbox" checked="checked" id="status" name="status">
                                        <span></span>
                                    </label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-info m-btn m-btn--custom m-btn--square" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn m-btn--square m-btn m-btn--custom btn-outline-success smtBtn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <x-global.sortModal />
@endsection
@section('script')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-contextmenu/2.7.1/jquery.ui.position.js"></script>
    <script src="{{asset('assets/vendors/jquery/jquery-ui.min.js')}}"></script>
    <script src="{{asset('assets/js/admin/logo/logoType/color.js')}}?v={{time()}}"></script>
@endsection
