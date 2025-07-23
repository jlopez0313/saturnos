<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\VentanillasRequest;
use App\Http\Resources\VentanillasResource;
use App\Models\Ventanillas;
use Inertia\Inertia;


class VentanillasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $ventanilla = Ventanillas::create( $request->except('departamentos_id', 'ciudades_id') );
        // return new VentanillasResource( $ventanilla );
    }

    /**
     * Display the specified resource.
     */
    public function show(Ventanillas $ventanilla)
    {
        $ventanilla->load('sede.ciudad.departamento');
        return new VentanillasResource( $ventanilla );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ventanillas $ventanilla)
    {
        $ventanilla->update( $request->except('departamentos_id', 'ciudades_id') );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ventanillas $ventanilla)
    {
        $ventanilla->delete();
    }
    
    public function bySede( $sede )
    {
        return VentanillasResource::collection(
            Ventanillas::where('sedes_id', $sede)
            ->orderBy('ventanilla')
            ->get()
        );
    }
}
