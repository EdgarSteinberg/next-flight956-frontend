'use client'
import { create, getAll } from "@/services/api";
import { useContext, useEffect, useState } from "react";
import PaquetesForm from "./paqueteAdminForm";
import PaqueteRead from "./paqueteAdminRead";
import { toast } from 'react-toastify';
import Loading from "./loading";
import { ReservaContext } from "@/context/reservaContenxt";
import { useRouter } from "next/navigation";

export default function Paquetes() {
    const { user } = useContext(ReservaContext);
    const router = useRouter();
    const [provincias, setProvincia] = useState([]);
    const [hoteles, setHoteles] = useState([]);
    const [vuelos, setVuelos] = useState([]);
    const [paquetes, setPaquetes] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        destino: '',
        vuelo: '',
        hotel: '',
        desde_fecha: '',
        hasta_fecha: '',

    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Debes estar logeado');
            return router.push('/login');
        }

        if (user.role !== 'admin' && user.role !== 'premium') {
            return alert('No tienes los permisos sufiencientes!')
        }
        try {
            await create('paquetes', form); //metodo post
            const newPaquete = await getAll('paquetes')
            setPaquetes(newPaquete),
                toast.success('Paquete creado correctamente!');
        } catch (error) {
            setError(error);
            return;
        }


        setForm({
            destino: '',
            vuelo: '',
            hotel: '',
            desde_fecha: '',
            hasta_fecha: '',

        });
    };

    const endpoint = ['provincias', 'hoteles', 'vuelos', 'paquetes'];
    useEffect(() => {
        endpoint.forEach((end) => {
            getAll(end)
                .then(data => {
                    if (end === 'provincias') setProvincia(data);
                    if (end === 'hoteles') setHoteles(data);
                    if (end === 'vuelos') setVuelos(data);
                    if (end === 'paquetes') setPaquetes(data);
                })
                .catch(error => setError(error))
                .finally(() => setLoading(false))
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };


    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <PaquetesForm
                form={form}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                provincias={provincias}
                vuelos={vuelos}
                hoteles={hoteles}
                error={error}
            />

            <PaqueteRead
                paquetes={paquetes}
                error={error}
                setPaquetes={setPaquetes}
            />
        </>
    );
}
