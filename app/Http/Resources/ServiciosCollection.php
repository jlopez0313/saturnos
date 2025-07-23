<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ServiciosCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        if (is_null($this->resource)) {
            return [];
        }
        
        return $this->collection->map->only(
            'id',
            'sede',
            'codigo',
            'servicio',
            'requiere_documento',
            'tipo_documento',
            'texto_documento',
            'horario_inicial',
            'horario_final',
            'duracion',
            'prioritario',
            'estado',
            'estado_label',
        );
    }
}
