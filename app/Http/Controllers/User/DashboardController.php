<?php

namespace App\Http\Controllers\User;

use App\Models\Announcement;
use App\Models\AppointmentList;
use App\Models\Domain;
use App\Models\Ticket;
use App\Models\Tutorial;
use App\Models\UserForm;
use App\Models\UserPackage;
use Carbon\Carbon;

class DashboardController extends UserController
{
    public function index()
    {
        $now = Carbon::now()->toDateString();

        $data['pendingForms'] = UserForm::where("status", "need to fill")
            ->my()
            ->get();
        $data['comingAppointments'] = AppointmentList::with("user")
            ->where("date", ">=", $now)
            ->where("status", "approved")
            ->my()
            ->get();
        $data['notifications'] = auth()->user()->unreadNotifications;
        $data['openedTickets'] = Ticket::with("user")
            ->where("parent_id", 0)
            ->where(function($q) {
                $q->where("is_read",  0);
                $q->orWhere("status",  "!=", "closed");
            })
            ->my()
            ->latest()
            ->get();

        $announcements = Announcement::where(function($q) {
            $q->where("user_id", 0);
            $q->orWhere("user_id", user()->id);
        })->where("user_id", 0)
            ->where('status', 1)
            ->latest()
            ->get(['title', 'id', 'content', 'created_at']);

        $data['announcements'] = $announcements;

        return view(self::$viewDir.'dashboard', $data);
    }
    public function started()
    {
        $modules = [];
        $tutorials = Tutorial::whereNotIn("module_id", $modules)
            ->where('status', 1)
            ->with("media", "modules")
            ->orderBy("order")
            ->get();

        $package = UserPackage::where("status", "active")
            ->my()
            ->count();
        $domain = Domain::where("status", "active")
            ->whereNull("web_id")
            ->my()
            ->count();

        return view(self::$viewDir.'started', compact("tutorials", "package", "domain"));
    }
}
