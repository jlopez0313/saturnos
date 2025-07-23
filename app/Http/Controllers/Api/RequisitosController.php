<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\RequisitosRequest;
use App\Http\Resources\RequisitosResource;
use App\Models\Requisitos;
use Inertia\Inertia;


class RequisitosController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $requisito = Requisitos::create( $request->all() );
        // return new RequisitosResource( $requisito );
    }

    /**
     * Display the specified resource.
     */
    public function show(Requisitos $requisito)
    {
        $requisito->load('servicio');
        return new RequisitosResource( $requisito );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Requisitos $requisito)
    {
        $requisito->update( $request->all() );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Requisitos $requisito)
    {
        $requisito->delete();
    }
}
