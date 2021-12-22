@extends('layouts.adminApp')

@section('title', 'Logo Types Groups')
@section('style')
@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <x-layout.breadcrumb :menus="['Logo Types', 'Group']"/>
    </div>
    <div class="col-md-6 text-right">
        <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--custom btn-outline-success createBtn mb-2">Create</a>
    </div>
@endsection

@section('content')
    <div class="m-portlet m-portlet--mobile tab_area area-active md-pt-50" id="all_area">
        <div class="m-portlet__head bg-333">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text text-white">
                        Logo Type Groups (<span class="all_count">0</span>)
                    </h3>
                </div>
            </div>
            <div class="m-portlet__head-tools">

            </div>
        </div>
        <div class="m-portlet__body">
            <div class="text-center"><i class='fa fa-spinner fa-spin fa-3x fa-fw'></i></div>
        </div>
    </div>
    <div class="modal fade" id="create_modal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Logo Type Group</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">X</span>
                    </button>
                </div>
                <form id="create_modal_form" method="post" enctype="multipart/form-data" action="{{route('admin.logotypes.group.store')}}">
                    <div class="modal-body">
                        @csrf
                        <input type="hidden" name="group_id" id="group_id"/>

                        <div class="form-group">
                            <label for="name" class="form-control-label">
                                Name:
                            </label>
                            <input type="text" class="form-control m-input--square" name="name" id="name">
                            <div class="form-control-feedback error-name"></div>
                        </div>
                        <div class="form-group">
                            <label for="mainLogo" class="form-control-label">
                                Choose Main Logo:
                            </label>
                            <select name="mainLogo" id="mainLogo" class="selectpicker" data-live-search="true" data-width="100%">
                                <option>Select...</option>
                                @foreach($logoTypes as $logoType)
                                    <option value="{{$logoType->id}}" data-content="<img src='{{$logoType->preview}}' style='width:50px;'/>{{$logoType->name}}">{{$logoType->name}}</option>
                                @endforeach
                            </select>
                            <div class="form-control-feedback error-mainLogo"></div>
                        </div>
                        <div class="form-group">
                            <label for="logoTypes" class="form-control-label">
                                Choose Similar Logotypes:
                            </label>
                            <select name="logoTypes[]" id="logoTypes" class="select2" multiple>
                                <option></option>
                                @foreach($logoTypes as $logoType)
                                    <option value="{{$logoType->id}}" data-img_src="{{$logoType->preview}}">{{$logoType->name}}</option>
                                @endforeach
                            </select>
                            <div class="form-control-feedback error-logoTypes"></div>
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
    <script src="{{asset('assets/js/admin/logo/logoType/group.js')}}?v={{time()}}"></script>
@endsection
