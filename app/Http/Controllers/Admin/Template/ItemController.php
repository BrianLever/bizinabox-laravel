<?php

namespace App\Http\Controllers\Admin\Template;

use App\Http\Controllers\Admin\AdminController;
use App\Models\Builder\SectionCategory;
use App\Models\Builder\Template;
use App\Models\Builder\TemplateCategory;
use App\Models\Builder\TemplateFooter;
use App\Models\Builder\TemplateHeader;
use App\Models\Builder\TemplatePage;
use App\Models\Builder\TemplatePageSection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;
use function Clue\StreamFilter\fun;

class ItemController extends AdminController
{
    public function __construct(Template $model)
    {
        $this->model = $model;
    }

    public function index()
    {

        if (request()->wantsJson()) {
            $templates = $this->model->with('category.category', 'media')->get();
            $activeTemplates = $templates->where('status', 1);
            $inactiveTemplates = $templates->where('status', 0);

            $all = view('components.admin.templateItem', [
                'templates' => $templates,
                'selector' => 'datatable-all'
            ])->render();

            $active = view('components.admin.templateItem', [
                'templates' => $activeTemplates,
                'selector' => 'datatable-active'
            ])->render();

            $inactive = view('components.admin.templateItem', [
                'templates' => $inactiveTemplates,
                'selector' => 'datatable-inactive'
            ])->render();

            $count['all'] = $templates->count();
            $count['active'] = $activeTemplates->count();
            $count['inactive'] = $inactiveTemplates->count();

            return response()->json([
                'status' => 1,
                'all' => $all,
                'active' => $active,
                'inactive' => $inactive,
                'count' => $count
            ]);
        }

        $categories = TemplateCategory::where('parent_id', '==', 0)
            ->select('id', 'name')
            ->with('approvedSubCategories')
            ->status(1)
            ->get();
        $headers = TemplateHeader::select('id', 'name')
            ->status(1)->get();

        $footers = TemplateFooter::select('id', 'name')
            ->status(1)->get();

        return view(self::$viewDir . 'templates.item', compact('categories', 'headers', 'footers'));
    }

    public function store(Request $request)
    {
        try {
            $validation = Validator::make($request->all(), $this->model->storeRule(), $this->model::CUSTOM_VALIDATION_MESSAGE);
            if ($validation->fails()) return response()->json(['status' => 0, 'data' => $validation->errors()]);

            $request->merge(['status' => $request->status ? 1 : 0]);
            $request->merge(['featured' => $request->featured ? 1 : 0]);

            $data = $request->only('category_id', 'header_id', 'footer_id', 'name', 'description', 'status', 'featured', 'css', 'script', 'data', 'version');
            $data = $this->model->create($data);

            $page = new TemplatePage();
            $page->template_id = $data->id;
            $page->parent_id = 0;
            $page->name = 'Home';
            $page->url = null;
            $page->status = 1;

            $page->save();

            return response()->json(['status' => 1, 'data' => $data]);

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function edit($id)
    {
        $template = $this->model->findorfail($id);

        $categories = TemplateCategory::where('parent_id', '==', 0)
            ->with('approvedSubCategories')
            ->status(1)
            ->get(['id', 'name']);

        $headers = TemplateHeader::status(1)->get(['id', 'name']);

        $footers = TemplateFooter::status(1)->get(['id', 'name']);

        return view(self::$viewDir . "templates.editItem", compact('template', 'categories', 'headers', 'footers'));
    }

    public function v2View($slug): object
    {
        if (\request()->wantsJson()) {
            $template = $this->model->where('slug', $slug)->with(['pages' => function ($query) {
                $query->orderBy('order');
            }])->first();
            return $this->jsonSuccess([
                'template' => $template
            ]);
        }
        $template = $this->model->where('slug', $slug)->with('pages')->first();
        return view('preview.v2', compact('template'));
    }

    public function preview($slug, $url = null)
    {

        $template = $this->model->where('slug', $slug)->with('pages')->first();

        if ($template->version === 1) {
            $preview = 1;
            $page = TemplatePage::where('url', $url)->where('template_id', $template->id)->firstorfail();
            $sections = TemplatePageSection::where('page_id', $page->id)->get();

            $data = optional($page->data);

            if ($page->type === 'builder') {
                return view('preview.builder', compact('template', 'page', 'preview', 'data', 'sections'));
            } else {
                return view('preview.box', compact('template', 'page', 'preview', 'data', 'sections'));
            }
        }

        return view('preview.v2', compact('template'));

    }

    public function update(Request $request, $id)
    {
        try {

            $validation = Validator::make($request->all(), $this->model->updateRule(), $this->model::CUSTOM_VALIDATION_MESSAGE);

            if ($validation->fails()) return response()->json(['status' => 0, 'data' => $validation->errors()]);

            $request->merge(['status' => $request->status ? 1 : 0]);
            $request->merge(['featured' => $request->featured ? 1 : 0]);
            $request->merge(['new' => $request->new ? 1 : 0]);

            $data = $request->only('category_id', 'header_id', 'footer_id', 'name', 'description', 'status', 'featured', 'new', 'css', 'script', 'data');
            $item = $this->model->find($id);
            $item->update($data);

            if ($request->image) {
                $item->clearMediaCollection('preview')
                    ->addMediaFromRequest('image')
                    ->usingFileName(guid() . "." . $request->image->getClientOriginalExtension())
                    ->toMediaCollection('preview');
            }

            return response()->json(['status' => 1, 'data' => $data]);

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function editPages($id): View|JsonResponse
    {

        if (\request()->wantsJson()) {

            $template = $this->model::where('id', $id)->with(['pages' => function ($query) {
                return $query->orderBy('order');
            }])->first();

            $categories = SectionCategory::withCount('sections')
                ->where("status", 1)
                ->orderBy("name")
                ->with(['sections' => function ($query) {
                    $query->with(['category' => function ($query) {
                        $query->with('sections');
                    }]);
                }])
                ->get(['id', 'name', 'slug', 'description', 'recommended', 'sections_count']);

            return $this->jsonSuccess([
                'template' => $template,
                'categories' => $categories
            ]);
        }

        $template = $this->model::where('id', $id)->first();
        return view(self::$viewDir . "templates.editPage", compact("template"));
    }

    public function getTemplatePreviewData($id): object
    {
        $template = $this->model->where('id', $id)->with(['pages' => function ($query) {
            $query->orderBy('order');
        }])->first();
        return $this->jsonSuccess([
            'template' => $template
        ]);
    }
}
