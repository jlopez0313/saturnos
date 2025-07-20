<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\ServiciosRequest;
use App\Http\Resources\ServiciosResource;
use App\Models\Servicios;
use Inertia\Inertia;


class ServiciosController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $servicio = Servicios::create( $request->except('departamentos_id') );
        // return new ServiciosResource( $servicio );
    }

    /**
     * Display the specified resource.
     */
    public function show(Servicios $servicio)
    {
        return new ServiciosResource( $servicio );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Servicios $servicio)
    {
        $servicio->update( $request->except('departamentos_id') );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Servicios $servicio)
    {
        $servicio->delete();
    }
    
    public function bySede( $sede )
    {
        return ServiciosResource::collection(
            Servicios::where('sedes_id', $sede)
            ->orderBy('servicio')
            ->get()
        );
    }
}
