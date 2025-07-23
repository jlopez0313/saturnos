<?php

namespace App\Traits;

use App\Enums\UserRole;
use Spatie\Permission\Traits\HasRoles;

trait HasRole
{
    use HasRoles;
    
    public function hasRole(UserRole | string $role): bool
    {
        $userRoleValue = $this->role instanceof UserRole ? $this->role->value : $this->role;

        if (is_string($role)) {
            return $userRoleValue === $role;
        }
        
        return $userRoleValue === $role->value;
    }

    public function isAdmin(): bool
    {
        return $this->hasRole(UserRole::ADMIN);
    }

    public function isAgente(): bool
    {
        return $this->hasRole(UserRole::AGENTE);
    }

    public function isOrientador(): bool
    {
        return $this->hasRole(UserRole::ORIENTADOR);
    }

    public function assignRole(UserRole $role): void
    {
        $this->update(['role' => $role]);
    }
}