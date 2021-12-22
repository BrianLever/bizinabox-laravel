<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddApprovedAtToDirectoryListingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('directory_listings', function (Blueprint $table) {
            $table->dateTime('approved_at')->default(\Illuminate\Support\Facades\DB::raw('CURRENT_TIMESTAMP'))->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('directory_listings', function (Blueprint $table) {
            $table->dropColumn('approved_at');
        });
    }
}
