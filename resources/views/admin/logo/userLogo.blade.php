@extends('layouts.adminApp')

@section('title', 'User Logos')
@section('style')
@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <x-layout.breadcrumb :menus="['Users', 'Logos']"/>
    </div>
    <div class="col-md-6 text-right">
        <a href="/admin/queue" class="ml-auto btn m-btn--square btn-outline-success m-btn--custom mb-2" target="_blank">Monitor Queues</a>
    </div>
@endsection

@section('content')

    <x-layout.tabs-wrapper>
        <x-layoutItems.tab-item name="all" label="All Logos" active="1"/>
        <x-layoutItems.tab-item name="notdownload" label="Not Downloaded" active="0"/>
        <x-layoutItems.tab-item name="download" label="Downloaded" active="0"/>
    </x-layout.tabs-wrapper>

    <x-layout.portletBody id="all_area" active="1">
        @include("components.admin.logo.userLogoItem", ['selector'=>'datatable-all'])
    </x-layout.portletBody>

    <x-layout.portletBody id="notdownload_area" active="0">
        @include("components.admin.logo.userLogoItem", ['selector'=>'datatable-notdownload'])
    </x-layout.portletBody>
    <x-layout.portletBody id="download_area" active="0">
        @include("components.admin.logo.userLogoItem", ['selector'=>'datatable-download'])
    </x-layout.portletBody>
@endsection
@section('script')
    <script>var getUrl = "{{route('admin.userLogo.index')}}?user={{$user_id}}";</script>
    <script src="{{asset('assets/js/admin/logo/userLogo.js')}}?v={{time()}}"></script>
@endsection
