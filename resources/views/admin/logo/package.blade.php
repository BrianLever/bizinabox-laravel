@extends('layouts.adminApp')

@section('title', 'Logo Types - Package')
@section('style')

@endsection
@section('breadcrumb')
    <div class="col-md-6 text-left">
        <x-layout.breadcrumb :menus="['Logo Types', 'Package']"/>
    </div>
@endsection

@section('content')
   <div class="container pt-5" id="pricing">
       <div class="row justify-content-center">
           <div class="col-12 mb-3">
               <h2 class="text-center mb-5">
                  <b>Packages</b>
               </h2>
               <div class="text-right">
                   <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-primary free_offer_logo_btn">Free Offer Logo Counts ({{option("free_offer_logo", 0)}})</a>
                   <a href="javascript:void(0);" class="ml-auto btn m-btn--square m-btn--sm btn-outline-info sortBtn">Sort Order</a>
                   <a href="#" class="btn btn-outline-success m-btn--square m-btn--sm  createBtn">Create New Package</a>
               </div>
           </div>
           @forelse($packages as $package)
           <div class="col-md-4 mb-5">
               <div class="block-pricing @if($package->recommend) recommended @endif">
                   @if($package->status)
                    <span class="position-absolute top-5 left-5 c-badge c-badge-success">Active</span>
                   @else
                       <span class="position-absolute top-5 left-5 c-badge c-badge-danger">Inactive</span>
                   @endif
                   <div class="table {{$package->status? 'active':'inactive'}}">
                       <h4 class="text-center">{{$package->name}}</h4>
                       <div class="price_data">
                           <h2 class="text-center">${{$package->price}} <span class="font-size12">USD @if($package->recurrent) /{{ucfirst($package->period_unit)}} @endif</span></h2>
                       </div>
                       <ul class="list-unstyled mt-5 minh-100px white-space-pre-line">
                           {{$package->description}}
                       </ul>
                   </div>
                   <div class="table_btn">
                       <a href="#" class="btn btn-outline-info edit_btn"
                          data-package="{{$package}}"
                       >
                           <span>
                               <i class="fa fa-edit"></i>
                           </span>
                       </a>
                       <a href="{{route('admin.logotypes.package.delete', $package->id)}}" class="btn btn-outline-danger delete_btn"
                       >
                           <span>
                               <i class="fa fa-trash"></i>
                           </span>
                       </a>
                   </div>
               </div>
           </div>
           @empty
               No packages
           @endforelse
       </div>
   </div>

   <div class="modal fade" id="priceModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog" role="document">
           <div class="modal-content">
               <div class="modal-header">
                   <h5 class="modal-title" id="exampleModalLabel">Edit Price</h5>
                   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">X</span>
                   </button>
               </div>
               <form id="pricing_form" action="{{route('admin.logotypes.package.store')}}" method="post" enctype="multipart/form-data">
                   <div class="modal-body">
                       @csrf
                       <input type="hidden" id="package_id" name="package_id">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="name" class="form-control-label">Name</label>
                                    <input type="text" class="form-control" name="name" id="name">
                                    <div class="form-control-feedback error-name"></div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="price" class="form-control-label">Price (USD)</label>
                                    <input type="text" class="form-control" name="price" id="price">
                                    <div class="form-control-feedback error-price"></div>
                                </div>
                            </div>
                        </div>
                       <div class="row">
                           <div class="col-md-6">
                               <div class="form-group">
                                   <label for="recurrent">Payment Type</label>
                                   <select name="recurrent" id="recurrent" class="form-control selectpicker">
                                       <option value="0">Onetime</option>
                                       <option value="1" selected>Recurrent</option>
                                   </select>
                               </div>
                           </div>
                           <div class="col-md-6">
                               <div class="form-group period_area">
                                   <label for="recurrent">Recurring Period</label>
                                   <div class="input-group">
                                       <input type="number" class="form-control text-right m-input--square" value="1" name="period" id="period">
                                       <div class="input-group-append" style="width:150px;">
                                           <select class="form-control m-bootstrap-select selectpicker disable_item" name="period_unit" id="period_unit">
                                               <option value="day">Day</option>
                                               <option value="week">Week</option>
                                               <option value="month" selected>Month</option>
                                               <option value="year">Year</option>
                                           </select>
                                       </div>
                                   </div>
                                   <div class="form-control-feedback error-period"></div>
                               </div>
                           </div>
                       </div>
                       <div class="row">
                           <div class="col-md-6">
                               <div class="form-group free_limit_area">
                                   <label for="free_limit" class="form-control-label">Free Logo Download Limits</label>
                                   <input type="text" class="form-control" name="free_limit" id="free_limit">
                                   <div class="form-control-feedback error-free_limit"></div>
                               </div>
                           </div>
                           <div class="col-md-6">
                               <label class="m-checkbox m-checkbox--state-success mt-5">
                                   <input type="checkbox" name="free_unlimited" id="free_unlimited"> Free Download Unlimited
                                   <span></span>
                               </label>
                           </div>
                       </div>

                       <div class="row">
                           <div class="col-md-6">
                               <div class="form-group premium_limit_area">
                                   <label for="premium_limit" class="form-control-label">Premium Logo Download Limits</label>
                                   <input type="text" class="form-control" name="premium_limit" id="premium_limit">
                                   <div class="form-control-feedback error-premium_limit"></div>
                               </div>
                           </div>
                           <div class="col-md-6">
                               <label class="m-checkbox m-checkbox--state-success mt-5">
                                   <input type="checkbox" name="premium_unlimited" id="premium_unlimited"> Premium Download Unlimited
                                   <span></span>
                               </label>
                           </div>
                       </div>

                       <div class="form-group">
                           <label for="description" class="form-control-label">Description:</label>
                           <textarea class="form-control minh-100px" name="description" id="description"></textarea>
                           <div class="form-control-feedback error-description"></div>
                       </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="status" class="form-control-label">Status </label>
                                    <div>
                                        <span class="m-switch m-switch--icon m-switch--info">
                                            <label>
                                                <input type="checkbox" name="status" id="status">
                                                <span></span>
                                            </label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="recommend" class="form-control-label">Recommended </label>
                                    <div>
                                        <span class="m-switch m-switch--icon m-switch--info">
                                            <label>
                                                <input type="checkbox" name="recommend" id="recommend">
                                                <span></span>
                                            </label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                   </div>
                   <div class="modal-footer">
                       <button type="button" class="btn btn-outline-info m-btn m-btn--custom m-btn--square" data-dismiss="modal">Cancel</button>
                       <button type="submit" class="btn m-btn--square m-btn btn-outline-success smtBtn">Submit</button>
                   </div>
               </form>
           </div>
       </div>
   </div>

   <div class="modal fade" id="freeOfferModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog" role="document">
           <div class="modal-content">
               <div class="modal-header">
                   <h5 class="modal-title" id="exampleModalLabel">Free Offer Logo</h5>
                   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">X</span>
                   </button>
               </div>
                   <div class="modal-body">
                       @csrf

                       <div class="form-group">
                           <label for="free_offer_logo" class="form-control-label">Free Offer Logo Counts</label>
                           <input type="text" class="form-control" name="free_offer_logo" id="free_offer_logo" value="{{option("free_offer_logo", 0)}}">
                           <div class="form-control-feedback error-free_offer_logo"></div>
                       </div>
                   </div>
                   <div class="modal-footer">
                       <button type="button" class="btn btn-outline-info m-btn m-btn--custom m-btn--square" data-dismiss="modal">Cancel</button>
                       <a href="#" class="btn m-btn--square m-btn btn-outline-success freeOfferSmtBtn">Submit</a>
                   </div>
           </div>
       </div>
   </div>
   <x-admin.logo.sortModal />

@endsection
@section('script')
    <script src="{{asset('assets/vendors/jquery/jquery-ui.min.js')}}"></script>
    <script src="{{asset('assets/js/admin/logo/package.js')}}?v={{time()}}"></script>
@endsection
