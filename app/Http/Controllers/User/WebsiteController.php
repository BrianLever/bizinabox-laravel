<?php

namespace App\Http\Controllers\User;

use App\Models\Builder\SectionCategory;
use App\Models\Domain;
use App\Models\DomainConnect;
use App\Models\DomainCustom;
use App\Models\Module;
use App\Models\PackageWebsiteProgress;
use App\Models\Builder\Template;
use App\Models\Builder\TemplateCategory;
use App\Models\Builder\TemplateFooter;
use App\Models\Builder\TemplateHeader;
use App\Models\UserPackage;
use App\Models\Website;
use App\Models\WebsiteFooter;
use App\Models\WebsiteHeader;
use App\Models\WebsiteModule;
use App\Models\WebsitePage;
use App\Rules\FQDN;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;

class WebsiteController extends UserController
{
  public function __construct(Website $model)
  {
    $this->model = $model;
  }

  public function gettingStarted()
  {
    $userPackages = UserPackage::where("user_id", user()->id)
      ->with("websites", "progresses")
      ->where("status", "active")
      ->get();


    $packages = [];
    foreach ($userPackages as $userPackage) {
//            $possibleCount = $userPackage->website - $userPackage->websites->count();
      $possibleCount = $userPackage->website - $userPackage->current_website;
      if ($userPackage->website == -1 || $possibleCount > 0) {
        $userPackage->newCount = $possibleCount - $userPackage->progresses->count();
        array_push($packages, $userPackage);
      }
    }

    $headers = TemplateHeader::status(1)
      ->select('name', 'id')
      ->get();
    $footers = TemplateFooter::status(1)
      ->select('name', 'id')
      ->get();

    $categories = TemplateCategory::select('id', 'slug', 'name', 'parent_id')
      ->with('approvedSubCategories')
      ->isParent()
      ->status(1)
      ->orderBy('order')
      ->get();

    $moduleArray = Module::status(1)->get(["id", "slug", "name", "featured"])->toArray();
    $moduleJson = json_encode($moduleArray);
    $module_wishes = session("module_wishes", []);
    return view(self::$viewDir . "website.started", compact("packages", "categories", "headers", "footers", "moduleJson", "module_wishes"));
  }

  public function saveStep(Request $request)
  {
    try {
      $userPackage = UserPackage::where("user_id", user()->id)
        ->with("websites")
        ->where("status", "active")
        ->whereId($request->package)
        ->firstorfail();

      if ($request->progress) {
        $progress = PackageWebsiteProgress::whereId($request->progress)
          ->where("package_id", $userPackage->id)
          ->firstorfail();
        $data = $progress->data;
      } else {
        $progress = new PackageWebsiteProgress();
        $progress->package_id = $userPackage->id;
      }
      $progress->step = $request->step;
      $data['name'] = $request->name;
      $data['template'] = $request->template;
      $data['header'] = $request->header;
      $data['footer'] = $request->footer;
      $data['domain_type'] = $request->domain_type;
      $data['domain'] = $request->domain;
      $data['subdomain'] = $request->subdomain;
      $data['modules'] = $request->modules;
      $data['credentials'] = $request->credentials;
      $data['email'] = $request->email;
      $data['password'] = $request->password;
      $data['status'] = $request->status;
      $progress->data = $data;
      $progress->save();

      return $this->jsonSuccess($progress->id);

    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function getTemplates(Request $request)
  {
    try {
      $template = new Template();
      $templates = $template->getTemplate($request, 12);
      $view = view("components.user.websiteTemplate", compact("templates"))->render();

      return $this->jsonSuccess($view);

    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function previewTemplate(Request $request)
  {
    try {
      $template = Template::whereId($request->id)
        ->status(1)
        ->firstorfail(['header_id', 'id', 'footer_id', 'name', 'description', 'status', 'slug']);

      $view = view("components.user.websitePreview", compact("template"))->render();
      return $this->jsonSuccess($view);

    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function getDomains()
  {
    try {
      $domains = Domain::where('user_id', user()->id)
        ->whereNull('web_id')
        ->orderBy('status')
        ->get(['name', 'user_id', 'pointed', 'status', 'expired_at', 'created_at', 'id']);

      $view = view("components.user.websiteDomain", compact("domains"))->render();
      return $this->jsonSuccess($view);

    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function getModuleFeatures(Request $request)
  {
    try {
      $module = Module::with("media")->where("id", $request->id)
        ->where("status", 1)
        ->firstorfail();

      $view = view("components.user.websiteModuleFeature", compact("module"))->render();
      $data['view'] = $view;
      $data['feature'] = $module->description;
      return $this->jsonSuccess($data);

    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function index()
  {
    $activeWebsites = $this->model->with("package")
      ->where("user_id", user()->id)
      ->where("status", "active")
      ->latest()
      ->get();
    $pendingWebsites = $this->model->with("package")
      ->where("user_id", user()->id)
      ->where("status", "!=", "active")
      ->latest()
      ->get();
    return view(self::$viewDir . "website.index", compact("activeWebsites", "pendingWebsites"));
  }

  public function create()
  {
    $packages = UserPackage::where("user_id", user()->id)
      ->with("websites")
      ->where("status", "active")
      ->get();
    return view(self::$viewDir . "website.select", compact("packages"));
  }

  public function select($id)
  {
    $package = UserPackage::where("user_id", user()->id)
      ->whereId($id)
      ->firstorfail();

    if ($package->website != -1 && $package->website - $package->websites->count() == 0) {
      abort(404);
    }
    $templateModel = new Template();
    $templates = $templateModel->approvedAllTemplatesQuery()->status(1)
      ->select('id', 'name', 'slug', "header_id", "footer_id")
      ->with('media')
      ->get();

    $headers = TemplateHeader::status(1)->get(['id', 'name']);
    $footers = TemplateFooter::status(1)->get(['id', 'name']);

    $domains = Domain::where('user_id', user()->id)
      ->select('name', 'user_id', 'pointed', 'status', 'expired_at', 'created_at', 'id')
      ->whereNull('web_id')
      ->orderBy('status')
      ->get();

    $modules = Module::status(1)->get(['id', 'name', 'slug', 'description', 'new', 'featured']);

    return view(self::$viewDir . "website.create", compact("package", "templates", "domains", "headers", "footers", "modules"));

  }

  public function submit(Request $request)
  {
    try {

      $package = UserPackage::where("user_id", user()->id)
        ->where("id", $request->package)
        ->firstorfail();

      if ($package->remain_website < 1) {
        return $this->jsonError(["Your package already has full numbers of websites."]);
      }

      $module_slugs = json_decode($request->modules);

      $modules = Module::whereIn("slug", $module_slugs)
        ->where("status", 1)
        ->get();

      $module_counts = $modules->count();
      $featured_counts = $modules->where("featured", 1)->count();

      if ($package->module != -1 && ($package->module - $module_counts) < 0)
        return $this->jsonError(['Your max module limit count is ' . $package->module]);
      if ($package->featured_module != -1 && ($package->featured_module - $featured_counts) < 0)
        return $this->jsonError(['Your max featured module limit count is ' . $package->featured_module]);

      $validation = Validator::make($request->all(), $this->model->storeUserRule($request));

      if ($validation->fails())
        return $this->jsonError($validation->errors());

      $website = $this->model->storeUserWebsite($request, $package, $modules);

      try {
        \Http::get("//{$website->domain}");
      } catch (\Exception $e) {
        \Log::info(json_encode($e->getMessage()));
      }

      $view = view("user.website.launch", compact("website"))->render();

      return $this->jsonSuccess($view);

    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function store(Request $request, $id)
  {
    try {
      $package = UserPackage::where("user_id", user()->id)
        ->whereId($id)
        ->firstorfail();

      if ($package->website != -1 && $package->website - $package->websites->count() == 0) {
        return $this->jsonError(["Your package already has full numbers of websites."]);
      }

      $module_ids = $request->modules;

      $modules = Module::whereIn("id", $module_ids)->where("status", 1)->get();

      $module_counts = $modules->count();
      $featured_counts = $modules->where("featured", 1)->count();

      if ($package->module != -1 && ($package->module - $module_counts) < 0) return response()->json(['status' => 0, 'data' => ['Your max module limit count is ' . $package->module]]);
      if ($package->featured_module != -1 && ($package->featured_module - $featured_counts) < 0) return response()->json(['status' => 0, 'data' => ['Your max featured module limit count is ' . $package->featured_module]]);

      $validation = Validator::make($request->all(), $this->model->storeUserRule($request));
      if ($validation->fails()) return response()->json(['status' => 0, 'data' => $validation->errors()]);

      $template = Template::whereId($request->template)->where("status", 1)->firstorfail();
      $c_header = TemplateHeader::status(1)->whereId($request->header)->first();
      $c_footer = TemplateFooter::status(1)->whereId($request->footer)->first();

      $website = $this->model->storeUserWebsite($request, $template, $package);

      try {
        \Http::get("//{$website->domain}");
      } catch (\Exception $e) {
        \Log::info(json_encode($e->getMessage()));
      }

      $header = new WebsiteHeader();
      $header->create([
        'web_id' => $website->id,
        'content' => $c_header->content ?? '',
        'css' => $c_header->css ?? '',
        'script' => $c_header->script ?? '',
      ]);

      $footer = new WebsiteFooter();
      $footer->create([
        'web_id' => $website->id,
        'content' => $c_footer->content ?? '',
        'css' => $c_footer->css ?? '',
        'script' => $c_footer->script ?? '',
        'mainCss' => $c_footer->mainCss ?? '',
        'sectionCss' => $c_footer->sectionCss ?? '',
      ]);

      $website->createModules($modules);

      $website->createPages($template->approvedPages);

      $website->createAdmin($request, user()->id);

      return $this->jsonSuccess($website);
    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function edit($id)
  {
    $website = Website::with("activeModules")
      ->my()
      ->whereId($id)
      ->firstorfail();

    if ($website->status != 'active') {
      return back()->with("error", "Sorry, website package is expired or website is banned");
    }
    $modules = Module::where("status", 1)->get(['name', 'slug', 'featured', 'id']);
    return view(self::$viewDir . "website.edit", compact("website", "modules"));
  }

  /**
   * @param Request $request
   * @param $id // Website Id
   * @return JsonResponse
   * Update Website data by section builder
   */
  public function updateData(Request $request, $id): JsonResponse
  {
    try {
      $data = $request->only('data');
      $website = Website::my()->whereId($id);
      $website->update($data);
      return $this->jsonSuccess();
    } catch (\Exception $exception) {
      return $this->jsonExceptionError($exception);
    }
  }

  /**
   * @param Request $request
   * @param $id
   * @return JsonResponse
   */
  public function updatePage(Request $request, $id): JsonResponse
  {
    try {
      $page = WebsitePage::find($id);
      $page->updateSections($request);
      return $this->jsonSuccess($page);
    } catch (\Exception $exception) {
      return $this->jsonExceptionError($exception->getMessage());
    }
  }

  /**
   * @param $id // page Id
   */
  public function duplicatePage($id): JsonResponse{
    try {
      $newPage = WebsitePage::find($id);
      $newPage = $newPage->replicatePage();
      return $this->jsonSuccess($newPage);
    }catch(\Exception $e)
    {
      return $this->jsonExceptionError($e);
    }
  }

  /**
   * @param Request $request
   * @return JsonResponse
   */
  public function updatePagesOrder(Request $request): JsonResponse
  {
    if (WebsitePage::updateOrder($request)) {
      return $this->jsonSuccess(["success" => $request->all()]);
    }
    return $this->jsonError();
  }

  /**
   * @param $id
   * @return View|RedirectResponse|JsonResponse
   */
  public function editContent($id): View|RedirectResponse|JsonResponse
  {
    if (\request()->wantsJson()) {

      $website = $this->model::where('id', $id)->with(['pages' => function ($query) {
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
        'template' => $website,
        'categories' => $categories
      ]);
    }

    $website = Website::with("activeModules")
      ->my()
      ->whereId($id)
      ->firstorfail();

    if ($website->status != 'active') {
      return back()->with("error", "Sorry, website package is expired or website is banned");
    }

    if ($website->version == 1) {
      return view(self::$viewDir . "website.v1Edit", compact("website"));
    }

    return view(self::$viewDir . "website.v2Edit", compact("website"));
  }


  public function deletePage($id): JsonResponse
  {
    try {
      WebsitePage::destroy($id);
      return $this->jsonSuccess();
    }catch(\Exception $e)
    {
      return $this->jsonExceptionError($e);
    }
  }

  public function domainKeyUp(Request $request)
  {
    $validation = Validator::make($request->all(), [
      'subdomain' => 'required|string|min:4|unique:domain_customs,subdomain',
      'domain' => new FQDN()
    ]);
    if ($validation->fails()) return $this->jsonError($validation->errors());

    return $this->jsonSuccess($request->all());

  }

  public function getDomain($id)
  {
    $website = Website::my()->whereId($id)
      ->where("status", "active")
      ->firstorfail();
    $view = view("components.account.websiteDomain", compact('website'))->render();

    return $this->jsonSuccess($view);

  }

  public function updateDomain(Request $request, $id)
  {
    try {
      $website = Website::my()->whereId($id)
        ->where("status", "active")
        ->firstorfail();

      $validation = Validator::make($request->all(), [
        'subdomain' => 'required|string|min:4|max:191|unique:domain_customs,subdomain'
      ]);

      if ($validation->fails()) return response()->json(['status' => 0, 'data' => $validation->errors()]);

      $domain = DomainCustom::where("user_id", user()->id)
        ->whereId($request->id)
        ->firstorfail();

      $domain->subdomain = $request->subdomain;
      $domain->name = $request->subdomain . "." . optional(option("ssh"))['root_domain'];
      $domain->save();
      if ($website->domain_type == 'subdomain') {
        $website->domain = $domain->name;
        $website->save();
      }
      try {
        \Http::get("//{$website->domain}");
      } catch (\Exception $e) {
        \Log::info(json_encode($e->getMessage()));
      }

      return $this->jsonSuccess($domain);

    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function updateBasic(Request $request, $id)
  {
    try {
      $website = Website::my()->whereId($id)
        ->where("status", "active")
        ->firstorfail();

      $validation = Validator::make($request->all(), [
        'name' => 'max:191',
        'status' => 'required|in:active,pending,maintenance'
      ]);
      if ($validation->fails()) return response()->json(['status' => 0, 'data' => $validation->errors()]);
      $website->name = $request->name;
      $website->status_by_owner = $request->status;
      $website->save();

      return $this->jsonSuccess($website);
    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function updateOwner(Request $request, $id)
  {
    try {
      $website = Website::my()->whereId($id)
        ->where("status", "active")
        ->firstorfail();

      $admin = $website->owner;

      $validation = Validator::make($request->all(), $admin->profileUpdateRule($id));
      if ($validation->fails()) return response()->json(['status' => 0, 'data' => $validation->errors()]);
      $admin->email = $request->owner_email;
      if ($request->owner_password) {
        $admin->password = bcrypt($request->owner_password);
      }
      $admin->save();

      return $this->jsonSuccess($admin);

    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function updateModule(Request $request, $id)
  {
    try {
      $website = Website::my()->whereId($id)
        ->where("status", "active")
        ->firstorfail();
      $module_ids = $request->modules;

      $modules = Module::whereIn("id", $module_ids)->where("status", 1)->get();

      $module_counts = $modules->count();
      $featured_counts = $modules->where("featured", 1)->count();
      $module_limit = $website->module_limit;
      $fmodule_limit = $website->fmodule_limit;

      if ($module_limit != -1 && ($module_limit - $module_counts) < 0) return response()->json(['status' => 0, 'data' => ['Your max module limit count is ' . $module_limit]]);
      if ($fmodule_limit != -1 && ($fmodule_limit - $featured_counts) < 0) return response()->json(['status' => 0, 'data' => ['Your max featured module limit count is ' . $fmodule_limit]]);

      WebsiteModule::where("web_id", $website->id)
        ->whereNotIn("slug", $modules->pluck("slug")->toArray())
        ->get()
        ->each
        ->update(["status" => 0]);
      foreach ($modules as $module) {
        $web_module = WebsiteModule::where("web_id", $website->id)
          ->where("slug", $module->slug)
          ->first();
        if ($web_module == null) {
          $web_module = new WebsiteModule();
          $web_module->web_id = $website->id;
          $web_module->slug = $module->slug;
          $web_module->publish = 0;
          $web_module->name = $module->name;
          $web_module->featured = $module->featured;
        }
        $web_module->status = 1;
        $web_module->save();

      }
      return $this->jsonSuccess();
    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function setPrimary(Request $request, $id)
  {
    try {

      $website = Website::my()->whereId($id)
        ->where("status", "active")
        ->firstorfail();

      $validation = Validator::make($request->all(), $this->model->setPrimaryRule($request));
      if ($validation->fails()) return response()->json(['status' => 0, 'data' => $validation->errors()]);

      $domain_id = $request->id;
      $domain_type = $request->domain_type;
      if ($domain_type === 'hosted') {
        $domain = Domain::whereId($domain_id)->where("user_id", user()->id)->firstorfail();
      } elseif ($domain_type === 'connected') {
        $domain = DomainConnect::whereId($domain_id)->where("user_id", user()->id)->firstorfail();
      } elseif ($domain_type === 'subdomain') {
        $domain = DomainCustom::whereId($domain_id)->where("user_id", user()->id)->firstorfail();
      }
      $web = $website->primaryDomain;
      $web->web_id = null;
      $web->save();

      $domain->web_id = $website->id;
      $domain->save();

      $website->domain = $domain->name;
      $website->domain_type = $request->domain_type;
      $website->save();

      return $this->jsonSuccess($website);

    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function loadCustom()
  {
    try {
      $customs = DomainConnect::where('user_id', user()->id)
        ->whereNull('web_id')
        ->orderBy('pointed')
        ->get(['name', 'user_id', 'pointed', 'data', 'created_at', 'id']);

      $view = view('components.domain.custom', compact('customs'))->render();

      return $this->jsonSuccess($view);
    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function checkSubDomain(Request $request)
  {
    try {
      $validation = Validator::make($request->all(), [
        'subdomain' => 'required|min:4|unique:domain_customs,subdomain'
      ]);
      if ($validation->fails()) return $this->jsonError($validation->errors());

      return $this->jsonSuccess();

    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

  public function getModules(Request $request)
  {
    try {
      $keyword = $request->keyword;
      $query = Module::status(1)->where(function ($q) use ($keyword) {
        $q->where('name', 'LIKE', "%$keyword%");
        $q->orwhere('description', 'LIKE', "%$keyword%");
      });
      if ($request->orderBy === 'featured') {
        $query = $query->orderBy('featured', 'DESC');
      } elseif ($request->orderBy === 'popular') {
        $query = $query->orderBy('featured', 'DESC');
      } else {
        $query = $query->orderBy('new', 'DESC');
      }
      $modules = $query->orderBy('order')->get(['id', 'name', 'slug', 'description', 'new', 'featured']);

      $view = view('components.user.websiteModule', compact('modules'))->render();

      $data['view'] = $view;
      $data['count'] = $modules->count();

      return $this->jsonSuccess($data);
    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }
//    public function checkDns(Request $request)
//    {
//        try{
//            $domain = DomainConnect::where('id', $request->id)
//                ->where('pointed', 0)
//                ->firstorfail();
//
//            //dns lookup
//
//            $domain->pointed = 1;
//            $domain->save();
//
//            return response()->json([
//                'status'=>1,
//                'data'=>$domain
//            ]);
//        }catch(\Exception $e)
//        {
//            return response()->json([
//                'status'=>0,
//                'data'=>[json_encode($e->getMessage())]
//            ]);
//        }
//    }
  public function connectDomain(Request $request)
  {
    try {
      $validation = Validator::make($request->all(), [
        'domain' => 'required|unique:domain_connects,name|regex:/^(?!:\/\/)(?=.{1,255}$)((.{1,63}\.){1,127}(?![0-9]*$)[a-z0-9-]+\.?)$/i'
      ]);
      if ($validation->fails()) return $this->jsonError($validation->errors());

      $domain = new DomainConnect();
      $domain->user_id = user()->id;
      $domain->name = $request->domain;
      $domain->save();

      return $this->jsonSuccess();

    } catch (\Exception $e) {
      return $this->jsonExceptionError($e);
    }
  }

}
