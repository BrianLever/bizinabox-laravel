<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PackageWebsiteProgress extends BaseModel
{

    protected $table = 'package_website_progress';
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $casts = [
        'data' => 'json',
    ];
    const CUSTOM_VALIDATION_MESSAGE = [

    ];

    public function package()
    {
        return $this->belongsTo(UserPackage::class, "package_id")->withDefault();
    }
}
