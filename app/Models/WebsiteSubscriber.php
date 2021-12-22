<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebsiteSubscriber extends SiteBaseModel
{
    protected $connection = 'mysql2';
    protected $table = 'subscribers';
    protected $guarded = ['id', 'created_at', 'updated_at'];
}
