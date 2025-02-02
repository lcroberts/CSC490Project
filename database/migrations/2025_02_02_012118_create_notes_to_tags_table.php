<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notes_to_tags', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('tag')->unsigned()->index();
            $table->integer('note')->unsigned()->index();

            $table->foreign('tag')->references('id')->on('tags')->onDelete('cascade');
        //  $table->foreign('note')->references('id')->on('notes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes_to_tags');
    }
};
