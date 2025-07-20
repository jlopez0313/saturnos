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

    Route::prefix('ciudades')
    ->name('ciudades.')
    ->group( function() {
        Route::get('by-departamento/{departamento}', [App\Http\Controllers\Api\CiudadesController::class, 'byDepartamento'])->name('departamento');
    });
    Route::apiResource('ciudades', App\Http\Controllers\Api\CiudadesController::class);

    Route::prefix('sedes')
    ->name('sedes.')
    ->group( function() {
        Route::get('by-ciudad/{ciudad}', [App\Http\Controllers\Api\SedesController::class, 'byCiudad'])->name('ciudad');
    });
    Route::apiResource('sedes', App\Http\Controllers\Api\SedesController::class);

    Route::apiResource('servicios', App\Http\Controllers\Api\ServiciosController::class);

    Route::get('constants', function () {
        return response()->json(config('constants'));
    })->name('constants');
});


Route::middleware(['auth:sanctum', 'verified'])
->group(function () {

});