<?php

namespace App\Models\Builder;

use Illuminate\Database\Eloquent\Model;

class TemplatePageSection extends Model
{
    protected $fillable = [
        'page_id', 'category_id', 'name', 'data'
    ];

    public function category(){
        return $this->belongsTo(SectionCategory::class,'category_id');
    }

    public function getDataAttribute($value){
        return json_decode($value);
    }

}
