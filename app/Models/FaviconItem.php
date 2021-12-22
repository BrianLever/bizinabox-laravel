<?php

namespace App\Models;

use App\Models\Logo\Group;
use App\Models\Logo\LogoType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Yajra\DataTables\DataTables;

class FaviconItem extends Model
{


    protected $guarded = [];

    const STORAGE_DISK             = 's3-pub-bizinabox';
    const EXTENSION                = 'svg';
    const DIRECTORY                = 'favicons';
    const PREVIEW_DIRECTORY        = 'favicons/previews/';
    const PREVIEW_EXTENSION        = 'png';

    protected $appends = ['preview'];

    public function categories()
    {
        return $this->belongsToMany(FaviconCategory::class, 'favicon_item_categories', 'favicon_id', 'category_id');
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class, "group_favicons", "favicon_id", "group_id")->withPivot("main");
    }

    public function tutorial()
    {
        return $this->belongsTo(Tutorial::class, "tutorial_id")->where('status', 1)->withDefault();
    }

    public function logos(){
        return $this->belongsToMany(LogoType::class,'logo_favicon','favicon_id','logo_id');
    }

    public function getLogoAttribute(){
        if(count($this->logos)){
            return $this->logos->first();
        }
        return  null;
    }

    /**
     * @return bool|string
     */
    public function getContentAttribute()
    {
        $path = $this->path;

        $url = Storage::disk(self::STORAGE_DISK)->url($path);
        return file_get_contents($url);
    }

    public function getPreviewAttribute(): string
    {
        return Storage::disk(self::STORAGE_DISK)->url(self::PREVIEW_DIRECTORY.$this->hash.".".self::PREVIEW_EXTENSION);
    }
    public function updateItem($request)
    {
        if($request->preview_image)
        {
            $image = json_decode($request->preview_image)->output->image;
            $image = preg_replace('#^data:image/\w+;base64,#i', '', $image);
            $image = base64_decode($image);
            $name = $this->hash . ".".self::PREVIEW_EXTENSION;
            Storage::disk('s3-pub-bizinabox')->put(self::PREVIEW_DIRECTORY.$name, $image);
        }

        $this->name = $request->name;
        $this->status = $request->status?1:0;
        $this->premium = $request->premium?1:0;
        $this->recommend = $request->recommend?1:0;
        $this->order = $request->order;
        $this->global_order = $request->global_order;
//        $this->tutorial_id = $request->tutorial;
        $this->save();

        $this->categories()->sync($request->categories);

        return $this;
    }

    public function deleteItem()
    {
        Storage::disk(self::STORAGE_DISK)->delete(self::PREVIEW_DIRECTORY.'/'.$this->hash.".".self::PREVIEW_EXTENSION);
        Storage::disk(self::STORAGE_DISK)->delete($this->path);

        $this->delete();
    }

    public function getGroupFavicons()
    {
        $group = $this->groups->where("pivot.main", 1)->first();
        if($group)
        {
            session()->put("currentGroupId", $group->id);
        }else {
            $group = $this->groups->where("id", session("currentGroupId"))->first();
        }

        $groupFavicons =  FaviconItem::join("group_favicons", "favicon_items.id", "group_favicons.favicon_id")
            ->where("group_favicons.group_id", $group->id?? 0)
            ->where("favicon_items.status", 1)
            ->orderBy("favicon_items.global_order")
            ->orderBy("favicon_items.created_at")
            ->get("favicon_items.*");

        return $groupFavicons;
    }


    public function getDatatable($status)
    {
        switch($status)
        {
            case 'all':
                $favicons = $this::with('categories');
                break;
            case 'active':
                $favicons = $this::with('categories')
                    ->where('status', 1);
                break;
            case 'inactive':
                $favicons = $this::with('categories')
                    ->where('status', 0);
                break;
        }

        return Datatables::of($favicons)->addColumn('category', function($row) {
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
            return "<a href='{$row->preview}' target='_blank'><img src='{$row->preview}' class='maxw-100'><a/>";
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
        })->editColumn('status', function($row) {
            if($row->status==1)
            {
                return '<span class="c-badge c-badge-success hover-handle">Active</span>
                        <a href="' . route('admin.favicon.item.switch', $row->id) . '" class="h-cursor c-badge c-badge-danger d-none origin-none down-handle hover-box switchBtn" data-action="inactive">Inactive?</a>';
            }else{
                return '<span class="c-badge c-badge-danger hover-handle" >InActive</span>
                        <a href="' . route('admin.favicon.item.switch', $row->id) . '" class="h-cursor c-badge c-badge-success d-none origin-none down-handle hover-box switchBtn" data-action="active">Active?</a>';
            }
        })->editColumn('created_at', function($row) {
            return $row->created_at->toDateString();
        })->addColumn('download', function($row) {
            return "<a href='".route('admin.favicon.item.download', $row->hash)."'><i class='fa fa-download text-primary'></i>Download</a>";
        })->addColumn('live_edit', function($row) {
            return '<a href="' . route('favicon.choose', $row->id) . '" class="btn m-btn--sm m-btn--square btn-outline-info" target="_blank">
                        Test in Editor
                    </a>';
        })->addColumn('action', function($row) {
            return '

                    <a href="' . route('admin.favicon.item.edit', $row->id) . '" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill tooltip_3" title="Edit">
                            <i class="la la-edit"></i>
                    </a>
                    <a href="' . route('admin.favicon.item.delete', $row->id) . '" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill tooltip_3 deleteBtn" title="Delete">
                            <i class="la la-remove"></i>
                    </a>';

        })->rawColumns(['category','status', 'user', 'download', 'preview','premium', 'action', 'live_edit'])
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
