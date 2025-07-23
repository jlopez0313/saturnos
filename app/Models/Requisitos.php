<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Requisitos extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'requisitos';
    protected $guarded = [];

    public function servicio() {
        return $this->belongsTo(Servicios::class, 'servicios_id');
    } 

}
