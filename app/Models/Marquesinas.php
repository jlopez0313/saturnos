<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Marquesinas extends Model
{
    use HasFactory;
    use softDeletes;

    protected $table = 'marquesinas';
    protected $guarded = [];

    function sedes () {
        return $this->belongsToMany(Sedes::class, 'marquesinas_sedes', 'marquesinas_id', 'sedes_id')
            ->withPivot('id');
    }

}
