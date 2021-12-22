<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePortfolioCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('portfolio_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parent_id')->default(0);
            $table->string('name', 45);
            $table->text('description')->nullable();
            $table->string('slug', 100)->unique();
            $table->boolean('status')->default(1);
            $table->integer('order')->nullable();
            $table->timestamps();
        });
    }

    /**qq
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('portfolio_categories');
    }
}
