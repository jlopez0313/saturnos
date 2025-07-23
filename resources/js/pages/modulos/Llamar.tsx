import { Button } from '@/components/ui/button';
import { useResponsiveVoice } from '@/hooks/useResponsiveVoice';
import AppLayout from '@/layouts/app-layout';
import { showAlert } from '@/plugins/sweetalert';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Modulos de Atención',
        href: '/modulos',
    },
];

export default function Index({ auth, turno }: any) {
    
    const voiceReady = useResponsiveVoice();

    const currentUrl = usePage().url;
    const { flash }: any = usePage().props;

    const onCall = () => {
        const metin=(`Casilla ${ auth.user.ventanilla.ventanilla }. Turno ${turno.servicio?.codigo}; ${turno.id}`);
        if (window.responsiveVoice) {
            window.responsiveVoice.speak(metin, 'Spanish Female');
        }
    }

    const onHome = () => {
        window.location.href = '/modulos';
    };

    const onAceptar = async () => {
    };

    const onDespistado = async () => {
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
            <script src=""></script>
            <Head title="Turnos" />

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
                                <td className="border px-6 pt-5 pb-4"> {turno.servicio?.servicio} </td>
                                <th className="border px-6 pt-5 pb-4"> Modulo de atencion: </th>
                                <td className="border px-6 pt-5 pb-4"> {auth.user.ventanilla.ventanilla} </td>
                            </tr>
                            <tr className="focus-within:bg-gray-100 hover:bg-gray-100">
                                <th className="border px-6 pt-5 pb-4"> Turno: </th>
                                <td className="border px-6 pt-5 pb-4"> {turno.servicio.codigo} - {turno.id} </td>
                                <th className="border px-6 pt-5 pb-4"> Nombre e Identificacion:	 </th>
                                <td className="border px-6 pt-5 pb-4"> {turno.documento} </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>

            <div className="flex w-full items-center justify-center justify-evenly px-4 pt-4">
                <Button variant={'outline'} className="me-3" onClick={() => onCall()}>
                    {' '}
                    Llamar Turno{' '}
                </Button>
                <Button className="me-3" onClick={() => onAceptar()}>
                    {' '}
                    Aceptar Turno{' '}
                </Button>
                <Button variant={'destructive'} className="me-3" onClick={() => onDespistado()}>
                    {' '}
                    Turno Despistado{' '}
                </Button>
            </div>

            
        </AppLayout>
    );
}
