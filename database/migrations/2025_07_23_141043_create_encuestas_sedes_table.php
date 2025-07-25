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
        Schema::create('encuestas_sedes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sedes_id')->constrained('sedes');
            $table->foreignId('encuestas_id')->constrained('encuestas');
            $table->boolean('estado');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('encuestas_sedes');
    }
};
