<?php

namespace App\Models;

use App\Models\Builder\Template;
use App\Models\Builder\TemplateFooter;
use App\Models\Builder\TemplateHeader;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;
use Illuminate\Database\Eloquent\Relations as Relations;

class Website extends SiteBaseModel
{
    protected $connection = 'mysql2';
    protected $table = 'websites';

    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function primaryDomain()
    {
        if ($this->domain_type === 'subdomain') {
            return $this->hasOne(DomainCustom::class, 'web_id')->withDefault();
        } elseif ($this->domain_type === 'connected') {
            return $this->hasOne(DomainConnect::class, 'web_id')->withDefault();
        } else {
            return $this->hasOne(Domain::class, 'web_id')->withDefault();
        }
    }

    public function getDataAttribute($value){
        return json_decode($value);
    }

    public function setDataAttribute($value){
        $this->attributes['data'] = json_encode($value);
    }

    public function owner()
    {
        return $this->hasOne(WebsiteUser::class, 'web_id')->where('is_owner', 1)->withDefault();
    }

    public function activeModules()
    {
        return $this->hasMany(WebsiteModule::class, 'web_id')->where("status", 1);
    }

    public function storeRule($request)
    {
        if ($request->domain_type === 'subdomain') {
            $rule['subdomain'] = 'required|min:4|unique:domain_customs,subdomain';
        } elseif ($request->domain_type === 'connected') {
            $rule['connected_domain'] = 'required|exists:domain_connects,id,web_id,NULL';
        } else {
            $rule['hosted_domain'] = 'required|exists:domains,id,web_id,NULL';
        }
        $rule['domain_type'] = 'in:subdomain,connected,hosted';
        if (!$request->credentials) {
            $rule['email'] = ' required|email';
            $rule['password'] = ' required|min:8';
        }
        $rule['owner'] = 'required|exists:users,id';
        $rule['status'] = 'required|in:active,pending';
        $rule['status_by_owner'] = 'required|in:active,pending,maintenance';
        $rule['storage'] = 'required';
        $rule['page'] = 'required|integer';
        $rule['module_limit'] = 'required|integer';
        $rule['featured_module_limit'] = 'required|integer';
        $rule['template'] = 'required';
        $rule['name'] = 'max:191';
        return $rule;
    }

    public function storeUserRule($request)
    {
        if ($request->domain_type === 'subdomain') {
            $rule['subdomain'] = 'required|min:4|unique:domain_customs,subdomain';
        } elseif ($request->domain_type === 'connected') {
            $rule['connected_domain'] = 'required|exists:domain_connects,name,web_id,NULL';
        } else {
            $rule['hosted_domain'] = 'required|exists:domains,name,web_id,NULL';
        }
        $rule['domain_type'] = 'in:subdomain,connected,hosted';
        if ($request->credentials == 0) {
            $rule['email'] = ' required|email';
            $rule['password'] = ' required|min:8';
        }
        $rule['template'] = 'required';
        $rule['status'] = 'required|in:active,pending,maintenance';
        $rule['name'] = 'max:191';
        return $rule;
    }

    public function setPrimaryRule($request)
    {
        $rule['domain_type'] = 'required|in:subdomain,connected,hosted';
        if ($request->domain_type == 'subdomain') {
            $rule['id'] = 'required|exists:domain_customs,id,web_id,NULL';
        } elseif ($request->domain_type == 'connected') {
            $rule['id'] = 'required|exists:domain_connects,id,web_id,NULL';
        } else {
            $rule['id'] = 'required|exists:domains,id,web_id,NULL';
        }
        return $rule;
    }

    public function parkRule()
    {
        $rule['domain'] = 'required|regex:/(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}$)/|unique:domain_connects,name,null,null,pointed,1';
        return $rule;
    }

    public function storeWebsite($request, $template)
    {
        $website = new Website();
        $website->user_id = $request->owner;

        $ssh = optional(option('ssh'));
        if ($request->domain_type === 'subdomain') {
            $website->domain = $request->subdomain . "." . $ssh['root_domain'];
            $website->domain_type = 'subdomain';
        } elseif ($request->domain_type === 'connected') {
            $domain = DomainConnect::find($request->connected_domain);
            $website->domain = $domain->name;
            $website->domain_type = 'connected';
        } elseif ($request->domain_type === 'hosted') {
            $domain = Domain::find($request->hosted_domain);
            $website->domain = $domain->name;
            $website->domain_type = 'hosted';
        }

        $website->status = $request->status;
        $website->status_by_owner = $request->status_by_owner;
        $website->name = $request->name;
        $website->css = $template->css;
        $website->script = $template->script;
        $website->storage_limit = $request->storage;
        $website->page_limit = $request->page;
        $website->module_limit = $request->module_limit;
        $website->fmodule_limit = $request->featured_module_limit;
        $website->save();

        if ($request->domain_type === 'subdomain') {
            DomainCustom::create([
                'web_id' => $website->id,
                'user_id' => user()->id,
                'name' => $request->subdomain . "." . $ssh['root_domain'],
                'subdomain' => $request->subdomain,
                'pointed' => 1,
            ]);

        } elseif ($request->domain_type === 'connected') {
            $domain->web_id = $website->id;
            $domain->save();
        } elseif ($request->domain_type === 'hosted') {
            $domain->web_id = $website->id;
            $domain->save();
        }

        return $website;
    }

    public function storeUserWebsite($request, $package, $modules)
    {

        return DB::transaction(function () use ($request, $package, $modules) {

            $template = Template::whereId($request->template)->where("status", 1)->firstorfail();
            $c_header = TemplateHeader::status(1)->whereId($request->header)->first();
            $c_footer = TemplateFooter::status(1)->whereId($request->footer)->first();

            $website = new  Website();

            $website->user_id = user()->id;
            $website->package_id = $package->id;

            $ssh = optional(option('ssh'));

            if ($request->domain_type === 'subdomain') {
                $website->domain = $request->subdomain . "." . $ssh['root_domain'];
                $website->domain_type = 'subdomain';
            } elseif ($request->domain_type === 'connected') {
                $domain = DomainConnect::whereName($request->connected_domain)->firstorfail();
                $website->domain = $domain->name;
                $website->domain_type = 'connected';
            } elseif ($request->domain_type === 'hosted') {
                $domain = Domain::whereName($request->hosted_domain)->firstorfail();
                $website->domain = $domain->name;
                $website->domain_type = 'hosted';
            }
            $website->name = $request->name;
            $website->css = $template->css;
            $website->script = $template->script;
            $website->storage_limit = $package->storage;
            $website->module_limit = $package->module;
            $website->fmodule_limit = $package->featured_module;
            $website->page_limit = $package->page;
            $website->status = "active";
            $website->status_by_owner = $request->status;
            $website->version = $template->version;
            $website->data = $template->data;
            $website->save();

            if ($request->domain_type === 'subdomain') {
                DomainCustom::create([
                    'web_id' => $website->id,
                    'user_id' => user()->id,
                    'name' => $request->subdomain . "." . $ssh['root_domain'],
                    'subdomain' => $request->subdomain,
                    'pointed' => 1,
                ]);

            } else {
                $domain->web_id = $website->id;
                $domain->save();
            }

            $package->current_website += 1;
            $package->save();

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

            if ($template->version === 1) {
                $website->createPages($template->approvedPages);
            } else {
                $website->createPages($template->pages);
            }

            $website->createAdmin($request, user()->id);

            if ($request->progress) {
                $progress = PackageWebsiteProgress::whereId($request->progress)
                    ->where("package_id", $package->id)
                    ->first();
                if ($progress) {
                    $progress->delete();
                }
            }

            return $website;
        });
    }

    public function createModules($modules)
    {
        foreach ($modules as $module) {
            $web_module = new WebsiteModule();
            $web_module->web_id = $this->id;
            $web_module->slug = $module->slug;
            $web_module->publish = 0;
            $web_module->name = $module->name;
            $web_module->featured = $module->featured;
            $web_module->status = 1;
            $web_module->save();
        }
        return $this;
    }

    public function createPages($pages)
    {

        $pageWebArray = [];
        foreach ($pages as $page) {
            $newPage = new WebsitePage();
            $newPage->web_id = $this->id;
            $newPage->parent_id = $page->parent_id;
            $newPage->name = $page->name;
            $newPage->type = $page->type;
            $newPage->url = $page->url;
            $newPage->order = $page->order;
            $newPage->footer = $page->footer;
            $newPage->header = $page->header;
            $newPage->footer_order = $page->footer_order;
            $newPage->content = $page->content;
            $newPage->mainCss = $page->mainCss;
            $newPage->sectionCss = $page->sectionCss;
            $newPage->css = $page->css;
            $newPage->script = $page->script;
            $newPage->data = json_encode($page->data);
            $newPage->save();
            if($this->version === 2){
                $sections = $page->sections;
                $newPage->addSections($sections);
            }
            $pageWebArray[$page->id] = $newPage->id;
        }

        foreach ($pageWebArray as $key => $pageId) {
            $page = WebsitePage::find($pageId);
            $page->parent_id = $page->parent_id === 0 ? 0 : $pageWebArray[$page->parent_id];
            $page->save();
        }

    }

    public function createAdmin($request, $user_id)
    {
        $user = User::find($user_id);
        $admin = new WebsiteUser();
        $admin->name = $user->name;
        $admin->web_id = $this->id;
        $admin->email_verified_at = Carbon::now()->toDateTimeString();
        $admin->is_owner = 1;

        if ($request->credentials == 1) {
            $admin->email = $user->email;
            $admin->password = $user->password;
        } else {
            $admin->email = $request->email;
            $admin->password = bcrypt($request->password);
        }
        $admin->save();
        \DB::connection('mysql2')->table('model_has_roles')->insert([
            'role_id' => 1,
            'model_type' => 'App\Models\User',
            'model_id' => $admin->id
        ]);
    }

    public function header()
    {
        return $this->hasOne('App\Models\WebsiteHeader', 'web_id');
    }

    public function footer()
    {
        return $this->hasOne('App\Models\WebsiteFooter', 'web_id');
    }

    public function pages(): Relations\HasMany
    {
        return $this->hasMany(WebsitePage::class, 'web_id')->with(['sections'=>function($query){
            $query->with(['category'=>function($query){
                $query->with('sections');
            }]);
        }]);
    }

    public function package()
    {
        return $this->belongsTo(UserPackage::class, 'package_id')->withDefault();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id')->withDefault();
    }

    public function storageUsage()
    {
        $limit = $this->storage_limit;
        $current = $this->current_storage;

        if ($limit == -1 || $limit == 0)
            $percent = 0;
        else
            $percent = (float)$current / $limit * 100;

        return "<div class=\"progress\" title='{$percent}%'>
                    <div class=\"progress-bar progress-bar-striped\" role=\"progressbar\" style=\"width: {$percent}%\" aria-valuenow=\"{$percent}\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>
                </div>
                <p class='mb-0'>{$current} / {$limit} GB</p>";
    }

    public function getDatatable($status, $user)
    {
        switch ($status) {
            case 'all':
                $websites = $this::with('user');
                break;
            case 'active':
                $websites = $this::with('user')->where('status', 'active');
                break;
            case 'inactive':
                $websites = $this::with('user')->where('status', 'inactive');
                break;
            case 'expired':
                $websites = $this::with('user')->whereIn('status', ['expired', 'canceled']);
                break;
        }
        if ($user != 'all') {
            $websites = $websites->where("user_id", $user);
        }
        return Datatables::of($websites)->addColumn('storage', function ($row) {
            return $row->storageUsage();
        })->addColumn('user', function ($row) {
            return "<a href='" . route('admin.userManage.detail', $row->user->id) . "'>{$row->user->name}</a>";
        })->editColumn('created_at', function ($row) {
            return $row->created_at;
        })->editColumn('status', function ($row) {
            if ($row->status == 'active') {
                $result = "<span class='c-badge c-badge-success'>Active</span>";
            } elseif ($row->status == 'pending') {
                $result = "<span class='c-badge c-badge-info'>Pending</span>";
            } else {
                $result = "<span class='c-badge c-badge-danger'>{$row->status}</span>";
            }
            return $result;
        })->editColumn('domain', function ($row) {
            return $row->domain . "<a href='http://" . $row->domain . "' target='_blank'> <i class='la la-external-link'></i></a>";
        })->editColumn('status_by_owner', function ($row) {

            if ($row->status_by_owner == 'active') {
                $result = "<span class='c-badge c-badge-success'>Active</span>";
            } elseif ($row->status_by_owner == 'pending') {
                $result = "<span class='c-badge c-badge-danger'>Pending</span>";
            } else {
                $result = "<span class='c-badge c-badge-info'>{$row->status_by_owner}</span>";
            }
            return $result;
        })->addColumn('action', function ($row) use ($user) {

            if ($user == 'all') {
                return '
                    <a href="' . route('admin.website.list.show', $row->id) . '" class="btn btn-outline-primary btn-sm m-1	p-2 m-btn m-btn--icon">
                        <span>
                            <i class="la la-eye"></i>
                            <span>Show</span>
                        </span>
                    </a>
                    <a href="' . route('admin.website.list.edit', $row->id) . '" class="btn btn-outline-success btn-sm m-1	p-2 m-btn m-btn--icon">
                        <span>
                            <i class="la la-edit"></i>
                            <span>Edit</span>
                        </span>
                    </a>
                    <a href="' . route('admin.website.list.edit', $row->id) . '" class="btn btn-outline-danger btn-sm m-1	p-2 m-btn m-btn--icon">
                        <span>
                            <i class="la la-remove"></i>
                            <span>Delete</span>
                        </span>
                    </a>';
            } else {
                return '
                    <a href="' . route('admin.website.list.show', $row->id) . '" class="btn btn-outline-primary btn-sm m-1	p-2 m-btn m-btn--icon">
                        <span>
                            <i class="la la-eye"></i>
                            <span>Show</span>
                        </span>
                    </a>
                    <a href="' . route('admin.website.list.edit', $row->id) . '" class="btn btn-outline-success btn-sm m-1	p-2 m-btn m-btn--icon">
                        <span>
                            <i class="la la-edit"></i>
                            <span>Edit</span>
                        </span>
                    </a>';
            }


        })->rawColumns(['domain', 'status', 'status_by_owner', 'user', 'storage', 'action'])->make(true);
    }
}
