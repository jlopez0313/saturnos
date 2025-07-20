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
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
