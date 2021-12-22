<div class="col-md-2 col-sm-3 col-6 my-2">
    @if($box === null)
        <div class="box-item-container">
            <div class="row no-gutters thumbnail">
                <div class="col-12 position-relative">
                    <div class="preview-wrapper">
                        <div class="thumbnail_overlay">
                            <div  class="img_area">
                                <figure data-href="/assets/img/front/plugin.png" class="w-100 progressive replace m-0" >
                                    <img src="/assets/img/front/plugin.png" alt="bizinabox home page portfolio" class="preview" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @else
        <div class="d-block box-item-container" >
            <div class="row no-gutters">
                <div class="col-12">
                    <div class="preview-wrapper">
                        <div class="thumbnail_overlay">
                            <div  class="img_area">
                                <figure data-href="{{$box->preview}}" class="w-100 progressive replace m-0">
                                    <img src="{{$box->preview}}" class="preview img-fill" />
                                </figure>
                            </div>
                        </div>
                        <div class="portfolio">
                            <a href="{{route('favicon.choose', $box->id)}}">EDIT TEMPLATE</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif
</div>
