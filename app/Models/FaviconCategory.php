<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class FaviconCategory extends BaseModel implements HasMedia
{
    use InteractsWithMedia, Sluggable;

    protected $appends = ['thumbnail'];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function rule(): array{
        $rule['thumbnail'] = 'required';
        $rule['name'] = 'required|string';
        return $rule;
    }

    public function store($request){
        $this->name = $request->name;
        $this->description = $request->description;
        $this->save();

        $this->clearMediaCollection('thumbnail')
            ->addMediaFromBase64(json_decode($request->thumbnail)->output->image)
            ->usingFileName(guid() . ".jpg")
            ->toMediaCollection('thumbnail');

    }

    public function getThumbnailAttribute(){
        return $this->getFirstMediaUrl('thumbnail');
    }

    public function favicons(){
        return $this->belongsToMany(FaviconItem::class,'favicon_item_categories','category_id','favicon_id');
    }

    public function getFaviconCountAttribute()
    {
        return $this->favicons->count();
    }

    public function dataTableRow(){
        $item = $this;
        return [
            '',
            '<input type="checkbox" class="select-item" data-id="'.$item->id.'"/>',
            '<img src="'.$item->thumbnail.'" class="img-80 img-bordered" />',
            $item->name,
            $item->description,
            "<span>".$item->faviconCount." Icons</span> <br/> <a href='javascript:void(0)' class='sort-order'  data-id='".$item->id."'>Sort Order</a>",
            $item->order,
            date('Y-m-d', strtotime($item->created_at)),
            "<button data-item='".$item."' class='btn btn-sm btn-outline-success edit-item'>
               <i class='la la-edit'></i> Edit
            </button>
            <button data-id='".$item->id."' class='btn btn-sm btn-outline-danger delete-item'>
               <i class='la la-trash-o'></i> Delete
            </button>"
        ];
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
