<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
//        'App\Console\Commands\DailyCheck',
        'App\Console\Commands\LogDemo',
        'App\Console\Commands\CampaignSend',
        'App\Console\Commands\AppointmentRemind',
        'App\Console\Commands\BlogAdsRemind',
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('log:demo')
            ->everyFiveMinutes();

        $schedule->command('campaign:send')
            ->everyFiveMinutes();

        $schedule->command('appointment:remind')
            ->everyThirtyMinutes();

        $schedule->command('domain:check')
            ->dailyAt('0:00');

        $schedule->command('blogads:remind')
            ->dailyAt('0:00');
//
//        $schedule->command('daily:check')
//            ->dailyAt('0:00');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
