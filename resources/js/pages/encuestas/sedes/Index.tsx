import { Button } from '@/components/ui/button';
import { Modal } from '@/Components/ui/Modal';
import { Pagination } from '@/components/ui/Table/Pagination';
import { Table } from '@/components/ui/Table/Table';
import AppLayout from '@/layouts/app-layout';
import { confirmDialog, showAlert } from '@/plugins/sweetalert';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Form } from './Form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Encuestas',
        href: '/encuestas',
    },
    {
        title: 'Sedes',
        href: '/sedes',
    },
];

export default function Index({ auth, encuesta, sedes }: any) {
    const currentUrl = usePage().url;
    const { flash }: any = usePage().props;
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const onTrash = async (id: number) => {
        const result = await confirmDialog({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
        });

        const sedeId = sedes.data.find((sede: any) => sede.id == id);

        if (result.isConfirmed) {
            router.delete(
                route('encuestas.remove_sede', {
                    encuesta: id,
                    sede: sedeId,
                }),
                {
                    preserveScroll: true,
                    onSuccess: async () => {
                        await showAlert('success', 'Registro eliminado');
                        const currentPage = sedes.current_page;
                        const remainingItems = sedes.data.length - 1;

                        if (remainingItems === 0 && currentPage > 1) {
                            router.visit(`/encuestas/${encuesta.id}/sedes?page=${currentPage - 1}`);
                        } else {
                            router.visit(`/encuestas/${encuesta.id}/sedes?page=${currentPage}`);
                        }
                    },
                    onError: () => showAlert('error', 'Error al eliminar'),
                },
            );
        }
    };

    const onReload = () => {
        router.visit(currentUrl, {
            preserveScroll: true,
        });
    };

    const onGoBack = () => {
        router.get('/servicios');
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

    useEffect(() => {
        const onSetData = () => {
            const data = sedes.data.map((sede: any) => {
                return {
                    id: sede.id,
                    encuesta: encuesta.encuesta,
                    sede: sede.sede ?? '',
                    ciuad: sede.ciudad?.ciudad ?? '',
                    departamento: sede.ciudad?.departamento?.departamento ?? '',
                };
            });
            setData(data);
        };

        onSetData();
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sedes" />

            <div className="flex w-full items-center justify-end px-4 pt-4">
                <Button variant={'outline'} className="me-3" onClick={onGoBack}>
                    {' '}
                    Regresar{' '}
                </Button>
                <Button onClick={() => setShow(true)}> Agregar </Button>
            </div>

            <div className="overflow-x-auto px-4">
                <Table
                    user={auth.user}
                    data={data}
                    titles={['Encuesta', 'Sede', 'Ciudad', 'Departamento']}
                    actions={[{ icon: Trash2, action: onTrash, title: 'Eliminar' }]}
                    onRow={() => {}}
                />

                <Pagination links={sedes.links} />

                <Modal show={show} closeable={true} title="Gestionar sedes">
                    <Form
                        encuesta={encuesta}
                        onReload={onReload}
                        onClose={() => {
                            setShow(false);
                        }}
                    />
                </Modal>
            </div>
        </AppLayout>
    );
}
