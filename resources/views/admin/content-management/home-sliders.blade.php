@extends('layouts.master')

@section('title', 'Home Sliders')
@section('style')
    <link href="{{asset('assets/vendors/slim/slim.min.css')}}" rel="stylesheet"/>
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
                    <span class="m-nav__link-text">Home Sliders</span>
                </a>
            </li>
        </ul>
    </div>
    <div class="col-md-6 text-right">
        <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-success createBtn mb-2">Create</a>
    </div>
@endsection

@section('content')
    <div class="tab_btn_area top-40 text-center" style="top: 40px">
        <div class="show_checked d-none">
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-success switchBtn" data-action="active">Active</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-primary switchBtn " data-action="inactive">Inactive</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-danger switchBtn " data-action="delete">Delete</a>
        </div>
    </div>

    <div class="m-portlet m-portlet--mobile md-pt-50">
        <div class="m-portlet__body">
            <div class="text-center">
                <i class='fa fa-spinner fa-spin fa-3x fa-fw'></i>
            </div>
        </div>
    </div>

    <div class="modal fade" id="create_modal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Home Slider</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">X</span>
                    </button>
                </div>
                <form id="create_modal_form" method="post" enctype="multipart/form-data">
                    <div class="modal-body">
                        @csrf
                        <input type="hidden" name="slider_id" id="slider_id" />
                        <div class="form-group">
                            <label for="title" class="form-control-label">Title:</label>
                            <input type="text" class="form-control m-input--square" name="title" id="title">
                            <div class="form-control-feedback error-title"></div>
                        </div>
                        <div class="form-group">
                            <label for="content" class="form-control-label">Description:</label>
                            <textarea class="form-control m-input--square" rows="3" name="description" id="description"></textarea>
                            <div class="form-control-feedback error-description"></div>
                        </div>
                        <div class="form-group">
                            <label for="thumbnail" class="form-control-label">Image
                                <i class="la la-info-circle tooltip_icon"></i>
                            </label>
                            <div class="slimdiv">
                                <input type="file" name="image" id="slimInput"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="status" class="form-control-label">Active?</label>
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
                        <button type="button" class="btn btn-outline-info m-btn m-btn--square" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn m-btn--square m-btn btn-outline-success ">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
@section('script')
    <script src="{{asset('assets/vendors/slim/slim.kickstart.min.js')}}"></script>
    <script src="{{asset('assets/js/admin/content-management/home-slider.js')}}"></script>
@endsection
