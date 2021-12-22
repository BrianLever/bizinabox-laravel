<?php

namespace App\Models;
use GeneaLabs\LaravelModelCaching\Traits\Cachable;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BaseModel extends Model
{

    use Cachable;

    const CUSTOM_VALIDATION_MESSAGE = [

    ];

    public function getCreatedAtAttribute($value)
    {
        $result = Carbon::parse($value);
        if(Auth::check())
        {
            $result->setTimezone(user()->timezone)
                ->format(user()->timeformat);
            return $result;
        }else {
            return $result;
        }
    }
    public function getUpdatedAtAttribute($value)
    {
        $result = Carbon::parse($value);
        if(Auth::check())
        {
            $result->setTimezone(user()->timezone)
                ->format(user()->timeformat);
            return $result;
        }else {
            return $result;
        }
    }
    public function toUserTimezone($value=null)
    {
        if($value==null)
        {
            $result = Carbon::now();
        }else {
            $result = Carbon::parse($value);
        }
        if($this->timezone)
        {
            $result->setTimezone($this->timezone);
            if($this->timeformat)
            {
                $result->format($this->timeformat);
            }
            return $result;
        }else {
            return $result;
        }
    }
    public function scopeMy($query, $user_id=null)
    {
        if($user_id)
        {
            return $query->where('user_id', $user_id);
        }else {
            return $query->where('user_id', user()->id);
        }
    }
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }
    public function findbySlug($slug)
    {
        return $this->where('slug', $slug)->firstorfail();
    }

    public function getLinks()
    {
        if($this->links!==null)
        {
            return json_decode($this->links);
        }else {
            return [];
        }
    }
    public function slugToModel($item)
    {
        if($item=='lacarte')
        {
            return 'App\Models\Lacarte';
        }elseif($item=='module')
        {
            return 'App\Models\Module';
        }elseif($item=='plugin')
        {
            return 'App\Models\Plugin';
        }elseif($item=='package')
        {
            return 'App\Models\Package';
        }elseif($item=='readymade')
        {
            return 'App\Models\Package';
        }elseif($item=='service')
        {
            return 'App\Models\Service';
        }elseif($item=='portfolio')
        {
            return 'App\Models\Portfolio';
        }elseif($item=='blogAds')
        {
            return 'App\Models\BlogAdsSpot';
        }elseif($item=='blogPackage')
        {
            return 'App\Models\BlogPackage';
        }else {
            return '';
        }
    }
    public function modelToSlug($item)
    {
        if($item=='App\Models\Lacarte')
        {
            return 'lacarte';
        }elseif($item=='App\Models\Module')
        {
            return 'module';
        }elseif($item=='App\Models\Plugin')
        {
            return 'plugin';
        }elseif($item=='App\Models\Package')
        {
            return 'package';
        }elseif($item=='App\Models\Package')
        {
            return 'readymade';
        }elseif($item=='App\Models\Service')
        {
            return 'service';
        }elseif($item=='App\Models\BlogPackage')
        {
            return 'blogPackage';
        }elseif($item=='App\Models\BlogAdsSpot')
        {
            return 'blogAds';
        }else {
            return '1';
        }
    }
    public function userModelToName($item)
    {
        if($item=='App\Models\UserLacarte')
        {
            return 'A Lacarte';
        }elseif($item=='App\Models\UserPlugin')
        {
            return 'Plugin';
        }elseif($item=='App\Models\UserPackage')
        {
            return 'Package';
        }elseif($item=='App\Models\UserService')
        {
            return 'Service';
        }elseif($item=='App\Models\UserBlogPackage')
        {
            return 'Blog package';
        }else {
            return '';
        }
    }
    public function nameToUserProduct($item)
    {
        if($item=='lacarte')
        {
            return 'App\Models\UserLacarte';
        }elseif($item=='plugin')
        {
            return 'App\Models\UserPlugin';
        }elseif($item=='service')
        {
            return 'App\Models\UserService';
        }elseif($item=='blog')
        {
            return 'App\Models\UserBlogPackage';
        }elseif($item=='blogPackage')
        {
            return 'App\Models\UserBlogPackage';
        }elseif($item=='blogAds')
        {
            return 'App\Models\BlogAdsListing';
        }else
        {
            return 'App\Models\UserPackage';
        }
    }

    public static function fileUpload($file, $name, $path=null)
    {
        if($path==null)
        {
            Storage::putFileAs("", $file, $name);
            $file_url = $name;
        }else {

            if(!Storage::exists($path))
            {
                Storage::makeDirectory($path);
            }
            Storage::putFileAs($path, $file, $name);
            $file_url = $path."/".$name;
        }
        return Storage::url($file_url);

    }

    public function renderView(): string{
        return '';
    }

    public function tableData(): array{
        return [];
    }
}
