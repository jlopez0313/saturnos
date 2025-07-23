<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\EncuestasRequest;
use App\Http\Resources\EncuestasResource;
use App\Models\Encuestas;
use App\Models\Sedes;
use Inertia\Inertia;


class EncuestasController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $encuesta = Encuestas::create( $request->all() );
        // return new EncuestasResource( $encuesta );
    }

    /**
     * Display the specified resource.
     */
    public function show(Encuestas $encuesta)
    {
        return new EncuestasResource( $encuesta );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Encuestas $encuesta)
    {
        $encuesta->update( $request->all() );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Encuestas $encuesta)
    {
        $encuesta->delete();
    }
    
    public function store_sedes(Request $request) {
        $encuesta = Encuestas::find( $request->encuestas_id );
        $encuesta->sedes()->attach($request->sedes_id, [
            'estado' => $request->estado,
        ]);
    }

    public function remove_sede(Encuestas $encuesta, Sedes $sede)
    {
        $encuesta->sedes()->detach( $sede->id);
    }
}
