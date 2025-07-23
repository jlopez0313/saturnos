import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
type ThisForm = {
    servicios_id: string;
    documento: string;
};

export const Form = ({ servicio, onClose }: any) => {
    const { data, setData, post, errors, reset } = useForm<Required<ThisForm>>({
        servicios_id: servicio.id,
        documento: '',
    });

    const [processing, setProcessing] = useState(false);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        try {
            setProcessing(true);
            const {
                data: { data: turno },
            } = await axios.post(route('turnos.store'), data);
            setProcessing(false);
            onClose();
            onPrint(turno.id);
        } catch (error) {
            setProcessing(false);
            console.log(error);
        }
    };

    const onPrint = (id: number) => {
        window.open(route('turnos.print', { id: id }), '_blank');
    };

    return (
        <div className="pt-6 pb-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <form onSubmit={submit}>
                    {servicio.requisitos?.length && (
                        <div className="mb-5">
                            <ul>
                                {servicio.requisitos.map((item: any, idx: number) => {
                                    return <li key={idx}> {item.requisito}</li>;
                                })}
                            </ul>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Label htmlFor="departamentos_id"> {servicio.texto_documento} </Label>

                            <Input
                                type={servicio.tipo_documento}
                                autoFocus
                                id="servicios_id"
                                name="servicios_id"
                                required
                                value={data.documento}
                                placeholder={servicio.texto_documento}
                                onChange={(e) => setData('documento', e.target.value)}
                            />

                            {errors.documento && <p className="mt-1 text-sm text-red-500">{errors.documento}</p>}
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
                            Generar
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
