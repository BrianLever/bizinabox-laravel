<div class="table-responsive">
    <table class="table table-hover ajaxTable datatable {{$selector}}">
        <thead>
        <tr>
            <th></th>
            <th><input type="text" class="form-control" placeholder="PIN Number"></th>
{{--            <th></th>--}}
            <th><input type="text" class="form-control" placeholder="Username"></th>
            <th><input type="text" class="form-control" placeholder="Name"></th>
            <th><input type="text" class="form-control" placeholder="Email"></th>
            <th>
                <select name="role" id="filter_role" class="form-control width-100px px-0">
                    <option value="">All</option>
                    <option value="1">Admin</option>
                    <option value="2">Client</option>
                    <option value="3">Employer</option>
                    <option value="4">User</option>
                </select>
            </th>
            <th>
                <select name="status" id="filter_status" class="form-control width-100px px-0">
                    <option value="">All</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
            </th>
            <th><input type="text" class="form-control" placeholder="From Date"></th>
            <th><a href="#" class="btn btn-outline-success">Filter</a></th>
        </tr>
        <tr>
            <th>
                <input name="select_all" class="selectAll checkbox" value="1" type="checkbox" data-area="{{$selector}}">
            </th>
            <th>
                PIN Number
            </th>
{{--            <th>--}}
{{--                Image--}}
{{--            </th>--}}
            <th>
                Username
            </th>
            <th>
                Name
            </th>
            <th>
                Email
            </th>
            <th>
                Role
            </th>
            <th>
                Status
            </th>
            <th>
                Created At
            </th>
            <th>
                Action
            </th>
        </tr>
        </thead>
        <tbody class="loading-tbody"><tr><td colspan="10" style="height:200px;"></td></tr></tbody>
    </table>
</div>
