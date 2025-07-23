<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\RequisitosCollection;
use App\Models\Requisitos;
use Inertia\Inertia;

class RequisitosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        return Inertia::render('servicios/requisitos/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'servicio' => $id,
            'lista' => Requisitos::with('servicio.sede.ciudad.departamento')
                ->paginate(),
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
}
