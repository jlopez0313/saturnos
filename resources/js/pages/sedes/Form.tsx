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
    ciudades_id: string;
    sede: string;
    direccion: string;
};

export const Form = ({ id, onReload, onClose }: any) => {
    const { data, setData, post, put, processing, errors, reset } = useForm<Required<ThisForm>>({
        departamentos_id: '',
        ciudades_id: '',
        sede: '',
        direccion: '',
    });

    const [resetKey, setResetKey] = useState(Date.now());
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);

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
                if (errors.sede) {
                    reset('sede');
                }
            },
        };

        if (id) {
            put(route('sedes.update', id), options);
        } else {
            post(route('sedes.store'), options);
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

            const { data: response } = await axios.get(route('sedes.show', id));
            const item = response.data;

            setData({
                departamentos_id: item.ciudad?.departamento?.id.toString() ?? '',
                ciudades_id: item.ciudad?.id.toString() ?? '',
                sede: item.sede ?? '',
                direccion: item.direccion ?? '',
            });

            setResetKey(Date.now())
        };

        onGetItem();
    }, [id]);

    useEffect(() => {
        const getData = async () => {
            if (!data.departamentos_id) return;
            try {
                const {
                    data: { data: ciudades },
                } = await axios.get(route('ciudades.departamento', data.departamentos_id));
                
                setCiudades(ciudades);
            } catch (error) {
                console.error('Error fetching data:', error);
                showAlert('error', 'No se pudieron cargar algunos datos');
            }
        };

        getData();
    }, [data.departamentos_id]);

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
                            <Label htmlFor="ciudades_id"> Ciudad </Label>

                            <Select
                                key={`ciudades_id-${resetKey}`}
                                defaultValue={data.departamentos_id}
                                onValueChange={(value) => value ? setData('ciudades_id', value) : null }
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
                                    {ciudades.map((item: any, idx: number) => {
                                        return (
                                            <SelectItem key={idx} value={`${item.id}`}>
                                                {' '}
                                                {item.ciudad}{' '}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>

                            {errors.ciudades_id && <p className="mt-1 text-sm text-red-500">{errors.ciudades_id}</p>}
                        </div>

                        <div>
                            <Label htmlFor="sede"> Sede </Label>

                            <Input
                                autoFocus
                                id="sede"
                                name="sede"
                                required
                                value={data.sede}
                                placeholder="Sede"
                                onChange={(e) => setData('sede', e.target.value)}
                            />

                            {errors.sede && <p className="mt-1 text-sm text-red-500">{errors.sede}</p>}
                        </div>

                        <div>
                            <Label htmlFor="direccion"> Dirección </Label>

                            <Input
                                autoFocus
                                id="direccion"
                                name="direccion"
                                required
                                value={data.direccion}
                                placeholder="Dirección"
                                onChange={(e) => setData('direccion', e.target.value)}
                            />

                            {errors.direccion && <p className="mt-1 text-sm text-red-500">{errors.direccion}</p>}
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
