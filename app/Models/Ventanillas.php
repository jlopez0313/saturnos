<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ventanillas extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'ventanillas';
    protected $guarded = [];
    protected $append = [
        'tiene_encuesta_label',
        'estado_label'
    ];

    public function sede() {
        return $this->belongsTo(Sedes::class, 'sedes_id');
    } 

    public function getTieneEncuestaLabelAttribute() {
        $lista = config('constants.S_N');
        $valorSN = $this->tiene_encuesta ? 'S' : 'N';

        $objeto = \Arr::first($lista, function($val, $key) use ($valorSN) {
            return $val['id'] == $valorSN;
        });

        return $objeto['valor'] ?? 'NA';
    } 

    public function getEstadoLabelAttribute() {
        $lista = config('constants.estados');
        $valorEstado = $this->estado ? 'A' : 'I';

        $objeto = \Arr::first($lista, function($val, $key) use ($valorEstado) {
            return $val['id'] == $valorEstado;
        });

        return $objeto['estado'] ?? 'NA';
    } 

    public function users() {
        return $this->hasMany(User::class, 'ventanillas_id');
    }

}
