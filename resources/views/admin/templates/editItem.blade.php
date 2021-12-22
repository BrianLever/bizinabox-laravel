@extends('layouts.master')

@section('title', 'Template Management')
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
                    <span class="m-nav__link-text">Template</span>
                </a>
            </li>
            <li class="m-nav__separator">/</li>
            <li class="m-nav__item">
                <a href="" class="m-nav__link">
                    <span class="m-nav__link-text">Edit Template</span>
                </a>
            </li>
        </ul>
    </div>
@endsection

@section('content')
    <div class="tabs-wrapper">
        <ul class="tab-nav">
            <li class="tab-item"><a class="tab-link tab-active" data-area="#all" href="#/all">{{$template->name}}</a></li>
            <li class="tab-item"><a class="tab-link" href="{{route('admin.template.item.preview', $template->slug)}}" target="_blank">Preview <i class="la la-external-link"></i></a></li>
        </ul>
    </div>
    <div class="m-portlet m-portlet--mobile tab_area area-active md-pt-50" id="all_area">
        <div class="m-portlet__body">
            <form action="{{route('admin.template.item.update', $template->id)}}" id="submit_form" method="post" enctype="multipart/form-data">
                @csrf
                <div class="row">
                    <div class="col-md-6">

                        <div class="form-group">
                            <label for="name" class="form-control-label">Name:
                                <i class="la la-info-circle tooltip_icon"
                                   title='{{$tooltip[1]}}'
                                   data-page="{{$view_name}}"
                                   data-id="1"
                                ></i>
                            </label>
                            <input type="text" class="form-control m-input--square" name="name" id="name" value="{{$template->name}}">
                            <div class="form-control-feedback error-name"></div>
                        </div>
                        <div class="form-group">
                            <label for="description" class="form-control-label">Description:
                                <i class="la la-info-circle tooltip_icon"
                                   title='{{$tooltip[2]}}'
                                   data-page="{{$view_name}}"
                                   data-id="2"
                                ></i>
                            </label>
                            <textarea class="form-control m-input--square minh-100" name="description" id="description">{{$template->description}}</textarea>
                            <div class="form-control-feedback error-description"></div>
                        </div>

                        <div class="form-group">
                            <label for="category" class="form-control-label">Choose Category:
                                <i class="la la-info-circle tooltip_icon"
                                   title='{{$tooltip[3]}}'
                                   data-page="{{$view_name}}"
                                   data-id="3"
                                ></i>
                            </label>
                            <select name="category_id" id="category" class="selectpicker" data-live-search="true" data-width="100%">
                                <option selected disabled hidden>Choose Category</option>
                                @foreach($categories as $category)
                                    <option value="{{$category->id}}" @if($template->category_id===$category->id) selected @endif>{{$category->name}}</option>
                                    @foreach($category->approvedSubCategories as $subcategory)
                                        <option value="{{$subcategory->id}}" @if($template->category_id===$subcategory->id) selected @endif>
                                            {{$category->name}} &#8594; {{$subcategory->name}}
                                        </option>
                                    @endforeach
                                @endforeach
                            </select>
                            <div class="form-control-feedback error-category_id"></div>
                        </div>

                        <div class="form-group">
                            <label for="header" class="form-control-label">Header Template:
                                <i class="la la-info-circle tooltip_icon"
                                   title='{{$tooltip[4]}}'
                                   data-page="{{$view_name}}"
                                   data-id="4"
                                ></i>
                            </label>
                            <select name="header_id" id="header" class="selectpicker" data-live-search="true" data-width="100%">
                                <option value="">None</option>
                                @foreach($headers as $header)
                                    <option value="{{$header->id}}" @if($template->header_id===$header->id) selected @endif>{{$header->name}}</option>
                                @endforeach
                            </select>
                            <div class="form-control-feedback error-header_id"></div>
                        </div>
                        <div class="form-group">
                            <label for="footer" class="form-control-label">Footer Template:
                                <i class="la la-info-circle tooltip_icon"
                                   title='{{$tooltip[5]}}'
                                   data-page="{{$view_name}}"
                                   data-id="5"
                                ></i>
                            </label>
                            <select name="footer_id" id="footer" class="selectpicker" data-live-search="true" data-width="100%">
                                <option value="">None</option>
                                @foreach($footers as $footer)
                                    <option value="{{$footer->id}}" @if($template->footer_id===$footer->id) selected @endif>{{$footer->name}}</option>
                                @endforeach
                            </select>
                            <div class="form-control-feedback error-footer_id"></div>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group m-form__group">
                                    <label for="image" class="form-control-label">Preview Image
                                        <i class="la la-info-circle tooltip_icon"
                                           title='{{$tooltip[6]}}'
                                           data-page="{{$view_name}}"
                                           data-id="6"
                                        ></i>
                                    </label>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input uploadImageBox" id="image" name="image" data-target="preview">
                                        <label class="custom-file-label" for="image">Choose file</label>
                                    </div>
                                    <img src="{{$template->getFirstMediaUrl('preview')}}" id="preview" class="w-100 mt-3">
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label for="css" class="form-control-label">Css:
                                        <i class="la la-info-circle tooltip_icon"
                                           title='{{$tooltip[7]}}'
                                           data-page="{{$view_name}}"
                                           data-id="7"
                                        ></i>
                                    </label>
                                    <div id="css" class="ace_editor">{!! $template->css !!}</div>
                                </div>

                                <div class="form-group">
                                    <label for="script" class="form-control-label">Script:
                                        <i class="la la-info-circle tooltip_icon"
                                           title='{{$tooltip[8]}}'
                                           data-page="{{$view_name}}"
                                           data-id="8"
                                        ></i>
                                    </label>
                                    <div id="script" class="ace_editor">{!! $template->script !!}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="tab_btn_area text-center" style="top:30px;">
                            <div class="show_checked d-none">
                                <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-success switchBtn" data-action="active">Active</a>
                                <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-primary switchBtn " data-action="inactive">Inactive</a>
                                <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-danger switchBtn " data-action="delete">Delete</a>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between mt-5">
                            <label for="pages" class="form-control-label">All Pages:
                                <i class="la la-info-circle tooltip_icon"
                                   title='{{$tooltip[9]}}'
                                   data-page="{{$view_name}}"
                                   data-id="9"
                                ></i>
                            </label>

                            <a href="javascript:void(0);" class="btn m-btn--square m-btn btn-outline-success btn-sm addPageBtn">+ Add Page</a>
                        </div>
                        <div class="template_page_area text-center">
                            <i class='fa fa-spinner fa-spin fa-2x fa-fw'></i>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="featured" class="form-control-label">Featured?</label>
                                    <div>
                                        <span class="m-switch m-switch--icon ml-1 mr-1 m-switch--info">
                                            <label>
                                                <input type="checkbox" id="featured" name="featured" @if($template->featured) checked @endif>
                                                <span></span>
                                            </label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="new" class="form-control-label">New?</label>
                                    <div>
                                        <span class="m-switch m-switch--icon ml-1 mr-1 m-switch--info">
                                            <label>
                                                <input type="checkbox" id="new" name="new" @if($template->new) checked @endif>
                                                <span></span>
                                            </label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="status" class="form-control-label">Active? </label>
                                    <div>
                                        <span class="m-switch m-switch--icon ml-1 mr-1 m-switch--success">
                                            <label>
                                                <input type="checkbox" id="status" name="status" @if($template->status) checked @endif>
                                                <span></span>
                                            </label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 text-right">
                                <br>
                                <a href="{{route('admin.template.item.index')}}" class="btn btn-outline-info m-btn m-btn--custom m-btn--square m-1">Back</a>
                                <button type="submit" class="btn m-btn--square m-btn  m-btn--custom  btn-outline-success smtBtn m-1">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
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
                <form id="create_modal_form" method="post" enctype="multipart/form-data" >
                    <div class="modal-body">
                        @csrf

                        <input type="hidden" name="page_id" id="page_id">

                        <div class="form-group">
                            <label for="page_name" class="form-control-label">Page Name:</label>
                            <input class="form-control m-input--square" name="page_name" id="page_name">
                            <div class="form-control-feedback error-page_name"></div>
                        </div>
                        <div class="form-group">
                            <label for="url" >Page Url: <i class="fa fa-info-circle tooltip_1" title="without space or special characters."></i></label>
                            <div class="input-group m-input-group m-input-group--air">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">
                                        https://bizinabox.com/preview/{{$template->slug}}/
                                    </span>
                                </div>
                                <input type="text" class="form-control m-input" name="url" id="url">
                            </div>
                            <div class="form-control-feedback error-url"></div>
                        </div>
                        <div class="form-group">
                            <label for="parent_id" class="form-control-label">Parent Page ID: <i class="fa fa-info-circle tooltip_1" title="0 means main page."></i></label>
                            <input class="form-control m-input--square" name="parent_id" id="parent_id" value="0">
                            <div class="form-control-feedback error-parent"></div>
                        </div>
                        <div class="form-group">
                            <label for="page_css" class="form-control-label">Page Additional Css:</label>
                            <div id="page_css" class="ace_editor"></div>
                        </div>

                        <div class="form-group">
                            <label for="page_script" class="form-control-label">Page Additional Script:</label>
                            <div id="page_script" class="ace_editor"></div>
                        </div>
                        <div class="form-group">
                            <label for="page_status" class="form-control-label">Active? </label>
                            <div>
                                <span class="m-switch m-switch--icon ml-1 mr-1 m-switch--info">
                                    <label>
                                        <input type="checkbox" id="page_status" name="page_status">
                                        <span></span>
                                    </label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-info m-btn m-btn--custom m-btn--square" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn m-btn--square m-btn btn-outline-success submit_btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
@section('script')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.11/ace.js"></script>
    <script> var template_id = "{{$template->id}}" </script>
    <script src="{{asset('assets/js/admin/template/editItem.js')}}"></script>
@endsection
