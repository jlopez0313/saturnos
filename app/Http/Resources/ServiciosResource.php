<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiciosResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        if (is_null($this->resource)) {
            return [];
        }
        
        return [
            'id' => $this->id,
            'sede' => $this->sede,
            'codigo' => $this->codigo,
            'servicio' => $this->servicio,
            'requiere_documento' => $this->requiere_documento,
            'tipo_documento' => $this->tipo_documento,
            'texto_documento' => $this->texto_documento,
            'horario_inicial' => $this->horario_inicial,
            'horario_final' => $this->horario_final,
            'duracion' => $this->duracion,
            'prioritario' => $this->prioritario,
            'estado' => $this->estado,
            'estado_label' => $this->estado_label,
        ];
    }
}
