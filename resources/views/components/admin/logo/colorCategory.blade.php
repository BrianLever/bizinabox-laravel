<div class="category_items">
    @forelse($categories as $category)
        <a href="{{route('admin.logotypes.color.item.index', $category->id)}}"
           class="d-inline-block width-100px float-left p-2 color_cat_item"
           data-id="{{$category->id}}"
           data-name="{{$category->name}}"
           data-status="{{$category->status}}">
            @if($category->status)
                <img src="{{asset("assets/img/folder.png")}}" alt="" class="w-100">
            @else
                <img src="{{asset("assets/img/folder_0.png")}}" alt="" class="w-100">
            @endif
            <p class="mb-0 mt-2 text-center">{{$category->name}} ({{$category->palettes_count}})</p>
        </a>
    @empty
        <div class="text-center mt-5">
            Empty
        </div>
    @endforelse
    <div class="clearfix"></div>
</div>
