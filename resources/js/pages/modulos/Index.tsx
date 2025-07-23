import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { confirmDialog, showAlert } from '@/plugins/sweetalert';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Modulos de Atención',
        href: '/modulos',
    },
];

export default function Index({ auth, servicios, servicio }: any) {
    const currentUrl = usePage().url;
    const { flash }: any = usePage().props;
    const [id, setId] = useState<number | null>(null);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const onHome = () => {
        window.location.href = '/modulos';
    };

    const onCalificar = () => {
        router.visit(`/modulos/calificar`);
    };

    const onLimpiarServicio = async () => {
        const result = await confirmDialog({
            title: '¿Estás seguro?',
            text: '¡Claro que podrás reasignarte otro servicio!',
            icon: 'warning',
        });

        if (result.isConfirmed) {
            await axios.post(route('modulos.servicios', { usuario: auth.user.id }), {});
            showAlert('success', 'Servicio desasignado');

            onHome();
        }
    };

    useEffect(() => {
        if (flash?.success) {
            showAlert('success', flash.success);
        }
        if (flash?.error) {
            showAlert('error', flash.error);
        }
        if (flash?.warning) {
            showAlert('warning', flash.warning);
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sedes" />

            <div className="px-8 py-6">
                <div className="overflow-x-auto">
                    <table className="mb-15 w-full whitespace-nowrap">
                        <tbody>
                            <tr className="focus-within:bg-gray-100 hover:bg-gray-100">
                                <th className="border px-6 pt-5 pb-4"> Operador: </th>
                                <td className="border px-6 pt-5 pb-4"> {auth.user.name} </td>
                                <th className="border px-6 pt-5 pb-4"> Municipio: </th>
                                <td className="border px-6 pt-5 pb-4"> {auth.user.sede.ciudad.ciudad} </td>
                            </tr>
                            <tr className="focus-within:bg-gray-100 hover:bg-gray-100">
                                <th className="border px-6 pt-5 pb-4"> Servicio: </th>
                                <td className="border px-6 pt-5 pb-4"> {servicio.servicio} </td>
                                <th className="border px-6 pt-5 pb-4"> Modulo de atencion: </th>
                                <td className="border px-6 pt-5 pb-4"> {auth.user.ventanilla.ventanilla} </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="mb-6 w-full whitespace-nowrap">
                        <thead>
                            <tr className="text-left font-bold">
                                <th className="border px-6 pt-5 pb-4"> Llamado de Turnos </th>
                                <th className="border px-6 pt-5 pb-4"> Otros Servicios </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="focus-within:bg-gray-100 hover:bg-gray-100">
                                <td className="border px-6 pt-5 pb-4 text-center">
                                    <Button variant={'outline'} className="mb-9" onClick={() => onLimpiarServicio()}>
                                        {' '}
                                        Llamar Turno{' '}
                                    </Button>
                                    <br />
                                    <span> Turnos en cola: { servicio.turnos.length } </span>
                                </td>
                                <td className="border">
                                    <table className="w-full whitespace-nowrap">
                                        <thead>
                                            <tr className="text-left font-bold">
                                                <th className="border px-6 pt-5 pb-4"> Servicio </th>
                                                <th className="border px-6 pt-5 pb-4"> Llamado de Turnos </th>
                                                <th className="border px-6 pt-5 pb-4"> Turnos en cola </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {servicios.map(( item: any, idx: number) => {
                                                return (
                                                    <tr key={idx}>
                                                        <td className="border px-6 pt-5 pb-4">
                                                            {item.servicio}
                                                        </td>
                                                        <td className="border px-6 pt-5 pb-4 text-center">
                                                            <Button variant={'outline'} onClick={() => onLimpiarServicio()}>
                                                                {' '}
                                                                Llamar Turno{' '}
                                                            </Button>
                                                        </td>
                                                        <td className="border px-6 pt-5 pb-4 text-center">
                                                            { item.turnos.length }
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex w-full items-center justify-center justify-evenly px-4 pt-4">
                <Button variant={'outline'} className="me-3" onClick={() => onLimpiarServicio()}>
                    {' '}
                    Cambiar Servicio{' '}
                </Button>
                <Button className="me-3" onClick={() => onCalificar()}>
                    {' '}
                    Calificar{' '}
                </Button>
            </div>
        </AppLayout>
    );
}
