<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('permissions')->insert([
            [
                'name' => 'administracion',
                'guard_name' => 'web',
            ],
            [
                'name' => 'modulos_atencion',
                'guard_name' => 'web',
            ],
            [
                'name' => 'pantalla',
                'guard_name' => 'web',
            ],
            [
                'name' => 'generar_turno',
                'guard_name' => 'web',
            ],
        ]);
    }
}