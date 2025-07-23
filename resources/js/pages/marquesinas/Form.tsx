import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

type ThisForm = {
    marquesina: string;
};

export const Form = ({ id, onReload, onClose }: any) => {
    const { data, setData, post, put, processing, errors, reset } = useForm<Required<ThisForm>>({
        marquesina: '',
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
                if (errors.marquesina) {
                    reset('marquesina');
                }
            },
        };

        if (id) {
            put(route('marquesinas.update', id), options);
        } else {
            post(route('marquesinas.store'), options);
        }
    };

    useEffect(() => {
        reset();

        const onGetItem = async () => {
            if (!id) return;

            const { data: response } = await axios.get(route('marquesinas.show', id));
            const item = response.data;

            setData({
                marquesina: item.marquesina,
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
                            <Label htmlFor="marquesina"> Marquesina </Label>

                            <Input
                                autoFocus
                                id="marquesina"
                                name="marquesina"
                                required
                                value={data.marquesina}
                                placeholder="Marquesina"
                                onChange={(e) => setData('marquesina', e.target.value)}
                            />

                            {errors.marquesina && <p className="mt-1 text-sm text-red-500">{errors.marquesina}</p>}
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
