<?php

namespace App\Http\Controllers\Admin\Favicon;

use App\Http\Controllers\Controller;
use App\Traits\FrontSetting;
use Illuminate\Http\Request;

class FrontController extends Controller
{
    use FrontSetting;
    public string $moduleName="favicon";
}
