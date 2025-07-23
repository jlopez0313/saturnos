<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::prefix('departamentos')->group(function () {
        Route::get('/', [App\Http\Controllers\DepartamentosController::class, 'index'])->name('departamentos');
    });

    Route::prefix('ciudades')->group(function () {
        Route::get('/', [App\Http\Controllers\CiudadesController::class, 'index'])->name('ciudades');
    });

    Route::prefix('sedes')->group(function () {
        Route::get('/', [App\Http\Controllers\SedesController::class, 'index'])->name('sedes');
    });

    Route::prefix('servicios')->group(function () {
        Route::get('/', [App\Http\Controllers\ServiciosController::class, 'index'])->name('servicios');

        Route::prefix('/{id}')->group(function () {
            Route::get('/requisitos', [App\Http\Controllers\RequisitosController::class, 'index'])->name('requisitos');
        });
    });

    Route::prefix('marquesinas')->group(function () {
        Route::get('/', [App\Http\Controllers\MarquesinasController::class, 'index'])->name('marquesinas');

        Route::prefix('/{id}')->group(function () {
            Route::get('/sedes', [App\Http\Controllers\MarquesinasController::class, 'sedes'])->name('marquesinas.sedes');
        });
    });

    Route::prefix('ventanillas')
    // ->middleware(['role:admin', 'permission:pantalla'])
    ->group(function () {
        Route::get('/', [App\Http\Controllers\VentanillasController::class, 'index'])->name('ventanillas');
    });

    Route::prefix('encuestas')->group(function () {
        Route::get('/', [App\Http\Controllers\EncuestasController::class, 'index'])->name('encuestas');

        Route::prefix('/{id}')->group(function () {
            Route::get('/sedes', [App\Http\Controllers\EncuestasController::class, 'sedes'])->name('encuestas.sedes');
        });
    });

    Route::prefix('modulos')->group(function () {
        Route::get('/', [App\Http\Controllers\ModulosController::class, 'index'])->name('modulos');
        Route::get('/servicios', [App\Http\Controllers\ModulosController::class, 'servicios'])->name('servicios');
        Route::get('/calificar', [App\Http\Controllers\ModulosController::class, 'calificar'])->name('calificar');
        Route::get('/{servicio}/llamar', [App\Http\Controllers\ModulosController::class, 'llamar'])->name('llamar');
    });

    Route::prefix('turnos')->group(function () {
        Route::get('/', [App\Http\Controllers\TurnosController::class, 'index'])->name('turnos');
        Route::get('/print/{id}', [App\Http\Controllers\TurnosController::class, 'print'])->name('turnos.print');
    });

    Route::prefix('usuarios')->group(function () {
        Route::get('/', [App\Http\Controllers\UsuariosController::class, 'index'])->name('usuarios');
        Route::get('/{id}/permisos', [App\Http\Controllers\UsuariosController::class, 'permisos'])->name('permisos');
    });

    Route::prefix('pantalla')->group(function () {
        Route::get('/', [App\Http\Controllers\PantallaController::class, 'index'])->name('pantalla');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
