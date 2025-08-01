<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\PantallasCollection;
use App\Models\Marquesinas;
use Inertia\Inertia;

class PantallaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $marquesina = Marquesinas::with('sedes')
            ->whereHas('sedes', function($q) {
                $q->where('sedes_id', \Auth::user()->sedes_id);
            })
            ->first();
        return Inertia::render('pantalla/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'marquesina' => $marquesina,
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
        $pantalla = Pantallas::findOrFail($id);

        return Inertia::render('pantallas/sedes/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'pantalla' => $pantalla,
            'sedes' => $pantalla->sedes()
                ->with('ciudad.departamento')
                ->paginate()
        ]);
    }
}
