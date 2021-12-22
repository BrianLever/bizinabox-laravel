<?php

namespace App\Models\Builder;

use App\Models\Extensions\Sortable;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use App\Models\BaseModel;
use \Illuminate\Database\Eloquent\Relations as Relations;

class TemplatePage extends BaseModel implements HasMedia
{

    use InteractsWithMedia, Sortable;

    protected $table = 'template_pages';

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $casts = [
        'data' => 'json',
    ];

    const CUSTOM_VALIDATION_MESSAGE = [
        'url.unique:' => 'Url parameter should be unique within template.',
    ];

    public function storeRule($request, $template_id): array
    {
        $rule['page_name']= 'required|max:255';
        $rule['parent_id']= 'required|integer';

        if($request->url)
        {
            $url_rule = 'alpha_dash|';
        }else {
            $url_rule = '';
        }
        if($request->page_id)
        {
            $rule['url']= $url_rule.'max:255|unique:template_pages,url,' . $request->page_id . ',id,template_id,'.$template_id;
        }else {
            $rule['url']= $url_rule.'max:255|unique:template_pages,url,null,null,template_id,'.$template_id;
        }
        return $rule;
    }

    public function createPage($request, $template_id): self
    {
        if($request->page_id)
        {
            $model = $this->where('id', $request->page_id)->first();
        }else {
            $model = $this;
        }

        $model->template_id = $template_id;
        $model->parent_id = $request->parent_id;
        $model->name = $request->page_name;
        $model->url = $request->url ?? Str::slug($request->page_name, '-');
        $model->css = $request->page_css;
        $model->script = $request->page_script;
        $model->status = $request->page_status? 1:0;
        $model->save();

        $model->assignOrder();
        $model->save();

        return $model;
    }

    public function template():  Relations\BelongsTo
    {
        return $this->belongsTo(Template::class, 'template_id');
    }

    public function sections():  Relations\HasMany
    {
        return $this->hasMany(TemplatePageSection::class,'page_id');
    }

    public function parent()
    {
        return $this->belongsTo(TemplatePage::class, 'parent_id')->withDefault();
    }
    public function subPages()
    {
        return $this->hasMany(TemplatePage::class, 'parent_id');
    }
    public function activeSubPages()
    {
        return $this->hasMany(TemplatePage::class, 'parent_id')->with('activeSubPages')->status(1)->orderBy('order');
    }
    public function dropDown($preview)
    {
        $menu = '';
        if($this->activeSubPages->count()!==0)
        {
            $menu .= "<ul class='sub-drop-down'>";
            foreach($this->activeSubPages as $active)
            {
                $menu .= '<li class="sub-menu-item"><a class="sub-menu-link" href="' . $active->getUrl($preview) . '">' . $active->name . '</a>' . $active->dropDown($preview) . '</li>';
            }
            $menu .= '</ul>';
        }
        return $menu;
    }
    public function getUrl($preview)
    {
        if($preview===1)
        {
            return route('admin.template.item.preview', ['slug'=>$this->template->slug, 'url'=>$this->url]);
        }else {
            return route('template.preview', ['slug'=>$this->template->slug, 'url'=>$this->url]);
        }
    }

    public function updateSections($request){
        $sections = $this->sections;
        foreach ($sections as $section){
            $section->delete();
        }

        foreach ($request->sections as $section){
            $newSection = new TemplatePageSection();
            $newSection->page_id = $this->id;
            $newSection->name = $section['name'];
            $newSection->category_id = $section['category_id'];
            $newSection->data = $section['data'];
            $newSection->save();
        }
    }

    public function replicatePage(): self{

        $clone = $this->replicate();
        $clone->name = self::replicateName($clone->name);
        $clone->url = Str::slug($clone->name);
        $clone->push();

        foreach($this->sections as $section)
        {
            $clone->sections()->create($section->toArray());
        }

        $clone->save();

        return $clone;
    }

    protected static function replicateName($name){
        $name = preg_replace('/[\s$@_*]+/', ' ', $name);
        $name = preg_replace('/ \d$/', '', $name );
        $pages = self::where('name','like',$name.'%')->get();
        return $name.' '.count($pages);
    }
}
