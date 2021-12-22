@extends('layouts.master')

@section('title', 'Profile & Security')
@section('style')
@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <x-layout.breadcrumb :menus="['Account', 'Profile']"/>
    </div>
@endsection
@section('content')

    <x-layout.tabs-wrapper>
        <x-layoutItems.normal-tab title="Profile" link="profile" active="1"/>
        <x-layoutItems.normal-tab title="Password" link="password" active="0"/>
    </x-layout.tabs-wrapper>

    <x-layout.portletBody id="profile_area" active="1">
        <x-form.form action="{{route('account.profile.update')}}" id="profileForm">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group position-relative text-center pt-5">
                            <label for="image" class="btn btn-outline-info m-btn m-btn--icon btn-lg m-btn--icon-only m-btn--pill m-btn--air choose_btn_container">
                                <i class="la la-edit"></i>
                            </label>
                            <input type="file" accept="image/*" class="form-control m-input--square d-none" id="image" >
                            <img id="avatar" class="image_upload_output w-300px" src="{{auth()->user()->avatar()}}" />
                        </div>
                    </div>
                    <div class="col-md-6">

                        <x-form.input name="first_name" label="First Name" value="{{user()->first_name}}"/>

                        <x-form.input name="last_name" label="Last Name" value="{{user()->last_name}}"/>

                        <x-form.input type="email" name="email" label="Email address" value="{{user()->email}}"/>

                        <div class="form-group">
                            <label for="timezone">
                                Timezone
                                <i class="fa fa-info-circle tooltip_1" title="Timezone"></i>
                            </label>
                            {!! getTimezoneList("name='timezone' class='form-control selectpicker' id='timezone' data-live-search='true' value='".user()->timezone."'") !!}
                            <div class="form-control-feedback error-timezone"></div>
                        </div>

                        <x-form.selectpicker label="Time Format:" name="time_format" search="false">
                            <option value="Y-m-d H:i:s">2020-05-16 07:30:00</option>
                            <option value="m/d/Y H:i:s">05/16/2020 07:30:00</option>
                        </x-form.selectpicker>

                        <div class="form-group text-right">
                            <x-form.smtBtn label="Submit" />
                        </div>
                    </div>
                </div>
            </div>
        </x-form.form>
    </x-layout.portletBody>
    <x-layout.portletBody id="password_area" active="0">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                @if(user()->isPasswordForceUpdateNeed())
                    <x-form.alert-danger title="You need to update your old password to secure your account." />
                    <br>
                @endif
                <x-form.form action="{{route('account.password.update')}}" id="passwordForm">

                    @if(user()->password!=null)
                        <x-form.input type="password" name="old_password" label="Old Password:" />
                    @endif
                    <x-form.input type="password" name="new_password" label="New Password:" />
                    <x-form.input type="password" name="confirm_password" label="Confirm Password:" />

                    <div class="mt-3 text-right">
                        <button type="submit" class="btn m-btn--square  btn-outline-info m-btn m-btn--custom pswBtn">
                            Submit
                        </button>
                    </div>
                </x-form.form>
            </div>
        </div>
    </x-layout.portletBody>
@endsection
@section('script')
    <script type="text/javascript" src="{{asset('assets/vendors/cropper/cropper.js')}}"></script>
    <script>
        var timezone = "{{user()->timezone}}",
            format = "{{user()->timeformat}}"
    </script>
    <script type="text/javascript" src="{{asset('assets/js/account/profile.js')}}"></script>
@endsection
