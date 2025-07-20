<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sedes extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'sedes';
    protected $guarded = [];

    public function ciudad() {
        return $this->belongsTo(Ciudades::class, 'ciudades_id');
    } 

}
