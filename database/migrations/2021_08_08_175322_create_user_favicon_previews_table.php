<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserFaviconPreviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_favicon_previews', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('user_favicon_id')->unsigned();
            $table->longText('content')->nullable();
            $table->timestamps();
            $table->foreign('user_favicon_id')->references('id')->on('user_favicon')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_favicon_previews');
    }
}
