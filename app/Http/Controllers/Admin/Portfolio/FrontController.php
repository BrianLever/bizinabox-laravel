<?php

namespace App\Http\Controllers\Admin\Portfolio;

use App\Http\Controllers\Controller;
use App\Traits\FrontSetting;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class FrontController extends Controller
{

    use FrontSetting;
    public string $moduleName="portfolio";
    
}
