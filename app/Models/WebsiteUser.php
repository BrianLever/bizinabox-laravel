<?php

namespace App\Models;

class WebsiteUser extends BaseModel
{
    protected $connection = 'mysql2';
    protected $table = 'users';

    protected $guarded = ['id', 'created_at', 'updated_at'];


    public function profileUpdateRule($id)
    {
        $rule['owner_email'] = 'required|email|max:45|unique:mysql2.users,email,'.$this->id.',id,web_id,' . $id;
        $rule['owner_password'] = 'nullable|string|min:8|max:45';
        return $rule;
    }

}
