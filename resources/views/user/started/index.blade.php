@extends('layouts.master')

@section('title', 'Getting Started')
@section('style')
    <style>
    </style>
@endsection
@section('breadcrumb')
    <div class="col-md-6">
        <x-layout.breadcrumb :menus="['Getting Started']" :menuLinks="[]" />
    </div>
@endsection

@section('content')
     <div class="row">
            <div class="col-lg-3 col-md-4">
                <div class="sidebar-tab">
                    <ul class="sidebar-tab-ul">
                        <li class="tab-item">
                            <a class="tab-link username_link" data-area="#setup-username" href="#/setup-username">
                               1. Username & Pin Number
                            </a>
                        </li>
                        <li class="tab-item">
                            <a class="tab-link demographic_link" data-area="#setup-demographic" href="#/setup-demographic">
                                2. Demographics
                            </a>
                        </li>
                        <li class="tab-item">
                            <a class="tab-link" data-area="#setup-time" href="#/setup-time">
                                3. Timezone and Format
                            </a>
                        </li>
                    </ul>
                    <div><span class="progress_percentage">{{user()->getCompletedPercentage()}}</span>% completed</div>
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped bg-success progress_bar" role="progressbar"
                             style="width: {{user()->getCompletedPercentage()}}%">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-9 col-md-8">
                <x-layout.portlet active="1" id="first_screen">
                    <div class="text-center pt-5">
                        <h1 class="fs-3-5"><b>Getting Started Quick Setup!</b></h1>

                        <h2 class="mt-5">Hello! Please complete these steps to finish setup.</h2>
                    </div>

                    <div class="text-right mt-5">
                        <a href="#/setup-username" class="btn m-btn--square m-btn--custom btn-lg btn-outline-success tab-link" data-area="#setup-username">Next</a>
                    </div>

                </x-layout.portlet>

                <x-layout.portlet active="0" id="setup-username_area" label="Username & Pin Number">
                    <x-form.form action="{{route('user.getting.started.username')}}" id="username_form">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-6 offset-lg-3">
                                    <div class="form-group">
                                        <label for="username">Username</label>
                                        <div class="input-group m-input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">@</span>
                                            </div>
                                            <input type="text" class="form-control m-input" name="username" value="{{user()->username}}">
                                        </div>
                                        <div class="form-control-feedback error-username"></div>
                                    </div>
                                    <br>
                                    <x-form.input name="pin_number" value="{{user()->pin_number}}" label="Pin Number"/>
                                    <br>
                                    <div class="text-right">
                                        <button type="submit" class="btn m-btn--custom btn-outline-success smtBtn">Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </x-form.form>
                </x-layout.portlet>
                <x-layout.portlet active="0" id="setup-demographic_area" label="Demographics">
                    <x-form.form action="{{route('user.getting.started.demographics')}}" id="demographic_form">
                        @php
                            $address = user()->address;
                        @endphp
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-6 offset-lg-3">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <x-form.input name="first_name" label="First Name" value="{{user()->first_name}}" />
                                        </div>
                                        <div class="col-md-6">
                                            <x-form.input name="last_name" label="Last Name" value="{{user()->last_name}}" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="date_of_birth">Date of Birth</label>
                                                <input  name="date_of_birth" class="form-control" value="{{user()->birthday}}" id="date_of_birth" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <x-form.input name="phone" value="{{$address->phone}}" label="Phone Number"/>
                                        </div>
                                    </div>
                                    <x-form.input name="address1" value="{{$address->address1}}" label="Address1" placeholder="Enter Street Address, P.O. Box, Military Address"/>
                                    <x-form.input name="address2" value="{{$address->addresss}}" label="Address2" placeholder="Enter Apt, Suite, Floor (Optional)"/>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <x-form.input name="city" value="{{$address->city}}" label="City"/>
                                        </div>
                                        <div class="col-md-6">
                                            <x-form.input name="state" value="{{$address->state}}" label="State"/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <x-form.input name="zipcode" value="{{$address->zipcode}}" label="Zip/Postal Code"/>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="country">Country (*)</label>
                                                <select name="country" id="country" class="selectpicker form-control" data-width="100%" data-live-search="true">
                                                    @foreach(\App\Models\Country::get(["iso", "nicename"]) as $country)
                                                        <option value="{{$country->iso}}" @if($address->country==$country->iso) selected @else @if($country->iso=='US') selected @endif @endif>{{$country->nicename}}</option>
                                                    @endforeach
                                                </select>
                                                <div class="form-control-feedback error-country"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <a class="btn btn-outline-info m-btn--custom tab-link" data-area="#setup-username" href="#/setup-username">Previous</a>
                                        <button type="submit" class="btn m-btn--custom btn-outline-success smtBtn">Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </x-form.form>
                </x-layout.portlet>

                <x-layout.portlet active="0" id="setup-time_area" label="Timezone & Time Format">
                    <x-form.form action="{{route('user.getting.started.time')}}" id="time_form">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-6 offset-lg-3">
                                    <div class="form-group">
                                        <label for="timezone">
                                            Timezone
                                            <i class="fa fa-info-circle tooltip_1" title="Timezone"></i>
                                        </label>
                                        {!! getTimezoneList("name='timezone' class='form-control' id='timezone' data-live-search='true' value='".user()->timezone."'") !!}
                                        <div class="form-control-feedback error-timezone"></div>
                                    </div>
                                    <br>
                                    <x-form.selectpicker label="Time Format:" name="timeformat" search="false">
                                        <option value="Y-m-d H:i:s" @if(user()->timeformat==='Y-m-d H:i:s') selected @endif>2020-05-16 07:30:00</option>
                                        <option value="m/d/Y H:i:s" @if(user()->timeformat==='m/d/Y H:i:s') selected @endif>05/16/2020 07:30:00</option>
                                    </x-form.selectpicker>
                                    <br>
                                    <div class="d-flex justify-content-between">
                                        <a class="btn btn-outline-info m-btn--custom tab-link" data-area="#setup-demographic" href="#/setup-demographic">Previous</a>
                                        <button type="submit" class="btn m-btn--custom btn-outline-success smtBtn">Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </x-form.form>
                </x-layout.portlet>
                <x-layout.portlet active="0" id="setup-complete_area" label="Welcome!">
                    <div class="pt-5 container">
                        <div class="row">
                            <div class="col-lg-6 offset-lg-3">
                                <div class="m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-info">
                                    <div class="m-alert__icon">
                                        <i class="flaticon-exclamation-1"></i>
                                        <span></span>
                                    </div>
                                    <div class="m-alert__text">
                                        <p class="fs-16 mb-0"><strong>Please note some important tools to assist with navigation and Help</strong></p>

                                    </div>
                                </div>
                                <div class="mt-5 p-4 pl-5 border border-success">
                                    <div class="row mb-3">
                                        <div class="col-2 text-right">
                                            <i class="la la-info-circle tooltip_3" title="Requirements, Extra explanations."></i>
                                        </div>
                                        <div class="col-10">
                                            : If you mouse hover this, it will show requirements and extra explanations.
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-2 text-right">
                                            "Help"
                                        </div>
                                        <div class="col-10">
                                            :
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-2 text-right">
                                            <a href="{{route('user.tutorial.index')}}" class="c-badge c-badge-success h-cursor">Tutorial</a>
                                        </div>
                                        <div class="col-10">
                                            : If you click this button, it will redirect to tutorial page directly.
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-2 text-right">
                                            "Tickets"
                                        </div>
                                        <div class="col-10">
                                            :
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-between mt-5">
                                    <a class="btn btn-outline-info m-btn--custom tab-link" data-area="#setup-time" href="#/setup-time">Previous</a>
                                    <a href="{{route('user.getting.started.complete')}}" class="btn m-btn--square m-btn--custom btn-outline-success tab-link complete_btn" onclick="btnLoading('.complete_btn')">Complete</a>
                                </div>

                            </div>
                        </div>
                    </div>

                </x-layout.portlet>
            </div>
        </div>
@endsection
@section('script')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.6/jquery.inputmask.min.js"></script>
    <script src="{{asset('assets/js/user/started.js')}}"></script>
@endsection
