<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Servicios extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'servicios';
    protected $guarded = [];
    protected $append = ['estado_label'];

    public function sede() {
        return $this->belongsTo(Sedes::class, 'sedes_id');
    } 

    public function getEstadoLabelAttribute() {
        $lista = config('constants.estados');
        $valorEstado = $this->estado ? 'A' : 'I';

        $objeto = \Arr::first($lista, function($val, $key) use ($valorEstado) {
            return $val['id'] == $valorEstado;
        });

        return $objeto['estado'] ?? 'NA';
    }

    public function requisitos() {
        return $this->hasMany(Requisitos::class, 'servicios_id');

    }

    public function turnos() {
        return $this->hasMany(Turnos::class, 'servicios_id');

    }

}
