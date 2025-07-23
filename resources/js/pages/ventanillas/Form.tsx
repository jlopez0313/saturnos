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
    sedes_id: string;
    ventanilla: string;
    tiene_encuesta: boolean;
    estado: boolean;
};

export const Form = ({ id, onReload, onClose }: any) => {
    const { data, setData, post, put, processing, errors, reset } = useForm<Required<ThisForm>>({
        departamentos_id: '',
        ciudades_id: '',
        sedes_id: '',
        ventanilla: '',
        tiene_encuesta: false,
        estado: false,
    });

    const [resetKey, setResetKey] = useState(Date.now());
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [S_N, setS_N] = useState([]);
    const [estados, setEstados] = useState([]);

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
                if (errors.ventanilla) {
                    reset('ventanilla');
                }
            },
        };

        if (id) {
            put(route('ventanillas.update', id), options);
        } else {
            post(route('ventanillas.store'), options);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const [{ data: {data: departamentos} }, { data: constants }] = await axios.all([
                    axios.get(route('departamentos.index')),
                    axios.get(route('constants')),
                ]);
                setDepartamentos(departamentos);
                setEstados(constants.estados);
                setS_N(constants.S_N);

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

            const { data: response } = await axios.get(route('ventanillas.show', id));
            const item = response.data;

            setData({
                departamentos_id: item.sede?.ciudad?.departamento?.id.toString() ?? '',
                ciudades_id: item.sede?.ciudad?.id.toString() ?? '',
                sedes_id: item.sede?.id.toString() ?? '',
                ventanilla: item.ventanilla,
                tiene_encuesta: item.tiene_encuesta == 1 ? true : false,
                estado: item.estado == 1 ? true : false,      
            });

            setResetKey(Date.now());
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

    useEffect(() => {
        const getData = async () => {
            if (!data.ciudades_id) return;
            try {
                const {
                    data: { data: sedes },
                } = await axios.get(route('sedes.ciudad', data.ciudades_id));

                setSedes(sedes);
            } catch (error) {
                console.error('Error fetching data:', error);
                showAlert('error', 'No se pudieron cargar algunos datos');
            }
        };

        getData();
    }, [data.ciudades_id]);

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
                                onValueChange={(value) => (value ? setData('departamentos_id', value) : null)}
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
                                onValueChange={(value) => (value ? setData('ciudades_id', value) : null)}
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
                            <Label htmlFor="sedes_id"> Sede </Label>

                            <Select
                                key={`sedes_id-${resetKey}`}
                                defaultValue={data.sedes_id}
                                onValueChange={(value) => (value ? setData('sedes_id', value) : null)}
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
                                    {sedes.map((item: any, idx: number) => {
                                        return (
                                            <SelectItem key={idx} value={`${item.id}`}>
                                                {' '}
                                                {item.sede}{' '}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>

                            {errors.sedes_id && <p className="mt-1 text-sm text-red-500">{errors.sedes_id}</p>}
                        </div>

                        <div>
                            <Label htmlFor="ventanilla"> Ventanilla </Label>

                            <Input
                                autoFocus
                                id="ventanilla"
                                name="ventanilla"
                                required
                                value={data.ventanilla}
                                placeholder="Ventanilla"
                                onChange={(e) => setData('ventanilla', e.target.value)}
                            />

                            {errors.ventanilla && <p className="mt-1 text-sm text-red-500">{errors.ventanilla}</p>}
                        </div>

                        <div>
                            <Label htmlFor="estado"> Tiene Encuesta? </Label>

                            <Select
                                key={`tiene_encuesta-${resetKey}`}
                                defaultValue={data.tiene_encuesta ? 'S' : 'N'}
                                onValueChange={(value) => (value ? setData('tiene_encuesta', value == 'S' ? true : false) : null)}
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
                                    {S_N.map((item: any, idx: number) => {
                                        return (
                                            <SelectItem key={idx} value={`${item.id}`}>
                                                {' '}
                                                {item.valor}{' '}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>

                            {errors.tiene_encuesta && <p className="mt-1 text-sm text-red-500">{errors.tiene_encuesta}</p>}
                        </div>

                        <div>
                            <Label htmlFor="estado"> Estado </Label>

                            <Select
                                key={`estado-${resetKey}`}
                                defaultValue={data.estado ? 'A' : 'I'}
                                onValueChange={(value) => (value ? setData('estado', value == 'A' ? true : false) : null)}
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
                                    {estados.map((item: any, idx: number) => {
                                        return (
                                            <SelectItem key={idx} value={`${item.id}`}>
                                                {' '}
                                                {item.estado}{' '}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>

                            {errors.estado && <p className="mt-1 text-sm text-red-500">{errors.estado}</p>}
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
