<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\MarquesinasCollection;
use App\Models\Marquesinas;
use Inertia\Inertia;

class MarquesinasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('marquesinas/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'lista' => Marquesinas::paginate(),
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
        $marquesina = Marquesinas::findOrFail($id);

        return Inertia::render('marquesinas/sedes/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'marquesina' => $marquesina,
            'sedes' => $marquesina->sedes()
                ->with('ciudad.departamento')
                ->paginate()
        ]);
    }
}
