"use client";
import { useContext, useEffect, useState } from "react"
import CityForm from "./cityAdminForm";
import CityRead from "./cityAdminRead";
import { create, getAll } from "@/services/api";
import { toast } from 'react-toastify';
import Loading from "./loading";
import { ReservaContext } from "@/context/reservaContenxt";
import { useRouter } from "next/navigation";

export default function City() {
    const { user } = useContext(ReservaContext);
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [ciudad, setCiudad] = useState([])
    const [dataCity, setDataCity] = useState({
        name: '',
        country: '',
        provincia: ''
    });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log('user desde city admin', user)
        if (!user) {
            alert(`Debes estar logeado!`);
            return router.push('/login');
        }

        if(user.role !== 'admin' && user.role !== 'premium'){
            return alert(`No tienes los permisos suficientes!`)
        }
        try {
            await create("provincias", dataCity); // metodo post
            const newCiudad = await getAll('provincias');
            toast.success('¡Provincia creado exitosamente!');
            setCiudad(newCiudad);
        } catch (error) {
            toast.error(`Error al crear la ciudad ${error.message}`);
        }

        setDataCity({
            name: '',
            country: '',
            provincia: ''
        })
    };

    const handleOnChange = (e) => {
        const { name, files, value } = e.target;

        if (e.target.type === 'file') {
            setDataCity(prev => ({ ...prev, [name]: files[0] })); // Guardás el File object
        } else {
            setDataCity(prev => ({ ...prev, [name]: value }));
        }
    };

    useEffect(() => {
        getAll('provincias')
            .then(data => setCiudad(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <CityForm
                handleOnChange={handleOnChange}
                handleOnSubmit={handleOnSubmit}
                dataCity={dataCity}
            />

            <CityRead
                ciudad={ciudad}
                setCiudad={setCiudad}
                error={error}
            />
        </>
    );
}
