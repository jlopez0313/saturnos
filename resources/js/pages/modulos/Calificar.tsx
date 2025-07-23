import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { showAlert } from '@/plugins/sweetalert';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Modulos de atención',
        href: '/modulos',
    },
    {
        title: 'Calificar Servicio',
        href: '/modulos/calificar',
    },
];

type ThisForm = {
    preguntas_id: string;
    respuesta: string;
};

export default function Index({ auth, pregunta }: any) {
    const { data, setData, post, put, processing, errors, reset } = useForm<Required<ThisForm>>({
        preguntas_id: '',
        respuesta: '',
    });

    const [hasAnswer, setHasAnswer] = useState(false);

    const { flash }: any = usePage().props;

    const onHome = () => {
        window.location.href = '/modulos';
    };

    const onSubmit = async () => {
        try {
            await axios.post(route('modulos.calificar'), data);
            showAlert('success', 'Calificación Registrada');

            onHome();
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
        data.respuesta && onSubmit();
    }, [data.respuesta]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Calificación" />

            <div className="pt-6 pb-12">
                <div className="max-w-7xl sm:px-6 lg:px-8">
                    <form>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <Label htmlFor="ventanilla"> Calificacion del servicio </Label>

                                <Input autoFocus id="name" name="name" required value={pregunta.encuesta} placeholder="Nombre" readOnly />
                            </div>

                            <div>
                                <Label htmlFor="respuesta"> Respuesta </Label>

                                <Input
                                    autoFocus
                                    id="respuesta"
                                    name="respuesta"
                                    required
                                    value={data.respuesta}
                                    placeholder="Respuesta"
                                    onChange={(e) => setData('respuesta', e.target.value)}
                                />

                                {errors.respuesta && <p className="mt-1 text-sm text-red-500">{errors.respuesta}</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
