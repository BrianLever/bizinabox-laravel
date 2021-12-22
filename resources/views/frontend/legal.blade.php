@extends('layouts.app')

@section('title', $page->title)

@section('style')
@endsection
@section('content')
<div class="container my-5">
    <h2>{{$page->title}}</h2>
    {!! $page->body !!}
</div>
@endsection
@section('script')
@endsection
