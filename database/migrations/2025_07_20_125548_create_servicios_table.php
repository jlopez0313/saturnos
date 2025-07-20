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
        Schema::create('servicios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sedes_id')->constrained('sedes');

            $table->string('codigo');
            $table->string('servicio');
            $table->boolean('requiere_documento');
            $table->string('tipo_documento');
            $table->string('texto_documento')->nullable();
            $table->time('horario_inicial');
            $table->time('horario_final');
            $table->integer('duracion');
            $table->boolean('prioritario');
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
        Schema::dropIfExists('servicios');
    }
};
