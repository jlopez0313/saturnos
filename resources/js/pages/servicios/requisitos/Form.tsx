import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

type ThisForm = {
    servicios_id: string;
    requisito: string;
};

export const Form = ({ id, servicio, onReload, onClose }: any) => {
    const { data, setData, post, put, processing, errors, reset } = useForm<Required<ThisForm>>({
        servicios_id: servicio,
        requisito: '',
    });

    const [resetKey, setResetKey] = useState(Date.now());

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                reset();
                onClose();
                onReload();
            },
            onError: (errors: any) => {
                console.log(errors);
                if (errors.requisito) {
                    reset('requisito');
                }
            },
        };

        if (id) {
            put(route('requisitos.update', id), options);
        } else {
            post(route('requisitos.store'), options);
        }
    };

    useEffect(() => {
        reset();

        const onGetItem = async () => {
            if (!id) return;

            const { data: response } = await axios.get(route('requisitos.show', id));
            const item = response.data;

            setData({
                servicios_id: servicio,
                requisito: item.requisito,
            });

            setResetKey(Date.now());
        };

        onGetItem();
    }, [id]);


    useEffect(() => {
        console.log( servicio )
    }, [servicio])

    return (
        <div className="pt-6 pb-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="requisito"> Requisito </Label>

                            <Input
                                autoFocus
                                id="requisito"
                                name="requisito"
                                required
                                value={data.requisito}
                                placeholder="Requisito"
                                onChange={(e) => setData('requisito', e.target.value)}
                            />

                            {errors.requisito && <p className="mt-1 text-sm text-red-500">{errors.requisito}</p>}
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
    );
};
