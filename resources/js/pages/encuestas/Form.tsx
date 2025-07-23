import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

type ThisForm = {
    encuesta: string;
};

export const Form = ({ id, onReload, onClose }: any) => {
    const { data, setData, post, put, processing, errors, reset } = useForm<Required<ThisForm>>({
        encuesta: '',
    });

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
                if (errors.encuesta) {
                    reset('encuesta');
                }
            },
        };

        if (id) {
            put(route('encuestas.update', id), options);
        } else {
            post(route('encuestas.store'), options);
        }
    };

    useEffect(() => {
        reset();

        const onGetItem = async () => {
            if (!id) return;

            const { data: response } = await axios.get(route('encuestas.show', id));
            const item = response.data;

            setData({
                encuesta: item.encuesta,
            });
        };

        onGetItem();
    }, [id]);

    return (
        <div className="pt-6 pb-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="encuesta"> Encuesta </Label>

                            <Input
                                autoFocus
                                id="encuesta"
                                name="encuesta"
                                required
                                value={data.encuesta}
                                placeholder="Encuesta"
                                onChange={(e) => setData('encuesta', e.target.value)}
                            />

                            {errors.encuesta && <p className="mt-1 text-sm text-red-500">{errors.encuesta}</p>}
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
