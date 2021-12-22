@extends('layouts.adminApp')

@section('title', 'Logo Types Items')
@section('style')
@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <x-layout.breadcrumb :menus="['Logo Types', 'Edit Logo Type']"/>
    </div>
    <div class="col-md-6 text-right">
        <a href="{{route('admin.logotypes.item.index')}}" class="ml-auto btn m-btn--square btn-outline-info m-btn--custom mb-2">Back</a>
    </div>
@endsection

@section('content')

    <div class="m-portlet m-portlet--mobile tab_area area-active md-pt-50" id="all_area">
        <div class="m-portlet__head bg-333">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text text-white">
                        Edit Logo Type
                    </h3>
                </div>
            </div>
            <div class="m-portlet__head-tools">
            </div>
        </div>
        <div class="m-portlet__body">
            <div class="container">
                <form action="{{route('admin.logotypes.item.update', $logoType->id)}}" method="POST" enctype="multipart/form-data" id="submit_form">
                    @csrf
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group m-form__group">
                                <label for="preview_image" class="form-control-label">
                                    Preview Image
                                </label>
                                <input type="file" data-url="{{$logoType->preview}}" id="preview_image" name="preview_image">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <a href="{{route('logotypes.choose', $logoType->id)}}" target="_blank">Preview in Editor <i class="la la-external-link"></i></a>
                            <hr>
                            <div class="form-group">
                                <label for="category">Choose Category</label>
                                <select name="categories[]" id="category" class="select2 form-control" multiple>
                                    <option></option>
                                    @foreach($categories as $category)
                                        <option value="{{$category->id}}" @if(in_array($category->id, $logoType->categories->pluck("id")->toArray())) selected @endif>{{$category->name}}</option>
                                    @endforeach
                                </select>
                                <div class="form-control-feedback error-category"></div>
                            </div>
                            <div class="form-group">
                                <label for="name" class="form-control-label">
                                    Name:
                                </label>
                                <input type="text" class="form-control m-input--square" name="name" id="name" value="{{$logoType->name}}">
                                <div class="form-control-feedback error-name"></div>
                            </div>
                            <div class="form-group">
                                <label for="favicon">Attach Favicon</label>
                                <select name="favicon" id="favicon" class="selectpicker" data-live-search="true" data-width="100%">
                                    <option value="">Select...</option>
                                    @foreach($favicons as $favicon)
                                        <option value="{{$favicon->id}}" data-content="<img src='{{$favicon->preview}}' style='width:22px; object-fit: contain; margin-right: 10px;'/>{{$favicon->name}}" {{($logoType->favicon->id??'') == $favicon->id ? 'selected' : ''}}>
                                            {{$favicon->name}}
                                        </option>
                                    @endforeach
                                </select>
                                <div class="form-control-feedback error-favicon"></div>
                            </div>

                            <div class="form-group">
                                <label for="tutorial">Attach Tutorial</label>
                                <select name="tutorial" id="tutorial" class="select2 form-control" >
                                    <option></option>
                                    @foreach($tutorials as $tutorial)
                                        <option value="{{$tutorial->id}}" @if($tutorial->id == $logoType->tutorial_id) selected @endif>{{$tutorial->title}} @if($tutorial->public) (Public) @endif</option>
                                    @endforeach
                                </select>
                                <div class="form-control-feedback error-tutorial"></div>
                            </div>

                            <div class="row" x-data="{recommend:{{$logoType->recommend?'true':'false'}}}">
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="status" class="form-control-label">
                                            Active?
                                        </label>
                                        <div>
                                            <span class="m-switch m-switch--icon ml-1 mr-1 m-switch--info">
                                                <label>
                                                    <input type="checkbox" @if($logoType->enabled) checked @endif id="status" name="status">
                                                    <span></span>
                                                </label>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="premium" class="form-control-label">
                                            Premium?
                                        </label>
                                        <div>
                                            <span class="m-switch m-switch--icon ml-1 mr-1 m-switch--info">
                                                <label>
                                                    <input type="checkbox" @if($logoType->premium) checked @endif id="premium" name="premium" >
                                                    <span></span>
                                                </label>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="recommend" class="form-control-label">
                                            Recommended?
                                        </label>
                                        <div>
                                            <span class="m-switch m-switch--icon ml-1 mr-1 m-switch--info">
                                                <label>
                                                    <input type="checkbox" id="recommend" name="recommend" x-on:click="recommend=!recommend" @if($logoType->recommend) checked @endif>
                                                    <span></span>
                                                </label>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12"  x-bind:class="{'d-none':!recommend}">
                                    <div class="form-group">
                                        <label for="order" class="form-control-label">
                                            Recommended Page Sort Order:
                                        </label>
                                        <input type="text" class="form-control m-input--square" name="order" id="order" value="{{$logoType->order}}">
                                        <div class="form-control-feedback error-order"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="global_order" class="form-control-label">
                                    All Category Sort Order:
                                </label>
                                <input type="text" class="form-control m-input--square" name="global_order" id="global_order" value="{{$logoType->global_order}}">
                                <div class="form-control-feedback error-global_order"></div>
                            </div>
                            <div class="text-right">
                                <br/>
                                <button type="submit" class="btn m-btn--square m-btn--custom btn-outline-success smtBtn">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div>
@endsection
@section('script')
    <script src="{{asset('assets/js/admin/logo/logoType/itemCreate.js')}}?v={{time()}}"></script>
@endsection
