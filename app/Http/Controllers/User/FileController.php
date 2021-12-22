<?php

namespace App\Http\Controllers\User;

use App\Models\Website;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use Session;

class FileController extends UserController
{
    public function index()
    {
        Session::put('file.storage', 'user');

        if (request()->wantsJson()) {
            $websites = Website::where('user_id', user()->id);
            return Datatables::of($websites)->addColumn('checkbox', function($row) {
                return '<input type="checkbox" class="checkbox" data-id="'.$row->id.'">';
            })->addColumn('storage', function($row) {
                return $row->storageUsage();
            })->editColumn('created_at', function($row) {
                return $row->created_at;
            })->addColumn('action', function($row) {

                return '<a href="'.route('user.file.show', $row->id).'" class="btn btn-outline-info btn-sm m-1 p-2 m-btn m-btn--icon">
                            <span>
                                <i class="la la-eye"></i>
                                <span>Detail</span>
                            </span>
                        </a>
                        <a href="'.route('user.file.edit', $row->id).'" class="btn btn-outline-success btn-sm m-1	p-2 m-btn m-btn--icon">
                            <span>
                                <i class="la la-edit"></i>
                                <span>Edit</span>
                            </span>
                        </a>';

            })->rawColumns(['checkbox', 'status', 'storage', 'action'])->make(true);
        }
        return view(self::$viewDir.'file.index');
    }
}
