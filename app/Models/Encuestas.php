<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Encuestas extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'encuestas';
    protected $guarded = [];

    protected $fillable = [
        'encuestas_id',
        'sedes_id',
        'estado'
    ];

    function sedes () {
        return $this->belongsToMany(Sedes::class, 'encuestas_sedes', 'encuestas_id', 'sedes_id')
            ->withPivot('id');
    }

}
