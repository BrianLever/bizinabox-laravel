<?php

namespace App\Models\Logo;

use App\Jobs\ActualizeFaviconPreview;
use App\Models\User;
use App\Models\UserFavicon;
use App\Repositories\UserLogoRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use OwenIt\Auditing\Auditable as AuditableTrait;
use OwenIt\Auditing\Contracts\Auditable;
use Yajra\DataTables\DataTables;

class UserLogo extends Model implements Auditable
{
    use AuditableTrait;

    protected $table = 'users_logotypes';

    protected $guarded = ['id'];

    public const STORAGE_DISK = "s3-pub-bizinabox";

    protected $auditInclude = [
        'logo_content',
        'created_at',
        'updated_at',
    ];

    /**
     * @return mixed
     */
    public function getContent()
    {
        return $this->logo_content;
    }

    /**
     * @return string
     */
    public function getEncryptedLogoContent()
    {
        return str_rot13(base64_encode($this->getContent()));
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function preview()
    {
        return $this->belongsTo(UserLogoPreview::class, 'id', 'user_logo_id')->withDefault();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function logo()
    {
        return $this->belongsTo(LogoType::class, "logo_id")->withDefault();
    }

    public function allowedToDownload()
    {
        if($this->logo->premium==0) return true;
        if(user()->activeMembership()||user()->hasRole("admin")) return true;
        return false;
    }

    public function purchase()
    {
        return $this->hasOne(UserLogoPreview::class, "user_logo_id");
    }

    public function getFaviconAttribute(){
        if(count($this->favicons)){
            return $this->favicons->first();
        }
        return  null;
    }

    public function getFavicon(){
        if (session(UserLogoRepository::TEMP_FAVICON_HASH.$this->hash)){
            return session(UserLogoRepository::TEMP_FAVICON_HASH.$this->hash);
        }
        return $this->favicon;
    }

    public function saveFavicon(){
        $userFavicon = $this->getFavicon();
        if($userFavicon){
            $userFavicon->user_id = user()->id;
            $userFavicon->version = $userFavicon->version ?? 'default';
            $userFavicon->save();

            dispatch(new ActualizeFaviconPreview($userFavicon));

            $this->favicons()->sync([$userFavicon->id]);
        }
    }

    public function setAsEdited(): self
    {
        $this->downloadable = 0;
        $this->save();

        return $this;
    }
    /**
     * @return $this
     */
    public function setAsInProgress()
    {
        $this->downloadable = 2;
        $this->progress = 0;
        $this->save();

        return $this;
    }

    public function getPreviewPath(): string{
        return "user/{$this->user->id}/logotypes/{$this->hash}/preview.png";
    }

    public function favicons(){
        return $this->belongsToMany(UserFavicon::class,'user_logo_favicon','user_logo_id','user_favicon_id');
    }

    public function generatePreview()
    {
        $b64Data= $this->preview()->first()->content;

        $d_data =  base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $b64Data));

//        file_put_contents(Storage::disk("public")->put("logotypes/{$this->hash}.png, $d_data), $d_data);

        Storage::disk(self::STORAGE_DISK)->put($this->getPreviewPath(), $d_data);

        return $this;
    }

    public function getAdminDatatable($status, $user_id=null)
    {
        if($user_id)
        {
            $logos = $this::where("user_id", $user_id)
                ->with(['user', 'preview', 'logo']);
        }else {
            $logos = $this::with(['user', 'preview', 'logo']);
        }
        if($status==='notdownload')
        {
            $logos = $logos->where("downloadable", '!=', 1);

        }elseif($status==='download')
        {
            $logos = $logos->where("downloadable", 1);

        }

        return Datatables::of($logos)->addColumn('type', function($row) {

            if($row->logo->premium==1)
            {
                return '<span class="c-badge c-badge-success">Premium</span>';
            }else{
                return '<span class="c-badge c-badge-info" >Free</span>';
            }
        })->addColumn('preview', function($row) {
            return "<a href='".route('admin.userLogo.preview', $row->hash)."' target='_blank'><img src='{$row->preview->content}' class='w-150px h-cursor'></a>";
        })->editColumn('user_id', function($row) {
            return $row->user->email;
        })->editColumn('created_at', function($row) {
            return $row->created_at->toDateString();
        })->editColumn('updated_at', function($row) {
            return $row->updated_at->toDateString();
        })->editColumn('download1', function($row) {
            return "<a href='".route('admin.userLogo.download.logoType', $row->hash)."' target='_blank' class='btn btn-outline-info btn-sm downloadLogoTypeBtn mr-1'>Logotype <i class='fa fa-download'></i></a>";;
        })->addColumn('download2', function($row) {

            if($row->downloadable==1)
            {
                $middle =  "<a href='".route('admin.userLogo.download.package', $row->hash)."' class='btn btn-outline-success btn-sm downloadPackageBtn' >Ready for Download <i class='fa fa-download'></i></a>";
            }elseif($row->downloadable==2) {
                $middle =  "<p>Progress: {$row->progress} %</p><div class='progress progress_el' data-id='{$row->id}'><div class=\"progress-bar\" role=\"progressbar\" style=\"width: {$row->progress}%\" aria-valuenow=\"{$row->progress}\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div></div>";
            }else {
                $middle =  "<a href='".route('admin.userLogo.download.package', $row->hash)."' class='btn btn-outline-info btn-sm downloadPackageBtn' >Archive and Download <i class='fa fa-download'></i></a>";
            }

            return "<div class='progress_area' data-id='{$row->id}'>{$middle}</div>";
        })->addColumn('action', function($row) {
            return '
                    <a href="'.route('admin.userLogo.delete', $row->hash).'" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill tooltip_3 deleteBtn" title="Delete">
                            <i class="la la-remove"></i>
                    </a>';

        })->rawColumns(['preview','download1', 'type', 'download2', 'action'])
            ->make(true);
    }

    public function getDatatable($status)
    {
        if($status==='notdownload')
        {
            $logos = $this::where("user_id", auth()->user()->id)
                ->where("downloadable", '!=', 1)
                ->with(['preview', 'logo']);

        }elseif($status==='download')
        {
            $logos = $this::where("user_id", auth()->user()->id)
                ->where("downloadable", 1)
                ->with(['preview', 'logo']);

        }else {
            $logos = $this::where("user_id", auth()->user()->id)
                ->with(['preview', 'logo']);

        }
        return Datatables::of($logos)->addColumn('type', function($row) {

            if($row->logo->premium==1)
            {
                return '<span class="c-badge c-badge-success">Premium</span>';
            }else{
                return '<span class="c-badge c-badge-info" >Free</span>';
            }
        })->addColumn('preview', function($row) {
            return "<a href='".route('user.logotypes.preview', $row->hash)."' target='_blank'><img src='{$row->preview->content}' class='w-150px h-cursor'></a>";
        })->editColumn('created_at', function($row) {
            return $row->created_at->toDateString();
        })->editColumn('updated_at', function($row) {
            return $row->updated_at->toDateString();
        })->addColumn('view_live', function($row) {
            return "<a href='".route('user.logotypes.live')."' class='btn btn-outline-info p-2'>View live</a>";
        })->editColumn('download1', function($row) {
            return "<a href='".route('user.logotypes.download', $row->hash)."' target='_blank' class='btn btn-outline-info btn-sm downloadLogoTypeBtn mr-1'>Download PNG <i class='fa fa-download'></i></a>";;
        })->addColumn('download2', function($row) {

            if($row->downloadable==1)
            {
                $middle =  "<a href='".route('user.logotypes.download.package', $row->hash)."' class='btn btn-outline-success btn-sm downloadPackageBtn' >Download Design Package <i class='fa fa-download'></i></a>";
            }elseif($row->downloadable==2) {
                $middle =  "<p>Progress: {$row->progress} %</p><div class='progress progress_el' data-id='{$row->id}'><div class=\"progress-bar\" role=\"progressbar\" style=\"width: {$row->progress}%\" aria-valuenow=\"{$row->progress}\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div></div>";
            }else {
                $middle =  "<a href='".route('user.logotypes.download.package', $row->hash)."' class='btn btn-outline-info btn-sm downloadPackageBtn' >Download Design Package <i class='fa fa-download'></i></a>";
            }

            return "<div class='progress_area' data-id='{$row->id}'>{$middle}</div>";
        })->addColumn('edit', function($row) {
            return '
                    <a href="'.route('user.logotypes.edit', $row->hash).'" class="btn btn-outline-info btn-sm" title="Edit">
                          <i class="la la-edit"></i>  Edit
                    </a>';

        })->addColumn('action', function($row) {
            return '
                    <a href="'.route('user.logotypes.delete', $row->hash).'" class="btn btn-outline-danger btn-sm deleteBtn" title="Delete">
                         <i class="la la-remove"></i>   Delete
                    </a>';

        })->rawColumns([ 'type','preview','download1', 'download2', 'view_live','edit', 'action'])
            ->make(true);
    }
}
