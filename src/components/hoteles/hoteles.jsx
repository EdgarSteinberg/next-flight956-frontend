'use client'

import Image from "next/image";
import { getAll } from "@/services/api";
import { useEffect, useState } from "react";
import { Card, Row, Col } from 'antd';
import styles from './styles.module.css';
import { useRouter } from "next/navigation";
import HotelesForm from "./hotelesForm";
import HotelesList from "./hotelesList";
import Loading from "./loading";


export default function Hoteles() {
    const router = useRouter();

    const [loading, setLoading] = useState(true)
    const [hoteles, setHoteles] = useState([]);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [buscarVisible, setBuscarVisible] = useState(''); // <- esto muestra el nombre
    const [hotelSeleccionadoId, setHotelSeleccionadoId] = useState('');
    const [mostrarDropdown, setMostrarDropdown] = useState(false);

    // Traemos todos los hoteles al principio
    useEffect(() => {
        getAll('hoteles')
            .then(data => { console.log(`hoteles`, data), setHoteles(data) })
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, []);


    // Filtra hoteles por nombre
    const hotelesFiltrados = hoteles.filter(hot =>
        hot.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Manejamos el click en una opción filtrada
    const handleSeleccion = (id, nombre) => {
        setHotelSeleccionadoId(id);   // Guardamos el ID
        setBusqueda(nombre);          // Mostramos el nombre en el input
    };


    // Manejamos el envío
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ID enviado:", hotelSeleccionadoId);
        if (hotelSeleccionadoId) {
            router.push(`/hoteles/${hotelSeleccionadoId}`);
        }
    };

    if(loading){
        return <Loading/>
    }

    return (
        <>
            <HotelesForm
                handleSubmit={handleSubmit}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                hotelesFiltrados={hotelesFiltrados}
                handleSeleccion={handleSeleccion}
                mostrarDropdown={mostrarDropdown}
                setMostrarDropdown={setMostrarDropdown}

            />

            <HotelesList hoteles={hoteles} />
        </>
    );
}
