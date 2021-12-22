@extends('layouts.master')

@section('title', 'Template Items')
@section('style')
    <style>
    </style>
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
                    <span class="m-nav__link-text">Template</span>
                </a>
            </li>
            <li class="m-nav__separator">/</li>
            <li class="m-nav__item">
                <a href="" class="m-nav__link">
                    <span class="m-nav__link-text">Items</span>
                </a>
            </li>
        </ul>
    </div>
    <div class="col-md-6 text-right">
        <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm  m-btn--custom  btn-outline-success createBtn mb-2">Create</a>
    </div>
@endsection

@section('content')
    <div class="tab_btn_area text-center">
        <div class="show_checked d-none">
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-success switchBtn" data-action="active">Active</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-primary switchBtn " data-action="inactive">Inactive</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-success switchBtn " data-action="featured">Featured</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-primary switchBtn " data-action="unfeatured">Unfeatured</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-success switchBtn " data-action="new">New</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-primary switchBtn " data-action="undonew">Undo New</a>
            <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-danger switchBtn " data-action="delete">Delete</a>
        </div>
    </div>
    <div class="tabs-wrapper">
        <div class="clearfix"></div>
        <ul class="tab-nav">
            <li class="tab-item"><a class="tab-link tab-active" data-area="#all" href="#/all"> All Templates (<span class="all_count">0</span>)</a></li>
            <li class="tab-item"><a class="tab-link" data-area="#active" href="#/active"> Active Templates (<span class="active_count">0</span>)</a></li>
            <li class="tab-item"><a class="tab-link" data-area="#inactive" href="#/inactive"> InActive Templates (<span class="inactive_count">0</span>)</a></li>
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
    <div class="modal fade" id="create_modal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Category</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">X</span>
                    </button>
                </div>
                <form id="create_modal_form" method="post" enctype="multipart/form-data">
                    <div class="modal-body">
                        @csrf
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="category" class="form-control-label">Choose Category:
                                        <i class="la la-info-circle tooltip_icon"
                                           title='{{$tooltip[1]}}'
                                           data-page="{{$view_name}}"
                                           data-id="1"
                                        ></i>
                                    </label>
                                    <select name="category_id" id="category" class="selectpicker" data-live-search="true" data-width="100%">
                                        <option selected disabled hidden>Choose Category</option>
                                        @foreach($categories as $category)
                                            <option value="{{$category->id}}">{{$category->name}}</option>
                                            @foreach($category->approvedSubCategories as $subcategory)
                                                <option value="{{$subcategory->id}}">{{$category->name}} &#8594; {{$subcategory->name}}</option>
                                            @endforeach
                                        @endforeach
                                    </select>
                                    <div class="form-control-feedback error-category_id"></div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="name" class="form-control-label">Name:
                                        <i class="la la-info-circle tooltip_icon"
                                           title='{{$tooltip[4]}}'
                                           data-page="{{$view_name}}"
                                           data-id="4"
                                        ></i>
                                    </label>
                                    <input type="text" class="form-control m-input--square" name="name" id="name">
                                    <div class="form-control-feedback error-name"></div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="header" class="form-control-label">Header Template:
                                        <i class="la la-info-circle tooltip_icon"
                                           title='{{$tooltip[2]}}'
                                           data-page="{{$view_name}}"
                                           data-id="2"
                                        ></i>
                                    </label>
                                    <select name="header_id" id="header" class="selectpicker" data-live-search="true" data-width="100%">
                                        <option value="">None</option>
                                        @foreach($headers as $header)
                                            <option value="{{$header->id}}">{{$header->name}}</option>
                                        @endforeach
                                    </select>
                                    <div class="form-control-feedback error-header_id"></div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="footer" class="form-control-label">Footer Template:
                                        <i class="la la-info-circle tooltip_icon"
                                           title='{{$tooltip[3]}}'
                                           data-page="{{$view_name}}"
                                           data-id="3"
                                        ></i>
                                    </label>
                                    <select name="footer_id" id="footer" class="selectpicker" data-live-search="true" data-width="100%">
                                        <option value="">None</option>
                                        @foreach($footers as $footer)
                                            <option value="{{$footer->id}}">{{$footer->name}}</option>
                                        @endforeach
                                    </select>
                                    <div class="form-control-feedback error-footer_id"></div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="description" class="form-control-label">Description:
                                        <i class="la la-info-circle tooltip_icon"
                                           title='{{$tooltip[5]}}'
                                           data-page="{{$view_name}}"
                                           data-id="5"
                                        ></i>
                                    </label>
                                    <textarea class="form-control m-input--square minh-100" name="description" id="description"></textarea>
                                    <div class="form-control-feedback error-description"></div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group d-none">
                            <label for="css" class="form-control-label">Css:
                                <i class="la la-info-circle tooltip_icon"
                                   title='{{$tooltip[6]}}'
                                   data-page="{{$view_name}}"
                                   data-id="6"
                                ></i>
                            </label>
                            <div id="css" class="ace_editor"></div>
                        </div>
                        <div class="form-group d-none">
                            <label for="script" class="form-control-label">Script:
                                <i class="la la-info-circle tooltip_icon"
                                   title='{{$tooltip[7]}}'
                                   data-page="{{$view_name}}"
                                   data-id="7"
                                ></i>
                            </label>
                            <div id="script" class="ace_editor"></div>
                        </div>

                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="featured" class="form-control-label">Featured?
                                        <i class="la la-info-circle tooltip_icon"
                                           title='{{$tooltip[8]}}'
                                           data-page="{{$view_name}}"
                                           data-id="8"
                                        ></i>
                                    </label>
                                    <div>
                                        <span class="m-switch m-switch--icon ml-1 mr-1 m-switch--info">
                                            <label>
                                                <input type="checkbox" checked="checked" id="featured" name="featured">
                                                <span></span>
                                            </label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="new" class="form-control-label">New?
                                        <i class="la la-info-circle tooltip_icon"
                                           title='{{$tooltip[9]}}'
                                           data-page="{{$view_name}}"
                                           data-id="9"
                                        ></i>
                                    </label>
                                    <div>
                                        <span class="m-switch m-switch--icon ml-1 mr-1 m-switch--info">
                                            <label>
                                                <input type="checkbox" checked="checked" id="new" name="new">
                                                <span></span>
                                            </label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="status" class="form-control-label">Active?
                                        <i class="la la-info-circle tooltip_icon"
                                           title='{{$tooltip[10]}}'
                                           data-page="{{$view_name}}"
                                           data-id="10"
                                        ></i>
                                    </label>
                                    <div>
                                        <span class="m-switch m-switch--icon ml-1 mr-1 m-switch--info">
                                            <label>
                                                <input type="checkbox" disabled id="status" name="status">
                                                <span></span>
                                            </label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="status" class="form-control-label">Version</label>
                                    <select name="version" class="form-control">
                                        <option value="1">Version 1</option>
                                        <option value="2">Version 2</option>
                                    </select>
                                </div>
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
@endsection
@section('script')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/ace.js"></script>
    <script src="{{asset('assets/js/admin/template/item.js')}}"></script>
@endsection
