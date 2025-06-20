'use client'
import { getAll } from "@/services/api";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import PaquetesForm from "./paquetesForm";
import PaquetesList from "./paquetesList";
import Loading from "./loading";
import { toast } from 'react-toastify';
import styles from './styles.module.css'


export default function Paquetes() {
    const router = useRouter();

    const [error, setError] = useState(null);
    const [paquetes, setPaquetes] = useState([]);
    const [buscar, setBuscar] = useState(''); // Estado para el input de búsqueda
    const [buscarVisible, setBuscarVisible] = useState(''); // <- esto muestra el nombre
    const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(null);
    const [paqueteDetalle, setPaqueteDetalle] = useState(null); // Detalle del paquete
    const [fecha_ida, setFecha_ida] = useState('');
    const [fecha_vuelta, setFecha_vuelta] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAll('paquetes')
            .then(data => {
                setPaquetes(data);
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, []);

    const paquetesFilter = paquetes.filter(paq =>
        paq.destino?.name?.toLowerCase().includes(buscar.toLowerCase())
    );


    const handlePaquete = (paq) => {
        setBuscar(''); // <- limpia el filtro
        setBuscarVisible(paq.destino.name); // <- muestra en el input
        setPaqueteSeleccionado(paq.destino._id); // <- guarda el _id
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!paqueteSeleccionado || !fecha_ida || !fecha_vuelta) {
            return toast.error('Faltan completar datos para la búsqueda');
        }
        console.log(paqueteSeleccionado, fecha_ida, fecha_vuelta);

        try {
            const url = `https://node-flight956-backend.onrender.com/api/paquetes/buscar?destino=${encodeURIComponent(paqueteSeleccionado)}&desde_fecha=${encodeURIComponent(fecha_ida)}&hasta_fecha=${encodeURIComponent(fecha_vuelta)}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.payload && data.payload.length === 1) {
                router.push(`/paquetes/${data.payload[0]._id}`);
            } else {
                toast.error('No se encontraron paquetes para esas fechas');
            }
        } catch (error) {
            console.log('Error al buscar paquetes:', error);
        }
    };


    if (loading) {
        return <Loading />
    }

    return (
        <>
            <PaquetesForm
                handleSubmit={handleSubmit}
                buscar={buscar}
                setBuscar={setBuscar}
                paquetesFilter={paquetesFilter}
                handlePaquete={handlePaquete}
                fecha_ida={fecha_ida}
                setFecha_ida={setFecha_ida}
                fecha_vuelta={fecha_vuelta}
                setFecha_vuelta={setFecha_vuelta}
                paqueteSeleccionado={paqueteSeleccionado}
                setPaqueteSeleccionado={setPaqueteSeleccionado}
                buscarVisible={buscarVisible}
                setBuscarVisible={setBuscarVisible}
            />

            <PaquetesList paquetes={paquetes} />

        </>
    );
}

