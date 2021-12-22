<?php

namespace App\Http\Controllers\Admin\Directory;

use App\Http\Controllers\Admin\AdminController;
use App\Traits\FrontSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class FrontController extends AdminController
{
    use FrontSetting;
    public string $moduleName="directory";
}
