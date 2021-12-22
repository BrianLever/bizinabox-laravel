<?php

namespace App\Models\Builder;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class PageSection extends Model
{
    use HasFactory;

    protected $connection = 'mysql2';

    protected $table = 'page_sections';

    protected $guarded = ['id'];

    public function category(): Relations\BelongsTo{
        return $this->belongsTo(SectionCategory::class,'category_id');
    }

    public function getDataAttribute($value){
        return json_decode($value);
    }
}
