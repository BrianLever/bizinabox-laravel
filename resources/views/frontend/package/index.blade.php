@extends('layouts.app')

@section('title', 'Package')

@section('style')
@endsection
@section('content')
    <x-front.hero>Package</x-front.hero>

    <div class="container">
        <div class="items_result">
            <div class="text-center minh-100 pt-5"><i class="fa fa-spinner fa-spin fa-3x"></i></div>
        </div>
    </div>

@endsection
@section('script')
    <script src="{{asset('assets/js/front/package/index.js')}}"></script>
@endsection
