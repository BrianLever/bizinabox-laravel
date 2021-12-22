@extends('layouts.adminApp')

@section('title', 'Logo Types Category')

@section('breadcrumb')
    <div class="col-md-6 text-left">
        <x-layout.breadcrumb :menus="['Favicon', 'Category']"/>
    </div>
    <div class="col-md-6 text-right">
        <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm m-btn--custom btn-outline-info sortBtn mb-2">Sort Order</a>
        <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm m-btn--custom btn-outline-success createBtn mb-2">Create</a>
    </div>
@endsection

@section('content')
    <div class="m-portlet m-portlet--mobile tab_area area-active md-pt-50" id="all_area">
        <div class="m-portlet__head bg-333">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text text-white">
                        Favicon Categories (<span class="all_count">0</span>)
                    </h3>
                </div>
            </div>
            <div class="m-portlet__head-tools"></div>
        </div>
        <div class="m-portlet__body">
            <div class="w-100">
                <button class="pull-right ml-auto btn m-btn--square m-btn--sm m-btn--custom btn-outline-danger mb-2 delete-all" disabled >Delete</button>
            </div>
            <div class="table-responsive" id="faviconCategoryTable" >
                <table class="table datatable">
                    <thead>
                        <tr>
                            <th class="no-sort  no-search index" style="width: 30px">No</th>
                            <th class="no-sort no-search" style="width: 30px"><input type="checkbox" class="select-all"/> </th>
                            <th> Name </th>
                            <th> Preview </th>
                            <th> Description </th>
                            <th> Sort Order </th>
                            <th> Favicons </th>
                            <th> Created At </th>
                            <th class="no-sort"> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="modal fade" id="create_modal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Favicon Category</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">X</span>
                    </button>
                </div>
                <form id="create_modal_form" method="post" enctype="multipart/form-data" action="{{route('admin.favicon.category.store')}}">
                    <div class="modal-body">
                        @csrf
                        <div class="col-12">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label>Thumbnail</label>
                                        <input type="file" name="thumbnail" id="slimInput"/>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <input type="hidden" name="id" id="category_id"/>
                                    <div class="form-group">
                                        <label for="name" class="form-control-label">
                                            Name:
                                        </label>
                                        <input type="text" class="form-control m-input--square" name="name" id="name">
                                        <div class="form-control-feedback error-name"></div>
                                    </div>
                                    <div class="form-group">
                                        <label for="description" class="form-control-label">
                                            Description:
                                        </label>
                                        <textarea class="form-control m-input--square minh-100" rows="6" name="description" id="description"></textarea>
                                        <div class="form-control-feedback error-description"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-info m-btn m-btn--custom m-btn--square" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn m-btn--square m-btn  m-btn--custom   btn-outline-success smtBtn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <x-admin.logo.sortModal />
@endsection
@section('script')
    <script src="{{asset('assets/vendors/jquery/jquery-ui.min.js')}}"></script>
    <script src="{{asset('assets/js/admin/favicon/category.js?'.time())}}"></script>
@endsection
