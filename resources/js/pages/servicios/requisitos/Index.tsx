import { Button } from '@/components/ui/button';
import { Modal } from '@/Components/ui/Modal';
import { Pagination } from '@/components/ui/Table/Pagination';
import { Table } from '@/components/ui/Table/Table';
import AppLayout from '@/layouts/app-layout';
import { confirmDialog, showAlert } from '@/plugins/sweetalert';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Edit3, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Form } from './Form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: '/servicios',
    },
    {
        title: 'Requisitos',
        href: '/requisitos',
    },
];

export default function Index({ auth, servicio, lista }: any) {
    const currentUrl = usePage().url;
    const { flash }: any = usePage().props;
    const [id, setId] = useState<number | null>(null);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const onEdit = (id: number) => {
        setId(id);
        setShow(true);
    };

    const onTrash = async (id: number) => {
        const result = await confirmDialog({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
        });

        if (result.isConfirmed) {
            router.delete(route('requisitos.destroy', id), {
                preserveScroll: true,
                onSuccess: async () => {
                    await showAlert('success', 'Registro eliminado');
                    const currentPage = lista.current_page;
                    const remainingItems = lista.data.length - 1;

                    if (remainingItems === 0 && currentPage > 1) {
                        router.visit(`/requisitos?page=${currentPage - 1}`);
                    } else {
                        router.visit(`/requisitos?page=${currentPage}`);
                    }
                },
                onError: () => showAlert('error', 'Error al eliminar'),
            });
        }
    };

    const onReload = () => {
        router.visit(currentUrl, {
            preserveScroll: true,
        });
    };

    const onGoBack = () => {
        router.get('/servicios')
    }

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
            const data = lista.data.map((item: any) => {
                return {
                    id: item.id,
                    requisito: item.requisito,
                    servicio: item.servicio?.servicio ?? '',
                    sede: item.servicio?.sede?.sede ?? '',
                    ciuad: item.servicio?.sede?.ciudad?.ciudad ?? '',
                    departamento: item.servicio?.sede?.ciudad?.departamento?.departamento ?? '',
                };
            });
            setData(data);
        };

        onSetData();
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Requisitos" />

            <div className="flex w-full items-center justify-end px-4 pt-4">
                <Button variant={'outline'} className='me-3' onClick={onGoBack}> Regresar </Button>
                <Button onClick={() => setShow(true)}> Agregar </Button>
            </div>

            <div className="overflow-x-auto px-4">
                <Table
                    user={auth.user}
                    data={data}
                    titles={['Requisito', 'Servicio', 'Sede', 'Ciudad', 'Departamento']}
                    actions={[
                        { icon: Edit3, action: onEdit, title: 'Editar' },
                        { icon: Trash2, action: onTrash, title: 'Eliminar' },
                    ]}
                    onRow={() => {}}
                />

                <Pagination links={lista.links} />

                <Modal show={show} closeable={true} title="Gestionar requisitos">
                    <Form
                        servicio={servicio}
                        id={id}
                        onReload={onReload}
                        onClose={() => {
                            setShow(false);
                            setId(null);
                        }}
                    />
                </Modal>
            </div>
        </AppLayout>
    );
}
