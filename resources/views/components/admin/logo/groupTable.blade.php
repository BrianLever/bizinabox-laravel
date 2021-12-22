<div class="table-responsive">
    <table class="table table-hover ajaxTable datatable {{$selector}}">
        <thead>
        <tr>
            <th>
                Name
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
        @foreach($groups as $group)
            <tr>
                <td>{{$group->name}}</td>
                <td>
                    @foreach($group->logoTypes as $logoType)
                        <a href="{{$logoType->preview}}" target="_blank" class="group_logo_type {{$logoType->pivot->main? 'main':''}}">
                            <img src="{{$logoType->preview}}" alt="" class="w-100px border">
                        </a>
                    @endforeach
                </td>
                <td>{{$group->created_at->toDateString()}}</td>
                <td>
                    <a href="javascript:void(0);"
                       class=" btn m-btn--square m-btn--custom m-btn--sm btn-outline-primary mb-2 edit_btn"
                       data-types="{{$group->logoTypes->where("pivot.main", 0)->pluck("id")}}"
                       data-main="{{$group->logoTypes->where("pivot.main", 1)->pluck("id")}}"
                       data-id="{{$group->id}}"
                       data-name="{{$group->name}}"
                    >
                        <span>
                            <i class="la la-edit"></i>
                            <span>Edit</span>
                        </span>
                    </a>
                    <a href="{{route('admin.logotypes.group.delete', $group->id)}}" class=" btn m-btn--square m-btn--custom m-btn--sm btn-outline-danger mb-2 deleteBtn" data-action="delete">
                        <span>
                            <i class="la la-trash-o"></i>
                            <span>Delete</span>
                        </span>
                    </a>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
