import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { showAlert } from '@/plugins/sweetalert';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Modulos de atención',
        href: '/modulos',
    },
];

type ThisForm = {
    ventanillas_id: string;
    servicios_id: string;
};

export default function Index({ auth, ventanillas, servicios }: any) {
    const { data, setData, post, put, processing, errors, reset } = useForm<Required<ThisForm>>({
        ventanillas_id: '',
        servicios_id: '',
    });

    const { flash }: any = usePage().props;

    const onHome = () => {
        window.location.href = '/modulos';
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        try {
            await axios.post(route('modulos.servicios'), data);
            showAlert('success', 'Ventanilla Registrada');

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Servicios" />

            <div className="pt-6 pb-12">
                <div className="max-w-7xl sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="ventanilla"> Ventanilla </Label>

                                <Select
                                    defaultValue={data.ventanillas_id}
                                    onValueChange={(value) => (value ? setData('ventanillas_id', value) : null)}
                                >
                                    <SelectTrigger className="flex w-full justify-start rounded-md border border-gray-300 px-3 py-2 text-sm">
                                        <SelectValue placeholder="Selecciona un valor" />
                                    </SelectTrigger>
                                    <SelectContent
                                        position="popper"
                                        align="start"
                                        side="bottom"
                                        sideOffset={3}
                                        className="rounded-md border border-gray-300 bg-white p-1 shadow-md"
                                    >
                                        {ventanillas.map((item: any, idx: number) => {
                                            return (
                                                <SelectItem key={idx} value={`${item.id}`}>
                                                    {' '}
                                                    {item.ventanilla}{' '}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>

                                {errors.ventanillas_id && <p className="mt-1 text-sm text-red-500">{errors.ventanillas_id}</p>}
                            </div>

                            <div>
                                <Label htmlFor="servicio"> Servicio </Label>

                                <Select
                                    defaultValue={data.ventanillas_id}
                                    onValueChange={(value) => (value ? setData('servicios_id', value) : null)}
                                >
                                    <SelectTrigger className="flex w-full justify-start rounded-md border border-gray-300 px-3 py-2 text-sm">
                                        <SelectValue placeholder="Selecciona un valor" />
                                    </SelectTrigger>
                                    <SelectContent
                                        position="popper"
                                        align="start"
                                        side="bottom"
                                        sideOffset={3}
                                        className="rounded-md border border-gray-300 bg-white p-1 shadow-md"
                                    >
                                        {servicios.map((item: any, idx: number) => {
                                            return (
                                                <SelectItem key={idx} value={`${item.id}`}>
                                                    {' '}
                                                    {item.servicio}{' '}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>

                                {errors.servicios_id && <p className="mt-1 text-sm text-red-500">{errors.servicios_id}</p>}
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            <Button
                                variant={'outline'}
                                className="mx-4 ms-4"
                                disabled={processing}
                                type="button"
                                onClick={() => {
                                    reset();
                                    onClose();
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button disabled={processing}>
                                Guardar
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
