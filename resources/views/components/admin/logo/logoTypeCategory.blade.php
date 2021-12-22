<div class="table-responsive">
    <table class="table table-hover ajaxTable datatable {{$selector}}">
        <thead>
        <tr>
            <th>
                Name
            </th>
            <th>
                Description
            </th>
            <th>
                Sort Order
            </th>
            <th>
                Logo Types
            </th>
            <th>
                Created At
            </th>
            <th class="no-sort">
                Action
            </th>
        </tr>
        </thead>
        <tbody>
        @foreach($categories as $category)
            <tr>
                <td>{{$category->name}}</td>
                <td>{{$category->description}}</td>
                <td>{{$category->order}}</td>
                <td>
                    {{$category->logoTypes->count()}} logo Types <br>
                    <a href="#" class="cat_sort_order" data-id="{{$category->id}}">Sort Order</a>
                </td>
                <td>{{$category->created_at->toDateString()}}</td>
                <td>
                    <a href="javascript:void(0);"
                       class="tab-link btn btn-outline-info btn-sm m-1	p-2 m-btn m-btn--icon edit_btn"
                       data-category="{{$category}}"
                       data-thumbnail="{{$category->getFirstMediaUrl('thumbnail')}}"
                    >
                        <span>
                            <i class="la la-edit"></i>
                            <span>Edit</span>
                        </span>
                    </a>
                    <a href="{{route('admin.logotypes.category.delete', $category->id)}}" class="btn btn-outline-danger btn-sm m-1	p-2 m-btn m-btn--icon deleteBtn" data-action="delete">
                        <span>
                            <span>Delete</span>
                        </span>
                    </a>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
