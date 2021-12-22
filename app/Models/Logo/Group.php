<?php

namespace App\Models\Logo;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Group extends BaseModel
{
    use HasFactory, Sluggable;
    protected $table = 'groups';
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function logoTypes()
    {
        return $this->belongsToMany(Logotype::class, "group_logotypes", "group_id", "logotype_id")->withPivot("main");
    }
}
