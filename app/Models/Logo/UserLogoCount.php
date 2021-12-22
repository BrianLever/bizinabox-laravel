<?php

namespace App\Models\Logo;


use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserLogoCount extends BaseModel
{
    use HasFactory;

    protected $table = "user_logo_counts";

    protected $guarded = ["id", "created_at", "updated_at"];

    public function getFreeCount()
    {
        if($this->free_unlimit)
        {
            return "Unlimited";
        }else {
            $count = $this->free_limit - $this->free_current + user()->free_count;
            return $count>0? $count:0;
        }
    }
    public function getPremiumCount()
    {
        if($this->premium_unlimit)
        {
            return "Unlimited";
        }else {
            $count = $this->premium_limit - $this->premium_current;
            return $count>0? $count:0;
        }
    }
}
