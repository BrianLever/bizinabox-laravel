<div class="row">
    @forelse($templates as $key=>$template)
        <style>
            .tem-{{$key}}.bgimg {
                background-image: url({{$template->getFirstMediaUrl('preview')}});
            }
            .tem-{{$key}}.bgimg.replace {
                background-image: url({{$template->getFirstMediaUrl('preview', 'thumb')}});
            }
        </style>

        <div class="col-md-4 mb-3">
            <div class="template-preview-user">
                <div class="template_browser">•••</div>
                <a href="#" class="preview_bg w-100 height-250 view_template d-block position-relative bgimg progressive replace tem-{{$key}} template_item_choose h-zoom-in"
                   data-id="{{$template->id}}"
                >
                </a>
            </div>
            <div class="text-center">
                <label for="template_item_{{$key}}">
                    <input type="radio" name="template_item" id="template_item_{{$key}}"
                           value="{{$template->id}}"
                           data-id="{{$template->id}}"
                           data-header="{{$template->header_id}}"
                           data-footer="{{$template->footer_id}}"
                           data-img="{{$template->getFirstMediaUrl('preview')}}"
                           data-slug="{{$template->slug}}"
                           data-name="{{$template->name}}"
                    >
                    {{$template->name}}
                </label>
                (<a href="" class="hover-none text-dark" target="_blank"> <i class="fa fa-external-link-alt"></i></a>)
            </div>
        </div>
    @empty
        <div class="col-12 text-center pt-5">
            No items
        </div>
    @endforelse
    <div class="col-12">
        {{$templates->links()}}
    </div>
</div>
