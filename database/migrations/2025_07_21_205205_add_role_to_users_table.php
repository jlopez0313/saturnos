<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use \App\Enums\UserRole;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('sedes_id')->nullable()->constrained('sedes');

            $table->enum('role', UserRole::values())
                ->default(UserRole::ORIENTADOR->value);

            $table->boolean('estado');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
