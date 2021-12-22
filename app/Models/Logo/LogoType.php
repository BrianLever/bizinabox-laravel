<?php

namespace App\Models\Logo;

use App\Models\FaviconItem;
use App\Models\Tutorial;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Yajra\DataTables\DataTables;

class LogoType extends Model
{

    protected $guarded = [];

    const STORAGE_DISK             = 's3-pub-bizinabox';
    const EXTENSION                = 'svg';
    const DIRECTORY                = 'logotypes';
    const PREVIEW_DIRECTORY        = 'logotypes/previews/';
    const PREVIEW_EXTENSION        = 'png';

    protected $appends = ['preview','favicon'];

    public function categories()
    {
        return $this->belongsToMany(LogoCategory::class, 'logo_category_types', 'logotype_id', 'category_id');
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class, "group_logotypes", "logotype_id", "group_id")->withPivot("main");
    }

    public function favicons(){
        return $this->belongsToMany(FaviconItem::class,'logo_favicon','logo_id','favicon_id');
    }

    public function getFaviconAttribute(){
        if(count($this->favicons)){
            return $this->favicons->first();
        }
        return  null;
    }

    public function tutorial()
    {
        return $this->belongsTo(Tutorial::class, "tutorial_id")->where('status', 1)->withDefault();
    }
    public function getGroupLogos()
    {
        $group = $this->groups->where("pivot.main", 1)->first();
        if($group)
        {
            session()->put("currentGroupId", $group->id);
        }else {
            $group = $this->groups->where("id", session("currentGroupId"))->first();
        }

        $groupLogos =  LogoType::join("group_logotypes", "logo_types.id", "group_logotypes.logotype_id")
            ->where("group_logotypes.group_id", $group->id?? 0)
            ->where("logo_types.enabled", 1)
            ->orderBy("logo_types.global_order")
            ->orderBy("logo_types.created_at")
            ->get("logo_types.*");

        return $groupLogos;
    }

    /**
     * @return bool|string
     */
    public function getContentAttribute()
    {
        $path = $this->path;
        $url = Storage::disk('s3-pub-bizinabox')->url($path);
        Log::info($url);
        return file_get_contents($url);
    }
    public function getPreviewAttribute(): string
    {
        return Storage::disk(self::STORAGE_DISK)->url(self::PREVIEW_DIRECTORY.$this->hash.".".self::PREVIEW_EXTENSION);
    }
    public function updateItem($request): self
    {
        if($request->preview_image)
        {
            $image = json_decode($request->preview_image)->output->image;
            $image = preg_replace('#^data:image/\w+;base64,#i', '', $image);
            $image = base64_decode($image);
            $name = $this->hash . ".png";
            Storage::disk('s3-pub-bizinabox')->put(self::PREVIEW_DIRECTORY.$name, $image);
        }

        $this->name = $request->name;
        $this->enabled = $request->status?1:0;
        $this->premium = $request->premium?1:0;
        $this->recommend = $request->recommend?1:0;
        $this->order = $request->order;
        $this->global_order = $request->global_order;
        $this->tutorial_id = $request->tutorial;
        $this->save();

        $this->categories()->sync($request->categories);

        if($request->favicon){
            $this->favicons()->sync([$request->favicon]);
        }else{
            $this->favicons()->detach();
        }

        return $this;
    }

    public function deleteItem()
    {
        Storage::disk('s3-pub-bizinabox')->delete('logotypes/previews/'.$this->hash.".".self::PREVIEW_EXTENSION);
        Storage::disk('s3-pub-bizinabox')->delete($this->path);

        $this->delete();
    }

    public function getDatatable($status)
    {
        switch($status)
        {
            case 'all':
                $logoTypes = $this::with('categories');
                break;
            case 'active':
                $logoTypes = $this::with('categories')
                    ->where('enabled', 1);
                break;
            case 'inactive':
                $logoTypes = $this::with('categories')
                    ->where('enabled', 0);
                break;
        }

        return Datatables::of($logoTypes)->addColumn('category', function($row) {
            $result = '';
            if($row->categories)
            {
                foreach($row->categories as $category)
                {
                    $result .= "<div class='my-1'><a href='#' class='c-badge c-badge-success'>" . $category->name . "</a></div>";
                }
            }
            return $result;
        })->addColumn('preview', function($row) {
            return "<a href='{$row->preview}' target='_blank'><img src='{$row->preview}' class='maxw-200'><a/>";
        })->editColumn('premium', function($row) {
            $result = '';
            if($row->premium==1)
            {
                $result .= '<span class="c-badge c-badge-success m-1">Premium</span><br>';
            }
            if($row->recommend==1)
            {
                $result .= '<span class="c-badge c-badge-info m-1">Recommended</span>';
            }
            return $result;
        })->editColumn('enabled', function($row) {
            if($row->enabled==1)
            {
                return '<span class="c-badge c-badge-success hover-handle">Active</span>
                        <a href="' . route('admin.logotypes.item.switch', $row->id) . '" class="h-cursor c-badge c-badge-danger d-none origin-none down-handle hover-box switchBtn" data-action="inactive">Inactive?</a>';
            }else{
                return '<span class="c-badge c-badge-danger hover-handle" >InActive</span>
                        <a href="' . route('admin.logotypes.item.switch', $row->id) . '" class="h-cursor c-badge c-badge-success d-none origin-none down-handle hover-box switchBtn" data-action="active">Active?</a>';
            }
        })->editColumn('created_at', function($row) {
            return $row->created_at->toDateString();
        })->addColumn('download', function($row) {
            return "<a href='".route('admin.logotypes.item.download', $row->hash)."'><i class='fa fa-download text-primary'></i></a>";
        })->addColumn('live_edit', function($row) {
            return '<a href="' . route('logotypes.choose', $row->id) . '" class="btn m-btn--sm m-btn--square btn-outline-info" target="_blank">
                        Test in Editor
                    </a>';
        })->addColumn('action', function($row) {
            return '

                    <a href="' . route('admin.logotypes.item.edit', $row->id) . '" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill tooltip_3" title="Edit">
                            <i class="la la-edit"></i>
                    </a>
                    <a href="' . route('admin.logotypes.item.delete', $row->id) . '" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill tooltip_3 deleteBtn" title="Delete">
                            <i class="la la-remove"></i>
                    </a>';

        })->rawColumns(['category','enabled', 'user', 'download', 'preview','premium', 'action', 'live_edit'])
            ->make(true);
    }

    public function filterItem($request)
    {
        try {

        }catch(\Exception $e)
        {
            return response()->json([
                'status'=>0,
                'data'=>[json_encode($e->getMessage())]
            ]);
        }
    }
}
