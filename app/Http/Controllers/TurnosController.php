<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\TurnosCollection;
use App\Models\Servicios;
use App\Models\Turnos;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class TurnosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $servicios = Servicios::where('sedes_id', \Auth::user()->sede->id)
            ->get();

        return Inertia::render('turnos/Index', [
            'filters' => Peticion::all('search', 'trashed'),
            'servicios' => $servicios,
        ]);
    }

    public function print(String $id) {
        $item = Turnos::with('servicio')
            ->find($id);
        
        $pdf = Pdf::loadView('pdf.turnos', compact('item'));
        
        return $pdf->download('turno_'.$id.'.pdf');
    }

}
