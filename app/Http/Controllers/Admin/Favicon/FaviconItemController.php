<?php

namespace App\Http\Controllers\Admin\Favicon;

use App\Http\Controllers\Controller;
use App\Models\FaviconCategory;
use App\Models\FaviconItem;
use App\Models\Tutorial;
use App\Repositories\FaviconRepository;
use App\Repositories\FontRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FaviconItemController extends Controller
{

    public object $model;
    public object $favicons;
    public object $fonts;
    public object $sortModel;

    public function __construct(FaviconItem $model, FaviconRepository $favicons, FontRepository $fonts)
    {

        $this->model = $model;
        $this->favicons = $favicons;
        $this->fonts = $fonts;
        $this->sortModel = $this->model->where("recommend", 1);

    }

    public function index()
    {

        if (request()->wantsJson()) {
            return $this->model->getDatatable(request()->get("status"));
        }

        return view('admin.favicon.items');

    }

    public function getSort(Request $request): object
    {
        try {
            $items = $this->sortModel->select('id', 'name')
                ->orderBy('order')
                ->get();

            $view = '';
            foreach ($items as $item) {
                $view .= '<li data-id="' . $item->id . '">' . $item->name . '</li>';
            }

            return $this->jsonSuccess($view);
        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function updateSort(Request $request)
    {
        try {
            $sorts = $request->get('sorts');
            foreach ($sorts as $key => $sort) {
                $item = $this->model->find($sort);
                $item->order = $key + 1;
                $item->save();
            }
            return $this->jsonSuccess();
        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function download($hash): object
    {
        return Storage::disk($this->model::STORAGE_DISK)->download("/favicons/{$hash}.svg");
    }

    public function create()
    {
        $categories = FaviconCategory::orderBy("order")
            ->get(['id', 'name']);

        $tutorials = Tutorial::where("status", 1)
            ->orderBy("title")
            ->get(['id', 'title', 'public', 'status', 'order', 'slug', 'category_id']);

        return view('admin.favicon.itemCreate', compact("categories", "tutorials"));
    }

    public function edit($id)
    {
        $favicon = $this->model->findorfail($id);
        $categories = FaviconCategory::orderBy("order")
            ->get(['id', 'name']);

        $tutorials = Tutorial::where("status", 1)
            ->orderBy("title")
            ->get(['id', 'title', 'public', 'status', 'order', 'slug', 'category_id']);

        return view('admin.favicon.itemEdit', compact("categories", "favicon", "tutorials"));
    }

    public function getFontName(Request $request)
    {
        try {
            $validation = Validator::make($request->all(), [
                'font' => 'required|file'
            ]);
            if ($validation->fails())
                return $this->jsonError($validation->errors());

            $font = $request->file('font');

            return $this->jsonSuccess($this->fonts->getFullFontName($font->getRealPath()));

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function storeRule($request)
    {
        $rule['svg_file'] = 'required|file|mimes:svg';
        $rule['preview_image'] = 'required|string';
        $rule['first_font'] = 'nullable|file';
        $rule['second_font'] = 'nullable|file';
        $rule['categories'] = 'required';
        $rule['categories.*'] = 'required|exists:favicon_categories,id';
        $rule['name'] = 'required|string|max:191';
        $rule['order'] = 'nullable|integer';
        $rule['global_order'] = 'nullable|integer';
        return $rule;
    }

    public function store(Request $request)
    {
        try {
            $validation = Validator::make($request->all(), $this->storeRule($request));

            if ($validation->fails())
                return $this->jsonError($validation->errors());

            ini_set('max_execution_time', 1200);

            // Get logo content
            $logotypeFile = $request->svg_file;
            $previewFile = $request->preview_image;

            // Get array fonts (if needed)
            $fonts = [
                $request->first_font,
                $request->second_font,
            ];

            // Add new logotype
            $logotype = $this->favicons->create([
                'favicon' => $logotypeFile,
                'preview' => $previewFile,
                'fonts' => $fonts,
                'request' => $request
            ]);

            $hasNewFonts = false;

            // Add new fonts
            foreach ($fonts as $fontFile) {
                if ($fontFile) {

                    $count = $this->fonts->create([
                        'font' => $fontFile,
                    ]);

                }
            }

            return $this->jsonSuccess(route('logotypes.choose', $logotype->hash));

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function updateRule($request)
    {
        $rule['preview_image'] = 'nullable|string';
        $rule['categories'] = 'required';
        $rule['name'] = 'required|string|max:191';
        $rule['categories.*'] = 'required|exists:favicon_categories,id';
        $rule['order'] = 'nullable|integer';
        $rule['global_order'] = 'nullable|integer';
//        $rule['tutorial'] = 'nullable|integer|exists:tutorials,id,status,1';
        return $rule;
    }

    public function update(Request $request, $id)
    {
        try {
            $favicon = $this->model->findorfail($id);
            $validation = Validator::make($request->all(), $this->updateRule($request));
            if ($validation->fails())
                return $this->jsonError($validation->errors());

            $favicon->updateItem($request);

            return $this->jsonSuccess();

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function delete($id)
    {
        try {
            $this->model->findorfail($id)->deleteItem();

            return $this->jsonSuccess();

        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }

    public function switch(FaviconItem $faviconItem)
    {
        try {
            $faviconItem->status = !$faviconItem->status;
            $faviconItem->save();
            return $this->jsonSuccess();
        } catch (\Exception $e) {
            return $this->jsonExceptionError($e);
        }
    }
}
