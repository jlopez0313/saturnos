import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/Table/Table';
import AppLayout from '@/layouts/app-layout';
import { showAlert } from '@/plugins/sweetalert';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Check, X } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/usuarios',
    },
    {
        title: 'Permisos',
        href: '/permisos',
    },
];

export default function Index({ auth, user, lista }: any) {
    const { flash }: any = usePage().props;
    const [data, setData] = useState<any>([]);
    const [form, setForm] = useState<any>({ ...user });

    const onGoBack = () => {
        router.get('/usuarios');
    };

    const onTogglePermission = (permission: string, given: boolean) => {
        const updatedPermissions = [...form.permissions];
        
        if (!given) {
            const filtered = updatedPermissions.filter((p: any) => p.name !== permission);
            setForm({ ...form, permissions: filtered });
        } else {
            updatedPermissions.push({ name: permission });
            setForm({ ...form, permissions: updatedPermissions });
        }
        
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        try {
            const data = {
                users_id: user.id,
                permisos: form.permissions.map((p: any) => p.name),
            };
            await axios.post(route('usuarios.sync', user.id), data);
            showAlert('success', 'Permisos Registrados');
            onGoBack();
        } catch (error) {
            console.log(error);
            showAlert('error', error);
        }
    };

    useEffect(() => {
        if (flash?.success) {
            showAlert('success', flash.success);
        }
        if (flash?.error) {
            showAlert('success', flash.error);
        }
        if (flash?.warning) {
            showAlert('warning', flash.warning);
        }
    }, [flash]);

    useEffect(() => {
        const onSetData = () => {
            const data = lista.map((item: any, idx: number) => {
                return {
                    id: idx,
                    usuario: user.name,
                    permiso: item.name,
                    autorizado: form.permissions.some((p: any) => p.name == item.name) ? (
                        <Check className="cursor-pointer" onClick={() => onTogglePermission(item.name, false)} />
                    ) : (
                        <X className="cursor-pointer" onClick={() => onTogglePermission(item.name, true)} />
                    ),
                };
            });
            setData(data);
        };

        onSetData();
    }, [form]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permisos" />

            <form onSubmit={submit}>
                <div className="overflow-x-auto px-4">
                    <Table user={auth.user} data={data} titles={['Usuario', 'Permiso', 'Autorizado']} onRow={() => {}} />
                </div>

                <div className="flex w-full items-center justify-end px-4">
                    <Button type="button" variant={'outline'} className="me-3" onClick={onGoBack}>
                        {' '}
                        Regresar{' '}
                    </Button>
                    <Button> Guardar </Button>
                </div>
            </form>
        </AppLayout>
    );
}
