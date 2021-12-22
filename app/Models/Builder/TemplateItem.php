<?php

namespace App\Models\Builder;

use Cviebrock\EloquentSluggable\Sluggable;
use App\Models\BaseModel;

class TemplateItem extends BaseModel
{
    use Sluggable;

    protected $table = 'template_items';

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

}
