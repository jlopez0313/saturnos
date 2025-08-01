import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showAlert } from "@/plugins/sweetalert";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler, useEffect, useState } from "react";

type ThisForm = {
    name: string;
    email: string;
    role: string;
    password: string;
    password_confirmation: string;
    departamentos_id: string;
    ciudades_id: string;
    sedes_id: string;
    estado: boolean;
};

export const Form = ({ id, roles, onReload, onClose }: any) => {

    const { data, setData, post, put, processing, errors, reset } = useForm<Required<ThisForm>>({
        name: '',
        email: '',
        role: 'orientador',
        departamentos_id: '',
        ciudades_id: '',
        sedes_id: '',
        password: '',
        password_confirmation: '',
        estado: false
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
                console.log( errors )
                if (errors.name) {
                    reset('name');
                }
            },
        };

        if (id) {
            put(route('usuarios.update',id), options);
        } else {
            post(route('usuarios.store'), options);
        }
    };

    const onGetItem = async () => {

        const { data: response } = await axios.get(route('usuarios.show', id));
        const item = response.data;

        setData({
            name: item.name,
            email: item.email,
            role: item.role ?? 'orientador',
            password: '',
            password_confirmation: '',
            departamentos_id: item.sede?.ciudad?.departamento?.id.toString() ?? '',
            ciudades_id: item.sede?.ciudad?.id.toString() ?? '',
            sedes_id: item.sede?.id.toString() ?? '',
            estado: item.estado == 1 ? true : false,
        });

        setResetKey(Date.now())
    }

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
        if (id) onGetItem();
    }, [id])

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
        <div className="pb-12 pt-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                            <Label htmlFor="name"> Nombre </Label>

                            <Input
                                autoFocus
                                id="name"
                                name="name"
                                required
                                value={data.name}
                                placeholder="Nombre"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="email"> Email </Label>

                            <Input
                                autoFocus
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={data.email}
                                placeholder="Email"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <Label htmlFor="role"> Rol </Label>
                            <Select
                                key={`role-${resetKey}`}
                                defaultValue={data.role}
                                onValueChange={(value) => setData('role', value)}
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
                                    {roles.map((item: any, idx: number) => {
                                        return (
                                            <SelectItem key={idx} value={`${item}`}>
                                                {' '}
                                                {item}{' '}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>

                            {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                        </div>

                        <div>
                            <Label htmlFor="password"> Contraseña </Label>

                            <Input
                                autoFocus
                                type="password"
                                id="password"
                                name="password"
                                required={!id}
                                value={data.password}
                                placeholder="Contraseña"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        
                        <div>
                            <Label htmlFor="email"> Confirmar Contraseña </Label>

                            <Input
                                autoFocus
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                required={!id}
                                value={data.password_confirmation}
                                placeholder="Confirmar Contraseña"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            
                            {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
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

                    <div className="flex items-center justify-end mt-4">
                        <Button
                            variant={"outline"}
                            className="ms-4 mx-4"
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
