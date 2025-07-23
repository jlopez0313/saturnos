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
        Schema::create('marquesinas_sedes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sedes_id')->constrained('sedes');
            $table->foreignId('marquesinas_id')->constrained('marquesinas');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marquesinas_sedes');
    }
};
