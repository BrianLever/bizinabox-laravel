@extends('layouts.app')

@section('title', 'A La Carte')

@section('style')
    <link rel="stylesheet" href="{{asset('assets/vendors/lightgallery/css/lightgallery.min.css')}}">
@endsection
@section('content')
    <x-front.hero>A La Carte</x-front.hero>

    <div class="container">
        <ol class="breadcrumb mt-3">
            <li class="breadcrumb-item"><a href="{{route('lacarte.index')}}">A La Carte</a></li>
            @if($item->category->category->name!==null)
                <li class="breadcrumb-item"><a href="{{route('lacarte.index')}}#/{{$item->category->category->slug}}">{{$item->category->category->name}}</a></li>
            @endif
            <li class="breadcrumb-item active"><a href="{{route('lacarte.index')}}#/{{$item->category->slug}}">{{$item->category->name}}</a></li>
        </ol>
        <div class="row mt-5 margin-70px-bottom">
            <div class="col-md-5">
                <div class="xzoom-container">
                    <a href="{{$item->getFirstMediaUrl('thumbnail')}}" class="w-100 progressive replace">
                        <img src="{{$item->getFirstMediaUrl('thumbnail', 'thumb')}}" alt="{{$item->name}}" class="w-100 preview">
                    </a>
                </div>
            </div>
            <div class="col-md-7">
                <div class="product-detail">
                    <h3 class="margin-8px-bottom">
                        {{$item->name}} @if($item->featured)<span class="label-sale bg-theme text-white text-uppercase font-size14">Featured</span> @endif
                    </h3>
                    <div class="bg-theme separator-line-horizontal-full margin-20px-bottom"></div>
                   <div class="margin-20px-bottom white-space-pre-line">
                       {{ $item->description }}
                   </div>

                    <div class="margin-20px-bottom">
                        <div class="display-inline-block margin-15px-right padding-15px-right border-right border-color-extra-medium-gray">
                              <div id="review_rating"></div>
                        </div>
                        <div class="display-inline-block">
                            <a class="text-theme-color" href="#review">Write a review</a>
                        </div>
                    </div>
                    <div class="margin-20px-bottom">
                        @if($item->slashed_price!==null)<span class="margin-15px-right font-size24 font-weight-600 offer-price">${{formatNumber($item->slashed_price)}}</span> @endif
                        <span class="font-size24 font-weight-700 text-theme-color">${{formatNumber($item->price)}}</span>
                    </div>
                    <div class="row">
                        <div class="col-4 col-lg-2">
                            <label>Qty:</label>
                            <input type="number" value="1" class="margin-20px-bottom fcustom-input" name="quantity" id="quantity">
                        </div>
                    </div>

                    <div class="row margin-20px-bottom">
                        <div class="col-lg-12">
                            <a href="javascript:void(0);" class="butn theme margin-15px-right xs-margin-10px-bottom addToCartBtn toggleBtn" data-cart="0">
                                <span><i class="fas fa-shopping-cart margin-5px-right"></i> Add to Cart </span>
                            </a>
                            <a href="{{route('cart.index')}}" class="butn theme margin-15px-right xs-margin-10px-bottom toggleBtn d-none">
                                <span> Go to Cart <i class="fas fa-arrow-right margin-5px-left"></i></span>
                            </a>
                            <button type="button" class="butn text-uppercase addToCartBtn" data-cart="1"><span> Buy Now</span></button>
                        </div>
                    </div>

                    <x-front.socialShare></x-front.socialShare>

                </div>
            </div>
        </div>

        <x-front.gallery :item="$item" :order="$item->order"></x-front.gallery>

        <x-front.reviewForm type="lacarte" :id="$item->id"></x-front.reviewForm>


    </div>
@endsection
@section('script')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/rateYo/2.3.2/jquery.rateyo.min.js"></script>
    <script src="{{asset('assets/vendors/lightgallery/js/lightgallery-all.min.js')}}"></script>
    <script>var type = "lacarte", model_id="{{$item->id}}"; </script>
    <script src="{{asset('assets/js/front/lacarte/detail.js')}}"></script>
@endsection
