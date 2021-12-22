@extends('layouts.master')

@section('title', 'Websites')
@section('style')
@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <ul class="m-subheader__breadcrumbs m-nav m-nav--inline">
            <li class="m-nav__item m-nav__item--home">
                <a href="" class="m-nav__link m-nav__link--icon">
                    <i class="m-nav__link-icon la la-home"></i>
                </a>
            </li>
            <li class="m-nav__separator">/</li>
            <li class="m-nav__item">
                <a href="" class="m-nav__link">
                    <span class="m-nav__link-text">Websites</span>
                </a>
            </li>
        </ul>
    </div>
    <div class="col-md-6 text-right">
        <a href="{{route('user.website.getting.started')}}" class="ml-auto btn m-btn--square m-btn--sm m-btn--custom btn-outline-info mb-2">New Website</a>
    </div>
@endsection

@section('content')
    <div class="tabs-wrapper">
        <ul class="tab-nav">
            <li class="tab-item"><a class="tab-link tab-active" data-area="#all" href="#/all"> Running Websites (<span>{{$activeWebsites->count()}}</span>)</a></li>
            <li class="tab-item"><a class="tab-link" data-area="#expired" href="#/expired"> Expired Websites (<span>{{$pendingWebsites->count()}}</span>)</a></li>
        </ul>
    </div>
    <div class="m-portlet m-portlet--mobile">
        <div class="m-portlet__body tab_area area-active md-pt-50" id="all_area">
            <div class="table-responsive">
                <table class="table table-hover ajaxTable datatable datatable-all">
                    <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Package
                        </th>
                        <th>
                            Domain
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Storage
                        </th>
                        <th>
                            Created At
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        @foreach($activeWebsites as $website)
                            <tr>
                                <td>{{$website->name}}</td>
                                <td>
                                    @if($website->package->getName()!=null)
                                        <a href="{{route('user.purchase.package.detail', $website->package->id)}}">{{$website->package->getName()}}</a>
                                    @endif
                                </td>
                                <td><a href='//{{$website->domain}}' target='_blank'>{{$website->domain}}<i class='la la-external-link'></i></a></td>
                                <td>
                                    <span class="c-badge {{$website->status_by_owner=='active'?'c-badge-success':'c-badge-info'}}">{{$website->status_by_owner}}</span>
                                </td>
                                <td>{!! $website->storageUsage() !!}</td>
                                <td>{{$website->created_at}}</td>
                                <td>
                                    <a href="{{route('user.website.editContent', $website->id)}}" target="_blank" class="btn btn-outline-success btn-sm m-1	p-2 m-btn m-btn--icon">
                                        <span>
                                            <i class="la la-edit"></i>
                                            <span>Design</span>
                                        </span>
                                    </a>

                                    <a href="{{route('user.website.edit', $website->id)}}" class="btn btn-outline-success btn-sm m-1	p-2 m-btn m-btn--icon">
                                        <span>
                                            <i class="la la-edit"></i>
                                            <span>Setting</span>
                                        </span>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
        <div class="m-portlet__body tab_area md-pt-50" id="expired_area">
            <div class="table-responsive">
                <table class="table table-hover ajaxTable datatable datatable-all">
                    <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Package
                        </th>
                        <th>
                            Domain
                        </th>
                        <th>
                            Storage
                        </th>
                        <th>
                            Created At
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($pendingWebsites as $website)
                        <tr>
                            <td>{{$website->name}}</td>
                            <td>
                                @if($website->package->getName()!=null)
                                    <a href="{{route('user.purchase.package.detail', $website->package->id)}}">{{$website->package->getName()}}</a>
                                @endif
                            </td>
                            <td><a href='//{{$website->domain}}' target='_blank'>{{$website->domain}}<i class='la la-external-link'></i></a></td>
                            <td>{!! $website->storageUsage() !!}</td>
                            <td>{{$website->created_at}}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
@section('script')
    <script src="{{asset('assets/js/user/website/index.js')}}"></script>
@endsection
