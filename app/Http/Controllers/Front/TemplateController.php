<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Builder\Template;
use App\Models\Builder\TemplateCategory;
use App\Models\Builder\TemplateFooter;
use App\Models\Builder\TemplateHeader;
use App\Models\Builder\TemplatePage;
use Illuminate\Http\Request;
use Session;

class TemplateController extends Controller
{
    public $model;

    public function __construct()
    {
        $this->model = new Template();
    }

    public function index(Request $request)
    {
        if($request->ajax())
        {
            $result = $this->model->filterTemplate($request);
            return response()->json($result);
        }

        $categories = TemplateCategory::select('id', 'slug', 'name', 'parent_id')
            ->with('approvedSubCategories')
            ->isParent()
            ->status(1)
            ->orderBy('order')
            ->get();
        return view('frontend.template.index', compact('categories'));

    }
    public function detail($slug)
    {
        $template = $this->model->where('slug', $slug)
            ->status(1)
            ->firstorfail(['header_id', 'id', 'footer_id', 'name', 'description', 'status', 'slug']);
        $headers = TemplateHeader::status(1)
            ->select('name', 'id')
            ->get();
        $footers = TemplateFooter::status(1)
            ->select('name', 'id')
            ->get();

        Session::forget('th'.$template->id);
        Session::forget('tf'.$template->id);

        return view('layouts.templateApp', compact("template", "headers", "footers"));

    }

    public function preview(Request $request, $slug, $url=null)
    {
        $template = $this->model->where('slug', $slug)->where('status', 1)->firstorfail();

        $header_id = Session::get('th'.$template->id, $template->header_id);
        $footer_id = Session::get('tf'.$template->id, $template->footer_id);

        if($request->hid!=null)
        {
            $header_id = $request->hid==0? null: $request->hid;
            Session::put('th'.$template->id, $header_id);
        }

        if($request->fid!=null)
        {
            $footer_id = $request->fid==0? null: $request->fid;
            Session::put('tf'.$template->id, $footer_id);
        }
        $template->header_id = $header_id;
        $template->footer_id = $footer_id;

        $template->load('header');
        $template->load('footer');

        $page = TemplatePage::where('url', $url)
            ->where('template_id', $template->id)
            ->where('status', 1)
            ->firstorfail();

        $sections = $page->sections;

        $data = optional($page->data);

        $preview = 0;
        if($page->type==='builder')
        {
            return view('preview.builder', compact('template', 'page', 'preview', 'header_id', 'footer_id', 'data','sections'));
        }else {
            return view('preview.box', compact('template', 'page', 'preview', 'header_id', 'footer_id', 'data','sections'));
        }
    }
    public function start($slug)
    {
        $template = $this->model->where('slug', $slug)->where('status', 1)->firstorfail();
        $header_id = Session::get('th'.$template->id, $template->header_id);
        $footer_id = Session::get('th'.$template->id, $template->footer_id);

        $template['template'] = $template;
        $template['header_id'] = $header_id;
        $template['footer_id'] = $footer_id;

        Session::put("template", $template);

        return redirect()->route('package.index')->with("success", "Great, please pick one package plan");
    }
}
