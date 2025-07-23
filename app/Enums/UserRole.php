<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case AGENTE = 'agente';
    case ORIENTADOR = 'orientador';
    
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function fromName(string $name): self
    {
        return match(strtolower($name)) {
            'admin' => self::ADMIN,
            'agente' => self::AGENTE,
            'orientador' => self::ORIENTADOR,
            default => throw new \ValueError("$name no es un valor válido")
        };
    }
}