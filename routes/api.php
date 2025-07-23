<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'login']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware(['web', 'verified'])
->prefix('web')
->group(function () {

    Route::apiResource('departamentos', App\Http\Controllers\Api\DepartamentosController::class);
    Route::apiResource('servicios', App\Http\Controllers\Api\ServiciosController::class);
    Route::apiResource('requisitos', App\Http\Controllers\Api\RequisitosController::class);
    Route::apiResource('ventanillas', App\Http\Controllers\Api\VentanillasController::class);
    Route::apiResource('turnos', App\Http\Controllers\Api\TurnosController::class);


    Route::get('ciudades/by-departamento/{departamento}', [App\Http\Controllers\Api\CiudadesController::class, 'byDepartamento'])
        ->name('ciudades.departamento');
    Route::apiResource('ciudades', App\Http\Controllers\Api\CiudadesController::class);


    Route::get('by-ciudad/{ciudad}', [App\Http\Controllers\Api\SedesController::class, 'byCiudad'])
        ->name('sedes.ciudad');
    Route::apiResource('sedes', App\Http\Controllers\Api\SedesController::class);


    Route::post('/marquesinas/sedes', [App\Http\Controllers\Api\MarquesinasController::class, 'store_sedes'])
        ->name('marquesinas.store_sedes');
    Route::delete('/marquesinas/{marquesina}/{sede}', [App\Http\Controllers\Api\MarquesinasController::class, 'remove_sede'])
        ->name('marquesinas.remove_sede');
    Route::apiResource('marquesinas', App\Http\Controllers\Api\MarquesinasController::class);


    Route::post('/encuestas/sedes', [App\Http\Controllers\Api\EncuestasController::class, 'store_sedes'])
        ->name('encuestas.store_sedes');
    Route::delete('/encuestas/{encuesta}/{sede}', [App\Http\Controllers\Api\EncuestasController::class, 'remove_sede'])
        ->name('encuestas.remove_sede');
    Route::apiResource('encuestas', App\Http\Controllers\Api\EncuestasController::class);


    Route::post('{usuario}/sync', [App\Http\Controllers\Api\UsuariosController::class, 'sync'])->name('usuarios.sync');
    Route::apiResource('usuarios', App\Http\Controllers\Api\UsuariosController::class);


    Route::controller(App\Http\Controllers\Api\ModulosController::class)
        ->prefix('modulos')
        ->name('modulos.')
        ->group(function () {
            Route::post('/servicios', 'servicios')->name('servicios');
            Route::post('/calificar', [App\Http\Controllers\ModulosController::class, 'calificar'])->name('calificar');
        });


    Route::get('constants', function () {
        return response()->json(config('constants'));
    })->name('constants');
});


Route::middleware(['auth:sanctum', 'verified'])
->group(function () {

});