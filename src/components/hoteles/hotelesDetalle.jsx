'use client';
import { useParams } from "next/navigation";
import { useContext, useEffect, useState, useMemo } from "react";
import { Card, Row, Col } from 'antd';
import Image from "next/image";
import { FaSwimmingPool, FaStar, FaWifi, FaParking, FaUtensils, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import { ReservaContext } from "@/context/reservaContenxt";
import { agregarAlCarrito } from "@/services/api";
import { useRouter } from "next/navigation";
import styles from './styles.module.css';
import Loading from "./loading";

export default function HotelesDetalle() {
    const router = useRouter();
    const { agregarReserva, reservas, user, setReservas } = useContext(ReservaContext)
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [hotel, setHotel] = useState(null);
    const [error, setError] = useState(null);
    const [triggerAdd, setTriggerAdd] = useState(true);

    const nombresPorProvincia = {
        "Buenos Aires": "El Refugio del Sol",
        "Catamarca": "Costa Serena",
        "Chaco": "Sueños del Mar",
        "Chubut": "Montaña Dorada",
        "Córdoba": "Brisas del Valle",
        "Corrientes": "El Paraíso Azul",
        "Entre Ríos": "Amanecer Andino",
        "Formosa": "Encanto Serrano",
        "Jujuy": "Rincón del Norte",
        "La Pampa": "Bahía Escondida",
        "La Rioja": "Cielo Abierto",
        "Mendoza": "Estrella del Sur",
        "Misiones": "Horizonte Sereno",
        "Neuquén": "Luz de la Laguna",
        "Río Negro": "Oasis Patagónico",
        "Salta": "Puerta del Cielo",
        "San Juan": "Río Mágico",
        "San Luis": "Entre la Niebla",
        "Santa Cruz": "Mirador del Viento",
        "Santa Fe": "Cumbre de los Sueños",
        "Santiago del Estero": "El Descanso Real",
        "Tierra del Fuego": "El Fin del Mundo",
        "Tucumán": "Paraíso de la Montaña"
    };



    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:8080/api/hoteles/${id}`)
            .then(response => response.json())
            .then(json => {
                console.log(json.payload)
                setHotel(json.payload)
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [id])


    useEffect(() => {
        setTriggerAdd(true);
        setReservas([]);
    }, []);


    const handleReserva = async () => {
        if (!user) {
              alert("Debes iniciar sesión para agregar reservas al carrito.");
           return router.push('/login');
             
        }
        agregarReserva({
            id: hotel._id,
            referencia: "hotel"
        });

        await agregarAlCarrito('carts', user.cart, [
            {
                productoId: hotel._id,
                referencia: 'hotel',
                quantity: 1
            }
        ]);
    }

    function obtenerNombreDecorado(hotel) {
        // Aquí el nombre original de la provincia viene en hotel.location.name o country o como lo tengas
        const provincia = hotel?.location?.name || "";

        // Comparamos si el nombre del hotel es igual a la provincia
        if (hotel?.name === provincia) {
            // Si es igual, retornamos el nombre alternativo según la provincia
            return nombresPorProvincia[provincia] || hotel.name;
        }
        // Si no es igual, retornamos el nombre real del hotel
        return hotel.name;
    }

    if(loading){
        return <Loading/>
    }

    return (
        <div style={{width: '95%', margin: '0 auto'}}>
            <Row gutter={[20, 20]} >
                {hotel && (
                    <Col xs={24} md={24}>
                        <Card className={styles.poppins} >
                            <div style={{ display: 'flex', flexDirection: 'row', height: '30%' }}  >

                                <div style={{ flex: '1', position: 'relative', overflow: 'hidden' }} >
                                    {hotel.image && hotel.image.length > 0 ? (
                                        <Image
                                            src={`http://localhost:8080/image/hoteles/${hotel.image[0]}`}
                                            alt={`Imagen de ${hotel.name}`}
                                            style={{ objectFit: 'cover', borderRadius: '9px' }}
                                            priority
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw" // Aquí agregamos el sizes
                                        />
                                    ) : (
                                        <div style={{ height: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <p>No hay imagen disponible</p>
                                        </div>
                                    )}
                                </div>

                                <div style={{ flex: '1.2', padding: '16px', overflowY: 'auto' }}  >
                                    <p style={{ fontSize: '24px' }} className={styles.no_margin}>
                                        {'⭐'.repeat(hotel.stars)}
                                    </p>
                                    <p style={{ fontSize: '32px', fontWeight: 'bold' }} >  {obtenerNombreDecorado(hotel)}</p>
                                    <p><FaMapMarkerAlt style={{ color: 'black', fontSize: '24px' }} /> Ubicación: {hotel.name} - {hotel.location.country}</p>
                                    <p><FaParking style={{ color: 'black', fontSize: '24px' }} /> Parking gratuito, privado, en el alojamiento</p>
                                    <p><FaWifi style={{ color: 'black', fontSize: '24px' }} /> WiFi Gratis</p>
                                    <p><FaUtensils style={{ color: 'black', fontSize: '24px' }} /> Zona de cocina, cafetera, nevera</p>
                                    <p><FaEye style={{ color: 'black', fontSize: '24px' }} /> Vistas: Balcón</p>
                                    <button style={{ cursor: 'pointer', padding: '7px', width: '30%', borderRadius: '16px', fontSize: '16px', marginTop: '14px', background: '#4285F4', color: 'white', fontWeight: 'bold' }}
                                        onClick={handleReserva}
                                    >
                                        Reservar
                                    </button>
                                </div>

                            </div>


                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    )
}

 