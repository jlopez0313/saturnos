<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Traits\HasRole;
use App\Enums\UserRole;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRole;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'sedes_id',
        'role',
        'estado',
        'ventanillas_id',
        'servicios_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $append = ['estado_label'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
        ];
    }

    public function sede() {
        return $this->belongsTo(Sedes::class, 'sedes_id', 'id');
    }

    public function getEstadoLabelAttribute() {
        $lista = config('constants.estados');
        $valorEstado = $this->estado ? 'A' : 'I';

        $objeto = \Arr::first($lista, function($val, $key) use ($valorEstado) {
            return $val['id'] == $valorEstado;
        });

        return $objeto['estado'] ?? 'NA';
    }

    public function ventanilla() {
        return $this->belongsTo(Ventanillas::class, 'ventanillas_id', 'id');
    }

    public function servicio() {
        return $this->belongsTo(Servicios::class, 'servicios_id', 'id');
    }
}
