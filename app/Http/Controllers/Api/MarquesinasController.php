<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\MarquesinasRequest;
use App\Http\Resources\MarquesinasResource;
use App\Models\Marquesinas;
use App\Models\Sedes;
use Inertia\Inertia;


class MarquesinasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $marquesina = Marquesinas::create( $request->all() );
        // return new MarquesinasResource( $marquesina );
    }

    /**
     * Display the specified resource.
     */
    public function show(Marquesinas $marquesina)
    {
        return new MarquesinasResource( $marquesina );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Marquesinas $marquesina)
    {
        $marquesina->update( $request->all() );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Marquesinas $marquesina)
    {
        $marquesina->delete();
    }
    
    public function store_sedes(Request $request) {
        $marquesina = Marquesinas::find( $request->marquesinas_id );
        $marquesina->sedes()->attach($request->sedes_id);
    }

    public function remove_sede(Marquesinas $marquesina, Sedes $sede)
    {
        $marquesina->sedes()->detach( $sede->id);
    }
}
