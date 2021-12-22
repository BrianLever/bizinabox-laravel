<ol class="breadcrumb">
    {!! $title !!}
</ol>
@if($category!==null)
    <a href="{{$category->getFirstMediaUrl('image')}}" class="w-100 progressive replace">
        <img src="{{$category->getFirstMediaUrl('image', 'thumb')}}"
             alt="{{$category->name}}"
             class=" preview"
        >
    </a>
    <div class="mt-5 white-space-pre-line">
        {{$category->description}}
    </div>
@endif
<div class="row mt-5">
    @forelse($templates as $key=>$template)
        <div class="col-md-6">
            <div class="template_item_array">
                <div class="template_browser">•••</div>
                <style>
                    .tem-{{$key}}.bgimg {
                        background-image: url({{$template->getFirstMediaUrl('preview')}});
                    }
                    .tem-{{$key}}.bgimg.replace {
                        background-image: url({{$template->getFirstMediaUrl('preview', 'thumb')}});
                    }
                </style>
                <a href="{{route('template.detail', $template->slug)}}" class="preview_bg w-100 height-400 view_template d-block position-relative bgimg progressive replace tem-{{$key}}"
{{--                     style="background-image:url({{$template->getFirstMediaUrl('preview')}});"--}}
                     data-id="{{$template->id}}"
                >
                    <div class="position-absolute z-index-99 w-100 p-2">
                        @if($template->featured) <span class="float-left text-success border-all pl-1 pr-1 border-success"> Featured </span> @endif
                        @if($template->new) <span class="float-right text-danger border-all pl-1 pr-1 border-danger"> New </span> @endif
                    </div>
                </a>
            </div>
            <p class="template_item_title">{{$template->name}}</p>
        </div>
    @empty
        <div class="col-md-12 text-center">
            <h3>No template..</h3>
        </div>
    @endforelse
</div>
<div>
    {{ $templates->links() }}
</div>
