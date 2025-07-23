<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\TurnosRequest;
use App\Http\Resources\TurnosResource;
use App\Models\Turnos;
use App\Models\Sedes;
use Inertia\Inertia;


class TurnosController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $turno = Turnos::create([
            'created_by' => \Auth::id(),
	        'servicios_id' => $request->servicios_id,
	        'documento' => $request->documento,
	        'estado' => 'P',
	        'hora_recibido' => \Carbon\Carbon::now(),
        ]);
        
        return new TurnosResource( $turno );
    }

    /**
     * Display the specified resource.
     */
    public function show(Turnos $turno)
    {
        return new TurnosResource( $turno );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Turnos $turno)
    {
        $turno->update( $request->all() );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Turnos $turno)
    {
        $turno->delete();
    }
    
    public function store_sedes(Request $request) {
        $turno = Turnos::find( $request->turnos_id );
        $turno->sedes()->attach($request->sedes_id);
    }

    public function remove_sede(Turnos $turno, Sedes $sede)
    {
        $turno->sedes()->detach( $sede->id);
    }
}
