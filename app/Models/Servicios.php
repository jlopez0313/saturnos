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

    public function sede() {
        return $this->belongsTo(Sedes::class, 'sedes_id');
    } 

}
