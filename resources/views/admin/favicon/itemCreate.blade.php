@extends('layouts.adminApp')

@section('title', 'Favicon Items')
@section('style')
    <link href="{{asset('assets/vendors/slim/slim.min.css')}}" rel="stylesheet"/>
@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <x-layout.breadcrumb :menus="['Logo Types', 'Import New Logo']"/>
    </div>
    <div class="col-md-6 text-right">
        <a href="{{route('admin.favicon.item.index')}}" class="ml-auto btn m-btn--square btn-outline-info m-btn--custom mb-2">Back</a>
    </div>
@endsection

@section('content')
    <div class="m-portlet m-portlet--mobile tab_area area-active md-pt-50" id="all_area">
        <div class="m-portlet__head bg-333">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text text-white">
                        Import New Favicon
                    </h3>
                </div>
            </div>
            <div class="m-portlet__head-tools"></div>
        </div>
        <div class="m-portlet__body">
            <div class="container">
                <form action="{{route('admin.favicon.item.store')}}" method="POST" enctype="multipart/form-data" id="submit_form">
                    @csrf
                    <div class="row">
                        <div class="col-md-6">
                            <div class="col-8">
                                <div class="form-group m-form__group">
                                    <label for="preview_image" class="form-control-label">
                                        Preview Image *
                                    </label>
                                    <input type="file" id="preview_image" name="preview_image" >
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h3><b>1. Load SVG Favicon</b></h3>
                            <hr>
                            <div class="form-group m-form__group">
                                <label for="svg_file" class="form-control-label">
                                    SVG File *
                                </label>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="svg_file" name="svg_file" accept=".svg">
                                    <label class="custom-file-label" for="svg_file">Choose file</label>
                                </div>
                                <div class="form-control-feedback error-svg_file"></div>
                            </div>
                            <div class="form-group">
                                <label for="category">Choose Categories</label>
                                <select name="categories[]" id="category" class="select2 form-control" multiple>
                                    <option></option>
                                    @foreach($categories as $category)
                                        <option value="{{$category->id}}" >{{$category->name}}</option>
                                    @endforeach
                                </select>
                                <div class="form-control-feedback error-categories"></div>
                            </div>
                            <div class="form-group">
                                <label for="name" class="form-control-label">
                                    Name:
                                </label>
                                <input type="text" class="form-control m-input--square" name="name" id="name">
                                <div class="form-control-feedback error-name"></div>
                            </div>

                            <div class="form-group">
                                <label for="tutorial">Attach Tutorial</label>
                                <select name="tutorial" id="tutorial" class="select2 form-control" >
                                    <option></option>
                                    @foreach($tutorials as $tutorial)
                                        <option value="{{$tutorial->id}}">{{$tutorial->title}} @if($tutorial->public) (Public) @endif</option>
                                    @endforeach
                                </select>
                                <div class="form-control-feedback error-tutorial"></div>
                            </div>
                            <div class="row" x-data="{recommend:false}">
                                <div class="col-3">
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
                                <div class="col-3">
                                    <div class="form-group">
                                        <label for="premium" class="form-control-label">
                                            Premium?
                                        </label>
                                        <div>
                                            <span class="m-switch m-switch--icon ml-1 mr-1 m-switch--info">
                                                <label>
                                                    <input type="checkbox" id="premium" name="premium">
                                                    <span></span>
                                                </label>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="form-group">
                                        <label for="recommend" class="form-control-label">
                                            Recommended?
                                        </label>
                                        <div>
                                            <span class="m-switch m-switch--icon ml-1 mr-1 m-switch--info">
                                                <label>
                                                    <input type="checkbox" id="recommend" name="recommend" x-on:click="recommend=!recommend">
                                                    <span></span>
                                                </label>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3"  x-bind:class="{'d-none':!recommend}">
                                    <div class="form-group">
                                        <label for="order" class="form-control-label">
                                            Sort Order:
                                        </label>
                                        <input type="text" class="form-control m-input--square" name="order" id="order">
                                        <div class="form-control-feedback error-order"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="global_order" class="form-control-label">
                                            All category sort order
                                        </label>
                                        <input type="text" class="form-control m-input--square" name="global_order" id="global_order">
                                        <div class="form-control-feedback error-global_order"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="text-right">
                                        <br>
                                        <button type="submit" class="btn m-btn--square m-btn--custom btn-outline-success smtBtn">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div>
@endsection
@section('script')
    <script src="{{asset('assets/js/admin/favicon/itemCreate.js')}}?v={{time()}}"></script>
@endsection
