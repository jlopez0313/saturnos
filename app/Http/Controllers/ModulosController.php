<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as Peticion;
use App\Http\Resources\EncuestasCollection;
use App\Models\Ventanillas;
use App\Models\Servicios;
use App\Models\Encuestas;
use App\Models\Turnos;
use App\Models\User;
use Inertia\Inertia;

class ModulosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = \Auth::user();

        if( !$user->ventanilla && !$user->servicio ) {
            return redirect()->to('modulos/servicios');
        } else {
            return Inertia::render('modulos/Index', [
                'filters' => Peticion::all('search', 'trashed'),
                'servicios' => Servicios::with('turnos')->get(),
                'servicio' => Servicios::with('turnos')->find($user->servicio->id),
            ]);
        }

    }
    
    public function servicios()
    {
        $user = \Auth::user();

        return Inertia::render('modulos/Servicio', [
            'filters' => Peticion::all('search', 'trashed'),
            'ventanillas' => Ventanillas::where('sedes_id', $user->sedes_id)
                ->whereDoesntHave('users')
                ->where('estado', true)
                ->get(),
            'servicios' => Servicios::where('sedes_id', $user->sedes_id)
                ->where('estado', true)
                ->get(),
        ]);
    }

    public function calificar()
    {
        $user = \Auth::user();
        $pregunta = Encuestas::latest('id')->first();

        return Inertia::render('modulos/Calificar', [
            'filters' => Peticion::all('search', 'trashed'),
            'pregunta' => $pregunta,
        ]);
    }

    public function llamar(String $id)
    {
        $turno = Turnos::with('servicio')
            ->where('servicios_id', $id)
            ->first();

        $turno->update([
            'estado' => 'L'
        ]);

        return Inertia::render('modulos/Llamar', [
            'filters' => Peticion::all('search', 'trashed'),
            'turno' => $turno,
        ]);
    }


}
