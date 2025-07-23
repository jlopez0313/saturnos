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
        Schema::create('ventanillas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sedes_id')->constrained('sedes');
            $table->string('ventanilla');
            $table->boolean('tiene_encuesta');
            $table->boolean('estado');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventanillas');
    }
};
