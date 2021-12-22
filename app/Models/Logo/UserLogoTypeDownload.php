<?php

namespace App\Models\Logo;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLogoTypeDownload extends Model
{
    use HasFactory;
    protected $table = "user_logo_type_downloads";

    protected $guarded = ["id", "created_at", "updated_at"];
}
