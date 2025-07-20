<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\SedesRequest;
use App\Http\Resources\SedesResource;
use App\Models\Sedes;
use Inertia\Inertia;


class SedesController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $sede = Sedes::create( $request->except('departamentos_id') );
        // return new SedesResource( $sede );
    }

    /**
     * Display the specified resource.
     */
    public function show(Sedes $sede)
    {
        return new SedesResource( $sede );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sedes $sede)
    {
        $sede->update( $request->except('departamentos_id') );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sedes $sede)
    {
        $sede->delete();
    }
    
    public function byCiudad( $ciudad )
    {
        return SedesResource::collection(
            Sedes::where('ciudades_id', $ciudad)
            ->orderBy('sede')
            ->get()
        );
    }
}
