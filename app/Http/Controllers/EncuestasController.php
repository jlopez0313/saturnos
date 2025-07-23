<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\EncuestasCollection;
use App\Models\Encuestas;
use Inertia\Inertia;

class EncuestasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('encuestas/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'lista' => Encuestas::paginate(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function sedes(string $id)
    {
        $encuesta = Encuestas::findOrFail($id);

        return Inertia::render('encuestas/sedes/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'encuesta' => $encuesta,
            'sedes' => $encuesta->sedes()
                ->with('ciudad.departamento')
                ->paginate()
        ]);
    }
}
