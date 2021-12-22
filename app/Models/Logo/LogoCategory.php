<?php

namespace App\Models\Logo;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class LogoCategory extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'logo_categories';

    protected $guarded = ['id'];


    public function storeRule($request)
    {
        $rule['name']= 'required|max:45';
        $rule['description']= 'max:6000';
        $rule['thumbnail']= 'required';
        $rule['category_id'] = 'nullable|integer';
        return $rule;
    }

    public function logoTypes()
    {
        return $this->belongsToMany(LogoType::class, 'logo_category_types', 'category_id', 'logotype_id')->where('enabled', 1)->withPivot("order");
    }
    public function activeLogoTypes()
    {
        return $this->belongsToMany(LogoType::class, 'logo_category_types', 'category_id', 'logotype_id')
            ->withPivot("order")
            ->where('enabled', 1);
    }

    public function storeItem($request)
    {
        if ($request->category_id == null) {
            $category = $this;
        }else {
            $category = $this->findorfail($request->category_id);
        }
        $category->name = $request->name;
        $category->description = $request->description;
        $category->save();

        $thumbnail = json_decode($request->thumbnail)->output->image;
        $category->clearMediaCollection('thumbnail');
        $category->addMediaFromBase64($thumbnail)
            ->usingFileName(guid() . ".jpg")
            ->toMediaCollection('thumbnail');

        return $category;
    }

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('thumbnail')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(40)
                    ->height(40)
                    ->sharpen(10)
                    ->nonQueued();
            });
    }
}
