<div class="d-block box-item-container" >
    <div class="row no-gutters">
        <div class="col-12">
            <div class="preview-wrapper">
                <div class="thumbnail_overlay">
                    <div  class="img_area">
                        <figure data-href="{{$item->preview}}" class="w-100 progressive replace m-0">
                            <img src="{{$item->preview}}" class="preview img-fill" />
                        </figure>
                    </div>
                </div>
                <div class="portfolio">
                    <a href="{{route('favicon.choose', $item->id)}}">EDIT TEMPLATE</a>
                </div>
            </div>
        </div>
    </div>
</div>

