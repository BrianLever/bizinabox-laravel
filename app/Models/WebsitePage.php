<?php

namespace App\Models;

use App\Models\Builder\PageSection;
use App\Models\Extensions\Sortable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations as Relations;
use Illuminate\Support\Str;

class WebsitePage extends Model
{
  use Sortable;

  protected $connection = 'mysql2';
  protected $table = 'pages';


  protected $casts = [
    'data' => 'json',
  ];

  protected $guarded = ['id', 'created_at', 'updated_at'];

  public function sections(): Relations\HasMany
  {
    return $this->hasMany(PageSection::class, 'page_id');
  }

  public function updateSections($request)
  {
    $sections = $this->sections;

    foreach ($sections as $section) {
      $section->delete();
    }

    foreach ($request->sections as $section) {
      $newSection = new PageSection();
      $newSection->page_id = $this->id;
      $newSection->name = $section['name'];
      $newSection->category_id = $section['category_id'];
      $newSection->data = $section['data'];
      $newSection->save();
    }
  }

  public function addSections($sections)
  {
    foreach ($sections as $section) {
      $newSection = new PageSection();
      $newSection->page_id = $this->id;
      $newSection->name = $section['name'];
      $newSection->category_id = $section['category_id'];
      $newSection->data = json_encode($section['data']);
      $newSection->save();
    }
  }

  public function replicatePage(): self
  {
    $clone = $this->replicate();
    $clone->name = $clone->replicateName();
    $clone->url = Str::slug($clone->name);
    $clone->push();

    foreach ($this->sections as $section) {
      PageSection::create($section->toArray());
    }

    $clone->save();

    return $clone;
  }

  protected function replicateName(): string
  {
    $name = preg_replace('/[\s$@_*]+/', ' ', $this->name);
    $name = preg_replace('/ \d$/', '', $name);
    $pageCount = self::where('web_id', $this->web_id)->where('name', 'like', $name . '%')->count();
    return $name . ' ' . $pageCount;
  }
}
