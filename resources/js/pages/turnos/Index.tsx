import { Modal } from '@/Components/ui/Modal';
import AppLayout from '@/layouts/app-layout';
import { showAlert } from '@/plugins/sweetalert';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Form } from './Form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Turnos',
        href: '/turnos',
    },
];

export default function Index({ auth, servicios }: any) {
    const currentUrl = usePage().url;
    const { flash }: any = usePage().props;
    
    const [servicio, setServicio] = useState<any>({});
    const [show, setShow] = useState(false);

    const onGenerar = (servicio: any) => {
        setServicio(servicio);
        setShow(true);
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
            <Head title="Generar turnos" />

            <div className="px-8 py-6">
                <div className="overflow-x-auto">
                    <table className="mb-15 w-full whitespace-nowrap">
                        <tbody>
                            {servicios.map((item: any, idx: number) => {
                                return (
                                    <tr key={idx} className="focus-within:bg-gray-100 hover:bg-gray-100" onClick={() => onGenerar(item)}>
                                        <td className="border px-6 pt-5 pb-4 text-center"> {item.servicio} </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <Modal show={show} closeable={true} title={servicio.servicio}>
                    <Form
                        servicio={servicio}
                        onClose={() => {
                            setShow(false);
                            setServicio({});
                        }}
                    />
                </Modal>
            </div>
        </AppLayout>
    );
}
