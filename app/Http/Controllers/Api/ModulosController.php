<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests\MarquesinasRequest;
use App\Http\Resources\MarquesinasResource;
use App\Models\Marquesinas;
use App\Models\Sedes;
use App\Models\User;
use Inertia\Inertia;


class ModulosController extends Controller
{
    public function servicios(Request $request)
    {
        $usuario = \Auth::user();

        $usuario->update([
            'ventanillas_id' => $request->ventanillas_id,
            'servicios_id' => $request->servicios_id,
        ]);
    }

    public function calificar(Request $request)
    {
        $usuario = \Auth::user();
        
    }
}
