<?php

namespace App\Http\Controllers\Admin\Logo\LogoType;

use App\Http\Controllers\Admin\Logo\LogoController;
use App\Models\Logo\Group;
use App\Models\Logo\LogoType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GroupController extends LogoController
{
    public function __construct(Group $model)
    {
        $this->model = $model;
    }

    public function index()
    {

        if(request()->wantsJson())
        {
            $groups = $this->model->with('logoTypes')
                ->latest()
                ->get();

            $all = view('components.admin.logo.groupTable', [
                'groups'=>$groups,
                'selector'=>"datatable-all"
            ])->render();

            $count['all'] = $groups->count();

            return response()->json([
                'status'=>1,
                'all'=>$all,
                'count'=>$count
            ]);
        }

        $logoTypes = LogoType::where("enabled", 1)->get();

        return view('admin.logo.logoType.group', compact("logoTypes"));
    }
    public function store(Request $request)
    {
        try {
            $validation = Validator::make($request->all(), [
                'name'=>'required|max:191',
                'mainLogo'=>'required|exists:logo_types,id',
                'logoTypes.*'=> 'nullable|exists:logo_types,id'
            ]);
            if($validation->fails()) return $this->jsonError($validation->errors());
            if($request->group_id)
            {
                $group = $this->model->findorfail($request->group_id);
            }else {
                $group = $this->model;
            }
            $group->name = $request->name;
            $group->save();

            if($request->logoTypes)
            {
                foreach($request->logoTypes as $key=>$logoType)
                {
                    $result[$logoType] = ['main'=>0];
                }
            }
            $result[$request->mainLogo] = ['main'=>1];

            $group->logoTypes()->sync($result);

            return $this->jsonSuccess();

        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
    public function delete($id)
    {
        try {
            $this->model->findorfail($id)->delete();

            return $this->jsonSuccess();
        }catch(\Exception $e)
        {
            return $this->jsonExceptionError($e);
        }
    }
}
