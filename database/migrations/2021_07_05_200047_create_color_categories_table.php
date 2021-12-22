<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateColorCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('color_categories', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("slug");
            $table->boolean("gradient")->default(1);
            $table->boolean("status")->default(1);
            $table->integer("order")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('color_categories');
    }
}
