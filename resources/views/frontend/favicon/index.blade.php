@extends('layouts.app')

@section('title', $seo['title']??'Portfolios')

@section('style')
@endsection


@section('seo')
    @include('components.front.seo')
@endsection

@section('content')

    <x-front.hero
        image="{{uploadUrl(option('favicon.front.header.image'),'header.png')}}"
        thumbImage="{{uploadUrl(option('favicon.front.header.image.thumb'),'header-thumb.png')}}"
    ></x-front.hero>

    <div class="container container-lg">
        <x-front.favicon-boxes></x-front.favicon-boxes>
    </div>

@endsection
@section('script')
@endsection
