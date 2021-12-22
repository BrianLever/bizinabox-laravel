<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class EmailCategory extends BaseModel implements HasMedia
{
    use Sluggable, InteractsWithMedia;

    protected $table = 'email_categories';

    protected $guarded = ['id', 'created_at', 'updated_at'];

    const CUSTOM_VALIDATION_MESSAGE = [

    ];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function storeRule($request)
    {
        $rule['name']= 'required|max:45';
        $rule['description']= 'max:6000';
        if($request->category_id)
        {
            $rule['category_id'] = 'integer';
        }else {
            $rule['thumbnail']= 'required';
        }
        return $rule;
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
        $category->status = $request->status?1:0;
        $category->save();

        if($request->thumbnail)
        {
            $category->clearMediaCollection('image');
            $category->addMediaFromBase64($request->thumbnail)
                ->usingFileName(guid() . ".jpg")
                ->toMediaCollection('image');
        }
        return $category;
    }

    public function templates()
    {
        return $this->hasMany(EmailTemplate::class, 'category_id');
    }
    public function approvedTemplates()
    {
        return $this->hasMany(EmailTemplate::class, 'category_id')->where("status", 1);
    }
    public function subscribers()
    {
        return $this->belongsToMany(Subscriber::class, 'unsubscribe_category', 'category_id', 'subscriber_id')->where("status", 1);
    }
    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(60)
            ->height(40)
            ->sharpen(10)
            ->nonQueued();
    }
}
