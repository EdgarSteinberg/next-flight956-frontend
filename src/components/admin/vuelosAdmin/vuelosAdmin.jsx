"use client";
import { useContext, useEffect, useState } from "react";
import { create, createSinArchivo, getAll } from "@/services/api";
import VuelosForm from "./vuelosAdminForm";
import VuelosRead from "./vuelosAdminRead";
import { toast } from 'react-toastify';
import Loading from "./loading";
import { ReservaContext } from "@/context/reservaContenxt";
import { useRouter } from "next/navigation";

export default function Vuelos() {
    const { user } = useContext(ReservaContext);
    const [error, setError] = useState(null);
    const [vuelos, setVuelos] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (form, resetForm) => {
        if (!user) {
            alert(`Tienes que estar logeado!`)
            return router.push('/login');
        }

        if (user.role !== 'admin' && user.role !== 'premium') {
            return alert('No tienes los permisos suficientes')
        }
        const vueloFormateado = {
            ...form,
            precio: Number(form.precio),
            asientos_disponibles: Number(form.asientos_disponibles),
            incluye_equipaje: form.incluye_equipaje === true || form.incluye_equipaje === "true",
            pasajeros: [form.pasajeros],
        };

        try {
            await createSinArchivo('vuelos', vueloFormateado); // metodo post 
            toast.success('¡Vuelo creado exitosamente!');
            const newVuelo = await getAll('vuelos');
            setVuelos((prevVuelos) => [...prevVuelos, newVuelo[newVuelo.length - 1]]);
            resetForm({ // reseteamos el form desde el hijo
                empresa: "",
                origen: "",
                destino: "",
                vuelo_ida: "",
                vuelo_vuelta: "",
                precio: "",
                duracion: "",
                clase: "Económica",
                asientos_disponibles: "",
                incluye_equipaje: false,
                pasajeros: ""
            });
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const endpoint = ['vuelos', 'provincias'];

    useEffect(() => {
        getAll('vuelos')
            .then(data => setVuelos(data))
            .catch(error => setError(error));
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <VuelosForm
                onSubmit={handleSubmit}
            />

            <VuelosRead
                vuelos={vuelos}
                setError={setError}
                setVuelos={setVuelos}
            />
        </>
    );
}
