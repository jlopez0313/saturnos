import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { showAlert } from '@/plugins/sweetalert';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { Check, LoaderCircle, X } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

type ThisForm = {
    departamentos_id: string;
    ciudades_id: string;
    sedes_id: string;
    codigo: string;
    servicio: string;
    requiere_documento: boolean;
    tipo_documento: string;
    texto_documento: string;
    horario_inicial: string;
    horario_final: string;
    duracion: string;
    prioritario: boolean;
    estado: boolean;
};

export const Form = ({ id, onReload, onClose }: any) => {
    const { data, setData, post, put, processing, errors, reset } = useForm<Required<ThisForm>>({
        departamentos_id: '',
        ciudades_id: '',
        sedes_id: '',
        codigo: '',
        servicio: '',
        requiere_documento: false,
        tipo_documento: '',
        texto_documento: '',
        horario_inicial: '',
        horario_final: '',
        duracion: '',
        prioritario: false,
        estado: true,
    });

    const [resetKey, setResetKey] = useState(Date.now());
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [estados, setEstados] = useState([]);
    const [sedes, setSedes] = useState([]);

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
                if (errors.servicio) {
                    reset('servicio');
                }
            },
        };

        if (id) {
            put(route('servicios.update', id), options);
        } else {
            post(route('servicios.store'), options);
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
                sedes_id: item.sede?.id.toString() ?? '',
                codigo: item.codigo,
                servicio: item.servicio,
                requiere_documento: item.requiere_documento == 1 ? true : false,
                tipo_documento: item.tipo_documento,
                texto_documento: item.texto_documento,
                horario_inicial: item.horario_inicial,
                horario_final: item.horario_final,
                duracion: item.duracion,
                prioritario: item.prioritario == 1 ? true : false,
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
                            <Label htmlFor="codigo"> Código </Label>

                            <Input
                                autoFocus
                                id="codigo"
                                name="codigo"
                                required
                                value={data.codigo}
                                placeholder="Código"
                                onChange={(e) => setData('codigo', e.target.value)}
                            />

                            {errors.codigo && <p className="mt-1 text-sm text-red-500">{errors.codigo}</p>}
                        </div>

                        <div>
                            <Label htmlFor="servicio"> Servicio </Label>

                            <Input
                                autoFocus
                                id="servicio"
                                name="servicio"
                                required
                                value={data.servicio}
                                placeholder="Servicio"
                                onChange={(e) => setData('servicio', e.target.value)}
                            />

                            {errors.servicio && <p className="mt-1 text-sm text-red-500">{errors.servicio}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="codigo"> Requiere Documento?</Label>
                            <Toggle
                                pressed={data.requiere_documento}
                                onPressedChange={(value) => setData('requiere_documento', value)}
                                variant="outline"
                                aria-label="Estado"
                            >
                                {data.requiere_documento ? <Check /> : <X />}
                            </Toggle>
                            {errors.requiere_documento && <p className="mt-1 text-sm text-red-500">{errors.requiere_documento}</p>}
                        </div>

                        <div>
                            <Label htmlFor="tipo_documento"> Tipo de Documento </Label>

                            <Select
                                key={`tipo_documento-${resetKey}`}
                                defaultValue={data.tipo_documento}
                                onValueChange={(value) => (value ? setData('tipo_documento', value) : null)}
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
                                    <SelectItem value="number"> Alfanumérico </SelectItem>
                                    <SelectItem value="text"> Numérico </SelectItem>
                                </SelectContent>
                            </Select>

                            {errors.tipo_documento && <p className="mt-1 text-sm text-red-500">{errors.tipo_documento}</p>}
                        </div>

                        <div>
                            <Label htmlFor="texto_documento"> Texto de Documento </Label>

                            <Input
                                autoFocus
                                id="texto_documento"
                                name="texto_documento"
                                required
                                value={data.texto_documento}
                                placeholder="Texto de Documento"
                                onChange={(e) => setData('texto_documento', e.target.value)}
                            />

                            {errors.texto_documento && <p className="mt-1 text-sm text-red-500">{errors.texto_documento}</p>}
                        </div>

                        <div>
                            <Label htmlFor="horario_inicial"> Horario Inicial </Label>

                            <Input
                                type="time"
                                autoFocus
                                id="horario_inicial"
                                name="horario_inicial"
                                required
                                value={data.horario_inicial}
                                placeholder="Horario Inicial"
                                onChange={(e) => setData('horario_inicial', e.target.value)}
                            />

                            {errors.horario_inicial && <p className="mt-1 text-sm text-red-500">{errors.horario_inicial}</p>}
                        </div>

                        <div>
                            <Label htmlFor="horario_final"> Horario Final </Label>

                            <Input
                                type="time"
                                autoFocus
                                id="horario_final"
                                name="horario_final"
                                required
                                value={data.horario_final}
                                placeholder="Horario Inicial"
                                onChange={(e) => setData('horario_final', e.target.value)}
                            />

                            {errors.horario_final && <p className="mt-1 text-sm text-red-500">{errors.horario_final}</p>}
                        </div>

                        <div>
                            <Label htmlFor="duracion"> Duración por turno </Label>

                            <Input
                                type="number"
                                autoFocus
                                id="duracion"
                                name="duracion"
                                required
                                value={data.duracion}
                                placeholder="Duración por turno"
                                onChange={(e) => setData('duracion', e.target.value)}
                            />

                            {errors.duracion && <p className="mt-1 text-sm text-red-500">{errors.duracion}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="codigo"> Es servicio prioritario?</Label>
                            <Toggle
                                pressed={data.prioritario}
                                onPressedChange={(value) => setData('prioritario', value)}
                                variant="outline"
                                aria-label="Estado"
                            >
                                {data.prioritario ? <Check /> : <X />}
                            </Toggle>
                            {errors.prioritario && <p className="mt-1 text-sm text-red-500">{errors.prioritario}</p>}
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
