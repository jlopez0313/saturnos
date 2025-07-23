import { usePage } from '@inertiajs/react';

type Permission = {
    name: string;
};

export function usePermission() {
    const { props } = usePage();
    const permissions = props.auth?.permissions ?? [];

    return (permiso: string): boolean => {
        return permissions.some((p: string) => p == permiso);
    };
}
