<?php

namespace App\Models\Logo;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Illuminate\Support\Facades\Storage;

class BaseModel extends Model
{
    const CUSTOM_VALIDATION_MESSAGE = [

    ];

    public function getCreatedAtAttribute($value)
    {
        $result = Carbon::parse($value);
        if(\Auth::check())
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
        if(\Auth::check())
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
            Storage::disk('public')->putFileAs("", $file, $name);
            $file_url = $name;
        }else {

            if(!Storage::disk('public')->exists($path))
            {
                Storage::disk('public')->makeDirectory($path);
            }
            Storage::disk('public')->putFileAs($path, $file, $name);
            $file_url = $path."/".$name;
        }
        return Storage::disk('public')->url($file_url);

    }
    public static function generateSiteMap()
    {
        $sitemap  = Sitemap::create();
        $date = Carbon::now();
        $frequency = Url::CHANGE_FREQUENCY_WEEKLY;
        $mainUrls = [
            '/'=>1,
            '/categories'=>0.8,
            '/pricing'=>0.8,
            '/login'=>0.6,
            '/register'=>0.6,
            '/terms-of-service-agreement'=>0.4,
            '/privacy-policy'=>0.4,
            '/refund-policy'=>0.4,
            '/about-us'=>0.4,
            '/contact-us'=>0.4,
            '/blog'=>0.8,
            '/palette-ideas'=>0.8,
            '/blog/all-posts'=>0.6,
            '/blogAds'=>0.6,
        ];
        foreach($mainUrls as $url=>$point)
        {
            $sitemap->add(
                Url::create($url)
                    ->setPriority($point)
                    ->setLastModificationDate($date)
                    ->setChangeFrequency($frequency)
            );
        }
        //blog category
        $blogCategories = BlogCategory::where("status", 1)->get();
        foreach($blogCategories as $blogCategory)
        {
            $sitemap->add(
                Url::create(
                    self::removeRootUrl(
                        route('blog.category', $blogCategory->slug)
                    )
                )
                    ->setPriority(0.6)
                    ->setLastModificationDate($date)
                    ->setChangeFrequency($frequency)
            );
        }

        //blog Tags
        $blogTags = BlogTag::where("status", 1)->get();
        foreach($blogTags as $blogTag)
        {
            $sitemap->add(
                Url::create(
                    self::removeRootUrl(
                        route('blog.tag', $blogTag->slug)
                    )
                )
                    ->setPriority(0.6)
                    ->setLastModificationDate($date)
                    ->setChangeFrequency($frequency)
            );
        }
        //blog Posts

        $blogPosts = BlogPost::frontVisible()->get();
        foreach($blogPosts as $blogPost)
        {
            $sitemap->add(
                Url::create(
                    self::removeRootUrl(
                        route('blog.detail', $blogPost->slug)
                    )
                )
                    ->setPriority(0.4)
                    ->setLastModificationDate($date)
                    ->setChangeFrequency($frequency)
            );
        }

        $sitemap->writeToFile('sitemap.xml');

        $google_services = option("google_services", []);

        $google_services["sitemap_updated"] = now()->toDateString();

        option(["google_services"=>$google_services]);
    }
    public static function removeRootUrl($url)
    {
        $root = url('/');
        $result = str_replace($root, '', $url);
        if($result=='') return '/';
        else return $result;
    }
}
