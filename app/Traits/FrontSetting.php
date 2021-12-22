<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

const DISK = "public";
const DIRECTORY = 'uploads';

trait FrontSetting {

    public function index(): \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Contracts\Foundation\Application
    {
        $seo = option($this->moduleName.".front.seo",[]);
        return view("admin.{$this->moduleName}.front", compact("seo"));
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        if($request->headerImage){
            $headerImageName = option("{$this->moduleName}.front.header.image","");
            $headerImageThumbName = option("{$this->moduleName}.front.header.image.thumb","");
            clearUploadFiles([$headerImageName, $headerImageThumbName]);

            [$headerImageName, $headerImageThumbName] = $this->saveImage($request->headerImage);

            option([
                "{$this->moduleName}.front.header.image"=> $headerImageName,
                "{$this->moduleName}.front.header.image.thumb"=> $headerImageThumbName,
            ]);
        }

        $seo = [
            "title"=>$request->title??"",
            "keywords"=>$request->keywords??"",
            "description"=>$request->description??"",
            "image" => option("{$this->moduleName}.front.seo")['image']??'',
        ];

        if($request->boxImage){

            $boxImageName = option("{$this->moduleName}.front.box.image","");
            $boxImageThumbName = option("{$this->moduleName}.front.box.image.thumb","");
            clearUploadFiles([$boxImageName, $boxImageThumbName]);

            [$boxImageName, $boxImageThumbName] = $this->saveImage($request->boxImage);

            option([
                "{$this->moduleName}.front.box.image"=> $boxImageName,
                "{$this->moduleName}.front.box.image.thumb"=> $boxImageThumbName,
            ]);
        }

        if($request->image){
            $seoImageName = option("{$this->moduleName}.front.seo")["image"]??"";
            clearUploadFiles([$seoImageName]);

            $file = $request->file("image");
            $seoImageName =DIRECTORY.'/'.guid().".".$file->getClientOriginalExtension();

            $file->move(Storage::disk(DISK)->path(DIRECTORY), $seoImageName);
            $seo = array_merge($seo, ["image"=>$seoImageName]);
        }

        option(["{$this->moduleName}.front.seo" => $seo]);

        return $this->jsonSuccess();
    }

    private function saveImage($image): array{
        $imageName = $this->newFileName();
        $thumbName = $this->newFileName();

        $image = json_decode($image)->output->image;

        $image = preg_replace("/data:image\/((jpeg)|(png)|(jpg)|(gif));base64,/i","",$image);
        Storage::disk(DISK)->put($imageName, base64_decode($image));
        $path = Storage::disk(DISK)->path($imageName);

        Image::make($path)->resize(40, 40)->save(Storage::disk(DISK)->path($thumbName));

        return [$imageName, $thumbName];
    }

    private function newFileName(): string
    {
        return DIRECTORY.DIRECTORY_SEPARATOR.guid().'.'.'png';
    }
}
