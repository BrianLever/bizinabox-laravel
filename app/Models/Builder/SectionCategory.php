<?php

namespace App\Models\Builder;

use Cviebrock\EloquentSluggable\Sluggable;
use App\Models\BaseModel;

class SectionCategory extends BaseModel
{
    use Sluggable;

    protected $connection = 'mysql';

    protected $table = 'section_categories';

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['sectionCount'];

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
        return $rule;
    }
    public function storeItem($request)
    {
        $this->name = $request->name;
        $this->description = $request->description;
        $this->status = $request->status?1:0;
        $this->recommended = $request->recommended?1:0;
        $this->save();
    }

    public function sections()
    {
        return $this->hasMany(Section::class, 'category_id');
    }

    public function getSectionCountAttribute(): int{
        return count($this->sections);
    }

    public function activeSections()
    {
        return $this->hasMany(Section::class, 'category_id')->where("status", 1);
    }
}
