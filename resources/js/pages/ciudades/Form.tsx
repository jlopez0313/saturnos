import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { showAlert } from '@/plugins/sweetalert';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

type ThisForm = {
    departamentos_id: string;
    ciudad: string;
};

export const Form = ({ id, onReload, onClose }: any) => {
    const { data, setData, post, put, processing, errors, reset } = useForm<Required<ThisForm>>({
        departamentos_id: '',
        ciudad: '',
    });

    const [resetKey, setResetKey] = useState(Date.now());
    const [departamentos, setDepartamentos] = useState([]);


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
                if (errors.ciudad) {
                    reset('ciudad');
                }
            },
        };

        if (id) {
            put(route('ciudades.update', id), options);
        } else {
            post(route('ciudades.store'), options);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const {
                    data: { data: departamentos },
                } = await axios.get(route('departamentos.index'));
                setDepartamentos(departamentos);
            } catch (error) {
                console.error('Error fetching data:', error);
                showAlert('error', 'No se pudieron cargar algunos datos');
            }
        };

        getData();
    }, []);

    useEffect(() => {
        reset();

        const onGetItem = async () => {
            if (!id) return;

            const { data: response } = await axios.get(route('ciudades.show', id));
            const item = response.data;

            setData({
                departamentos_id: item.departamento?.id.toString() || '',
                ciudad: item.ciudad || '',
            });

            setResetKey(Date.now());
        };

        onGetItem();
    }, [id]);

    return (
        <div className="pt-6 pb-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="departamentos_id"> Departamento </Label>

                            <Select
                                key={`departamentos_id-${resetKey}`}
                                defaultValue={data.departamentos_id}
                                onValueChange={(value) => value ? setData('departamentos_id', value) : null }
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
                                    {departamentos.map((item: any, idx: number) => {
                                        return (
                                            <SelectItem key={idx} value={`${item.id}`}>
                                                {' '}
                                                {item.departamento}{' '}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>

                            {errors.departamentos_id && <p className="mt-1 text-sm text-red-500">{errors.departamentos_id}</p>}
                        </div>

                        <div>
                            <Label htmlFor="ciudad"> Ciudad </Label>

                            <Input
                                autoFocus
                                id="ciudad"
                                name="ciudad"
                                required
                                value={data.ciudad}
                                placeholder="Ciudad"
                                onChange={(e) => setData('ciudad', e.target.value)}
                            />

                            {errors.ciudad && <p className="mt-1 text-sm text-red-500">{errors.ciudad}</p>}
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
