@extends('layouts.adminApp')

@section('title', 'Palette Ideas')
@section('style')
@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <x-layout.breadcrumb :menus="['Palette Ideas', 'Edit Item']"/>
    </div>
@endsection

@section('content')
    <div class="m-portlet m-portlet--mobile tab_area area-active md-pt-50" id="all_area">
        <div class="m-portlet__head bg-333">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text text-white"> Edit Palette Ideas </h3>
                </div>
            </div>
            <div class="m-portlet__head-tools">
            </div>
        </div>

        <div class="m-portlet__body">
            <form action="{{route('admin.palette-idea.item.update', $item->id)}}" id="submit_form" method="post" enctype="multipart/form-data">
                @csrf
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="footer" class="form-control-label">Choose Category:
                            </label>
                            <select name="category" id="category" class="category selectpicker" data-live-search="true" data-width="100%">
                                <option value="" disabled selected>Choose Category</option>
                                @foreach($categories as $category)
                                    <option value="{{$category->id}}">{{$category->name}}</option>
                                    @foreach($category->approvedSubCategories as $subcat)
                                        <option value="{{$subcat->id}}">{{$category->name}} --> {{$subcat->name}}</option>
                                    @endforeach
                                @endforeach
                            </select>
                            <div class="form-control-feedback error-category"></div>
                        </div>
                        <x-form.input name="title" label="Post Title" value="{{$item->title}}"/>

                        <div class="form-group">
                            <label for="description" class="form-control-label">Description:
                            </label>
                            <textarea class="form-control m-input--square minh-100" name="description" id="description">{{$item->description}}</textarea>
                            <div class="form-control-feedback error-description"></div>
                        </div>

                        <x-form.addImage :images="$item->getMedia('image')" />

                        <x-form.addLink :links="$item->getLinks()" />

                        <x-form.uploadVideo :videos="$item->getMedia('video')" />

                        <x-form.galleryOrder order="{{$item->order}}"/>
                    </div>
                    <div class="col-md-6">
                        <x-form.thumbnail label="Thumbnail">
                            {{$item->getFirstMediaUrl("thumbnail")}}
                        </x-form.thumbnail>

                        <div class="row">
                            <div class="col-4">
                                <label for="featured" class="form-control-label">Featured?
                                </label>
                                <div>
                                    <span class="m-switch m-switch--icon m-switch--info">
                                        <label>
                                            <input type="checkbox" name="featured" id="featured" @if($item->featured) checked @endif>
                                            <span></span>
                                        </label>
                                    </span>
                                </div>
                            </div>
                            <div class="col-4">
                                <label for="new" class="form-control-label">New?
                                </label>
                                <div>
                                    <span class="m-switch m-switch--icon m-switch--info">
                                        <label>
                                            <input type="checkbox" name="new" id="new" @if($item->new) checked @endif>
                                            <span></span>
                                        </label>
                                    </span>
                                </div>
                            </div>
                            <div class="col-4">
                                <label for="status" class="form-control-label">Approve?
                                </label>
                                <div>
                                    <span class="m-switch m-switch--icon m-switch--info">
                                        <label>
                                            <input type="checkbox" name="status" id="status" @if($item->status) checked @endif>
                                            <span></span>
                                        </label>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-right mt-4">
                    <a href="{{route('admin.palette-idea.item.index')}}" class="btn btn-outline-info m-btn m-btn--custom m-btn--square">Back</a>
                    <button type="submit" class="btn m-btn--square m-btn m-btn--custom btn-outline-success smtBtn">Submit</button>
                </div>
            </form>
        </div>
    </div>
@endsection
@section('script')
    <script type="text/javascript" src="{{asset('assets/vendors/cropper/cropper.js')}}"></script>
    <script>
        var ratio_width = "{{config("custom.variable.portfolio_image_ratio_width")}}",
            ratio_height="{{config("custom.variable.portfolio_image_ratio_height")}}",
            category = "{{$item->category_id}}",
            item_id = "{{$item->id}}"
    </script>
    <script src="{{asset('assets/js/account/image_crop.js')}}"></script>
    <script src="{{asset('assets/js/admin/logo/portfolio/itemEdit.js')}}"></script>
@endsection
