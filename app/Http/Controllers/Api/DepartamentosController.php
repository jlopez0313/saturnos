<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\DepartamentosRequest;
use App\Http\Resources\DepartamentosResource;
use App\Models\Departamentos;
use Inertia\Inertia;


class DepartamentosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index( )
    {
        return DepartamentosResource::collection(
            Departamentos::orderBy('departamento')
            ->get()
        );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $departamento = Departamentos::create( $data );
    }

    /**
     * Display the specified resource.
     */
    public function show(Departamentos $departamento)
    {
        return new DepartamentosResource( $departamento );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Departamentos $departamento)
    {
        $departamento->update( $request->all() );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departamentos $departamento)
    {
        $departamento->delete();
    }
}
