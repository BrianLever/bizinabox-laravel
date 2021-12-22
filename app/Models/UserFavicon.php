<?php

namespace App\Models;

use App\Jobs\ActualizeFaviconPreview;
use App\Jobs\ActualizeLogoPreview;
use App\Models\Logo\UserLogo;
use App\Repositories\UserFaviconRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use OwenIt\Auditing\Auditable as AuditableTrait;
use OwenIt\Auditing\Contracts\Auditable;
use Yajra\DataTables\DataTables;

class UserFavicon extends Model implements Auditable
{
    use AuditableTrait;

    public const STORAGE_DISK = 's3-pub-bizinabox';

    protected $table = 'user_favicon';

    protected $guarded = ['id'];

    protected $auditInclude = [
        'favicon_content',
        'created_at',
        'updated_at',
    ];

    /**
     * @return mixed
     */
    public function getContent()
    {
        return $this->favicon_content;
    }

    /**
     * @return string
     */
    public function getEncryptedFaviconContent():string
    {
        return str_rot13(base64_encode($this->getContent()));
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function preview()
    {
        return $this->belongsTo(UserFaviconPreview::class, 'id', 'user_favicon_id')->withDefault();
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
    public function favicon()
    {
        return $this->belongsTo(FaviconItem::class, "favicon_id")->withDefault();
    }
    public function allowedToDownload()
    {
        return true;
    }
    public function purchase()
    {
        return $this->hasOne(UserFaviconPreview::class, "user_favicon_id");
    }

    public function logos(){
        return $this->belongsToMany(UserLogo::class,'user_logo_favicon', 'user_favicon_id','user_logo_id');
    }


    public function getLogoAttribute(){
        if(count($this->logos)){
            return  $this->logos->first();
        }
        return  null;
    }

    public function getLogo(){
        if (session(UserFaviconRepository::TEMP_LOGO_HASH.$this->hash)){
            return session(UserFaviconRepository::TEMP_LOGO_HASH.$this->hash);
        }
        return $this->logo;
    }

    public function saveLogo(){
        $userLogo = $this->getLogo();
        if($userLogo){
            $userLogo->user_id = user()->id;
            $userLogo->version = $userLogo->version ?? 'default';
            $userLogo->save();
            dispatch(new ActualizeLogoPreview($userLogo));
            $this->logos()->sync([$userLogo->id]);
        }
    }

    public function setAsEdited():self
    {
        $this->downloadable = 0;
        $this->save();

        return $this;
    }

    public function setAsInProgress(): self
    {
        $this->downloadable = 2;
        $this->progress = 0;
        $this->save();

        return $this;
    }

    public function getPreviewPath(): string{
        return "user/{$this->user->id}/favicons/{$this->hash}/preview.png";
    }


    public function generatePreview()
    {
        $b64Data= $this->preview()->first()->content;

        $d_data =  base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $b64Data));

        Storage::disk(self::STORAGE_DISK)->put($this->getPreviewPath(), $d_data);

        return $this;
    }

    public function getAdminDatatable($status, $user_id=null)
    {
        if($user_id)
        {
            $favicons = $this::where("user_id", $user_id)
                ->with(['user', 'preview', 'favicon']);
        }else {
            $favicons = $this::with(['user', 'preview', 'favicon']);
        }
        if($status==='notdownload')
        {
            $favicons = $favicons->where("downloadable", '!=', 1);

        }elseif($status==='download')
        {
            $favicons = $favicons->where("downloadable", 1);

        }

        return Datatables::of($favicons)->addColumn('type', function($row) {

            if($row->favicons->premium==1)
            {
                return '<span class="c-badge c-badge-success">Premium</span>';
            }else{
                return '<span class="c-badge c-badge-info" >Free</span>';
            }
        })->addColumn('preview', function($row) {
            return "<a href='".route('admin.userFavicon.preview', $row->hash)."' target='_blank'><img src='{$row->preview->content}' class='w-150px h-cursor'></a>";
        })->editColumn('user_id', function($row) {
            return $row->user->email;
        })->editColumn('created_at', function($row) {
            return $row->created_at->toDateString();
        })->editColumn('updated_at', function($row) {
            return $row->updated_at->toDateString();
        })->editColumn('download1', function($row) {
            return "<a href='".route('admin.userFavicon.download.favicon', $row->hash)."' target='_blank' class='btn btn-outline-info btn-sm downloadFaviconTypeBtn mr-1'>Favicon <i class='fa fa-download'></i></a>";;
        })->addColumn('download2', function($row) {

            if($row->downloadable==1)
            {
                $middle =  "<a href='".route('admin.userFavicon.download.package', $row->hash)."' class='btn btn-outline-success btn-sm downloadPackageBtn' >Ready for Download <i class='fa fa-download'></i></a>";
            }elseif($row->downloadable==2) {
                $middle =  "<p>Progress: {$row->progress} %</p><div class='progress progress_el' data-id='{$row->id}'><div class=\"progress-bar\" role=\"progressbar\" style=\"width: {$row->progress}%\" aria-valuenow=\"{$row->progress}\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div></div>";
            }else {
                $middle =  "<a href='".route('admin.userFavicon.download.package', $row->hash)."' class='btn btn-outline-info btn-sm downloadPackageBtn' >Archive and Download <i class='fa fa-download'></i></a>";
            }

            return "<div class='progress_area' data-id='{$row->id}'>{$middle}</div>";
        })->addColumn('action', function($row) {
            return '
                    <a href="'.route('admin.userFavicon.delete', $row->hash).'" class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill tooltip_3 deleteBtn" title="Delete">
                            <i class="la la-remove"></i>
                    </a>';

        })->rawColumns(['preview','download1', 'type', 'download2', 'action'])
            ->make(true);
    }

    public function getDatatable($status)
    {
        if($status==='notdownload')
        {
            $favicons = $this::where("user_id", auth()->user()->id)
                ->where("downloadable", '!=', 1)
                ->with(['preview', 'favicon']);

        }elseif($status==='download')
        {
            $favicons = $this::where("user_id", auth()->user()->id)
                ->where("downloadable", 1)
                ->with(['preview', 'favicon']);

        }else {
            $favicons = $this::where("user_id", auth()->user()->id)
                ->with(['preview', 'favicon']);

        }
        return Datatables::of($favicons)->addColumn('type', function($row) {

            if($row->favicon->premium==1)
            {
                return '<span class="c-badge c-badge-success">Premium</span>';
            }else{
                return '<span class="c-badge c-badge-info" >Free</span>';
            }
        })->addColumn('preview', function($row) {
            return "<a href='".route('user.favicon.preview', $row->hash)."' target='_blank'><img src='{$row->preview->content}' class='w-150px h-cursor'></a>";
        })->editColumn('created_at', function($row) {
            return $row->created_at->toDateString();
        })->editColumn('updated_at', function($row) {
            return $row->updated_at->toDateString();
        })->addColumn('view_live', function($row) {
            return "<a href='".route('user.favicon.live')."' class='btn btn-outline-info p-2'>View live</a>";
        })->editColumn('download1', function($row) {
            return "<a href='".route('user.favicon.download', $row->hash)."' target='_blank' class='btn btn-outline-info btn-sm downloadFaviconTypeBtn mr-1'>Download PNG <i class='fa fa-download'></i></a>";;
        })->editColumn('download2', function($row) {
            if($row->downloadable==1)
            {
                $middle =  "<a href='".route('user.favicon.download.package', $row->hash)."' class='btn btn-outline-success btn-sm downloadPackageBtn' >Download Design Package <i class='fa fa-download'></i></a>";
            }elseif($row->downloadable==2) {
                $middle =  "<p>Progress: {$row->progress} %</p><div class='progress progress_el' data-id='{$row->id}'><div class=\"progress-bar\" role=\"progressbar\" style=\"width: {$row->progress}%\" aria-valuenow=\"{$row->progress}\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div></div>";
            }else {
                $middle =  "<a href='".route('user.favicon.download.package', $row->hash)."' class='btn btn-outline-info btn-sm downloadPackageBtn' >Download Design Package <i class='fa fa-download'></i></a>";
            }

            return "<div class='progress_area' data-id='{$row->id}'>{$middle}</div>";
        })->addColumn('edit', function($row) {
            return '
                    <a href="'.route('user.favicon.edit', $row->hash).'" class="btn btn-outline-info btn-sm" title="Edit">
                          <i class="la la-edit"></i>  Edit
                    </a>';

        })->addColumn('action', function($row) {
            return '
                    <a href="'.route('user.favicon.delete', $row->hash).'" class="btn btn-outline-danger btn-sm deleteBtn" title="Delete">
                         <i class="la la-remove"></i>   Delete
                    </a>';

        })->rawColumns(['preview','download1','download2', 'type', 'view_live','edit', 'action'])
            ->make(true);
    }
}
