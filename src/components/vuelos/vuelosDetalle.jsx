'use client'

import { useContext, useEffect, useState } from 'react';
import Image from "next/image";
import { Card, Row, Col } from 'antd';
import { useParams } from 'next/navigation';
import { ReservaContext } from '@/context/reservaContenxt';
import { agregarAlCarrito } from '@/services/api';
import { useRouter } from 'next/navigation';
import { FaCircle, FaDollarSign, FaPlane, FaUser, FaUserCircle } from 'react-icons/fa';
import styles from './styles.module.css';
import Loading from './loading';

export default function VuelosDetalle() {
    const router = useRouter()
    const { agregarReserva, reservas, setReservas, user } = useContext(ReservaContext);
    const { id } = useParams();
    const [vuelo, setVuelo] = useState(null);
    const [error, setError] = useState(null);
    const [triggerAdd, setTriggerAdd] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:8080/api/vuelos/${id}`)
            .then(response => response.json())
            .then(json => {
                setVuelo(json.payload)
            })
            .catch(error => setError(error.message))
            .finally(() => setLoading(false))
    }, [id]);


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
            id: vuelo._id,
            referencia: 'vuelo'
        });

        await agregarAlCarrito('carts', user.cart, [ // funcion agergarAlCarrito service api.js
            {
                productoId: vuelo._id,
                referencia: 'vuelo',
                quantity: 1
            }
        ]);
    };


    if (error) return <p>Error: {error}</p>;
    if (!vuelo) return <p className={styles.cargando}> <FaPlane styles={{marginLeft: '7px'}}/> Cargando vuelo...</p>;

    const formatearFecha = (fecha) => {
        const fechaFormateada = new Date(fecha).toLocaleDateString("es-AR", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
    };


    const formatearHora = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    function dividirPrecio(precio) {
        return (precio / 2).toFixed(2);
    }

    if(loading){
        return <Loading/>
    }

    return (
        <>
            <div style={{ display: 'flex', padding: '12px' }} className={styles.poppins}>
                <div style={{ flex: '1.2' }}>
                    {/* Encabezado vuelo de ida */}
                    <div style={{ margin: '35px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
                            <FaPlane style={{ color: '#565A60', fontSize: '2.5rem', flexShrink: 0 }} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p style={{ color: '#2F3143', fontSize: '16px', margin: '5px' }}>Elegí tu vuelo de ida</p>
                                <p style={{ color: '#2F3143', fontSize: '20px', fontWeight: '600', margin: '0' }}>
                                    {vuelo.destino?.name} ➡ {vuelo.origen?.name}
                                </p>

                            </div>
                        </div>
                    </div>

                    {/* Tarjeta vuelo de ida */}
                    <Row gutter={[20, 20]} style={{ margin: '0 auto', width: '100%' }}>
                        <Col xs={24} md={24}>
                            <Card title={formatearFecha(vuelo.vuelo_ida)} style={{ margin: '12px ', color: '#2f3143' }} className={styles.poppins}>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                    {/* Hora y origen */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p className={styles.no_margin} style={{ fontSize: '29px', color: '#2f3143', fontWeight: '600' }}>
                                            {formatearHora(vuelo.vuelo_ida)}
                                        </p>
                                        <p className={styles.no_margin}>{vuelo.origen?.name}</p>
                                    </div>

                                    {/* Línea + Avión + Línea */}
                                    <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, margin: '0 10px' }}>
                                        <div style={{ flex: 1, height: '2px', background: '#FDBE15' }}></div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p className={styles.no_margin}> {vuelo.duracion}</p>
                                            <FaPlane style={{ margin: '0 10px', color: '#565A60', fontSize: '1.2rem', marginBottom: '16px' }} />
                                        </div>
                                        <div style={{ flex: 1, height: '2px', background: '#FDBE15' }}></div>
                                    </div>

                                    {/* Hora y destino */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p className={styles.no_margin} style={{ fontSize: '29px', color: '#2f3143', fontWeight: '600' }}>
                                            {formatearHora(vuelo.vuelo_vuelta)}
                                        </p>
                                        <p className={styles.no_margin}>{vuelo.destino?.name}</p>
                                    </div>

                                    <div style={{ textAlign: 'center', marginLeft: '14px' }}>
                                        <p className={styles.no_margin} style={{ color: '#2f3143', fontSize: '12px', fontWeight: 'bold' }}>
                                            Tarifa base:
                                        </p>
                                        <p
                                            className={styles.no_margin}
                                            style={{ background: '#FDBE15', padding: '8px 16px', borderRadius: '20px' }}
                                        >
                                            <strong style={{ color: '#2f3143', fontSize: '16px' }}>
                                                <strong style={{ color: '#2f3143', fontSize: '11px' }}>$</strong>
                                                {dividirPrecio(vuelo.precio)}
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    {/* Encabezado vuelo de vuelta */}
                    <div style={{ margin: '35px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
                            <FaPlane style={{ color: '#565A60', fontSize: '2.5rem', flexShrink: 0 }} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p style={{ color: '#2F3143', fontSize: '16px', margin: '5px' }}>Elegí tu vuelo de vuelta</p>
                                <p style={{ color: '#2F3143', fontSize: '20px', fontWeight: '600', margin: '0' }}>
                                    {vuelo.origen?.name} ➡ {vuelo.destino?.name}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta vuelo de vuelta */}
                    <Row gutter={[20, 20]} style={{ margin: '0 auto', width: '100%' }}>
                        <Col xs={24} md={24}>
                            <Card title={formatearFecha(vuelo.vuelo_vuelta)} style={{ margin: '12px ', color: '#2f3143' }} className={styles.poppins}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                    {/* Hora y origen */}
                                    <div style={{ flexDirection: 'column' }}>
                                        <p className={styles.no_margin} style={{ fontSize: '29px', color: '#2f3143', fontWeight: '600' }}>
                                            {formatearHora(vuelo.vuelo_vuelta)}
                                        </p>
                                        <p className={styles.no_margin}>{vuelo.destino?.name}</p>
                                    </div>

                                    {/* Línea + Avión + Línea */}
                                    <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, margin: '0 10px' }}>
                                        <div style={{ flex: 1, height: '2px', background: '#FDBE15' }}></div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <p className={styles.no_margin}>{vuelo.duracion}</p>
                                            <FaPlane style={{ margin: '0 10px', color: '#565A60', fontSize: '1.2rem', transform: 'rotate(180deg)', marginBottom: '16px' }} />
                                        </div>
                                        <div style={{ flex: 1, height: '2px', background: '#FDBE15' }}></div>
                                    </div>

                                    {/* Hora y destino */}
                                    <div style={{ flexDirection: 'column' }}>
                                        <p className={styles.no_margin} style={{ fontSize: '29px', color: '#2f3143', fontWeight: '600' }}>
                                            {formatearHora(vuelo.vuelo_ida)}
                                        </p>
                                        <p className={styles.no_margin}>{vuelo.origen?.name}</p>
                                    </div>

                                    <div style={{ textAlign: 'center', marginLeft: '14px' }}>
                                        <p className={styles.no_margin} style={{ color: '#2f3143', fontSize: '12px', fontWeight: 'bold' }}>
                                            Tarifa base:
                                        </p>
                                        <p
                                            className={styles.no_margin}
                                            style={{ background: '#FDBE15', padding: '8px 16px', borderRadius: '20px' }}
                                        >
                                            <strong style={{ color: '#2f3143', fontSize: '16px' }}>
                                                <strong style={{ color: '#2f3143', fontSize: '11px' }}>$</strong>
                                                {dividirPrecio(vuelo.precio)}
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>






                {/* Columna lateral con detalles y botón */}
                <div style={{ flex: '0.7', marginTop: '16px' }} className={styles.poppins}>
                    <Row gutter={[20, 20]} style={{ margin: '0 auto', width: '100%', padding: ' 0' }}>
                        <Col xs={24} md={24}>
                            <Card title={
                                <div style={{ background: '#4F4C4D', color: 'white', padding: '8px', borderRadius: '5px 5px 0 0' }}>
                                    Tu Vuelo
                                </div>

                            } className={styles.poppins}>


                                <div style={{ display: 'flex', marginBottom: '9px' }}>
                                    <FaPlane style={{ color: '#565A60', fontSize: '1.5rem', flexShrink: 0, marginRight: '9px' }} />
                                    <p style={{ fontSize: '15px', fontWeight: 'bold' }} className={styles.poppins}>{vuelo.origen?.name} a {vuelo.destino?.name}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '2rem', fontSize: '12px' }}>
                                    {/* IDA */}
                                    <div style={{ flex: '1' }}>

                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '12px' }} className={styles.poppins}>
                                            <div style={{ flex: '1' }}>
                                                <p style={{ margin: 0, color: '#323439', fontWeight: '500', fontSize: '14px' }}>
                                                    {formatearFecha(vuelo.vuelo_ida)}
                                                </p>
                                                <p style={{ marginTop: '15px' }}>Empresa: {vuelo.empresa}</p>
                                            </div>

                                            <div style={{ flex: '1' }}>
                                                <p style={{ margin: 0, fontWeight: 'bold', letterSpacing: '1px', fontSize: '14px' }}>
                                                    {formatearHora(vuelo.vuelo_ida)}  <FaPlane style={{ margin: '0 10px', fontSize: '12px', marginBottom: '1px' }} /> {formatearHora(vuelo.vuelo_vuelta)}
                                                </p>
                                                <p style={{ marginTop: '15px' }}>Duracion: {vuelo.duracion}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* VUELTA */}
                                <div style={{ marginTop: '16px' }}>
                                    <div style={{ display: 'flex', marginBottom: '9px' }}>
                                        <FaPlane style={{ color: '#565A60', fontSize: '1.5rem', flexShrink: 0, marginRight: '9px' }} />
                                        <p style={{ fontSize: '15px', fontWeight: 'bold' }} className={styles.poppins}> {vuelo.destino?.name} a {vuelo.origen?.name}</p>
                                    </div>

                                    <div style={{ display: 'flex', gap: '2rem', fontSize: '12px' }}>
                                        <div style={{ flex: '1' }}>

                                            <div style={{ display: 'flex', gap: '1rem', marginTop: '12px' }} className={styles.poppins}>
                                                <div style={{ flex: '1' }}>
                                                    <p style={{ margin: 0, color: '#323439', fontWeight: '500', fontSize: '14px' }}>
                                                        {formatearFecha(vuelo.vuelo_vuelta)}
                                                    </p>
                                                    <p style={{ marginTop: '12px' }}>Empresa: {vuelo.empresa}</p>
                                                </div>

                                                <div style={{ flex: '1' }}>
                                                    <p style={{ margin: 0, fontWeight: 'bold', letterSpacing: '1px', fontSize: '14px' }}>
                                                        {formatearHora(vuelo.vuelo_vuelta)}  <FaPlane style={{ margin: '0 10px', fontSize: '12px', marginBottom: '1px' }} /> {formatearHora(vuelo.vuelo_vuelta)}
                                                    </p>
                                                    <p style={{ marginTop: '12px' }}>Duracion: {vuelo.duracion}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', alignItems: 'center' }} className={styles.poppins}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaUserCircle style={{ fontSize: '1.3rem' }} />
                                        <p className={styles.no_margin}>1 pasajero</p>
                                    </div>

                                    <p style={{ fontSize: '15px', fontWeight: 'bold', margin: '0' }} className={styles.poppins}> ${vuelo.precio}</p>
                                </div>
                                <div style={{ flex: 1, height: '2px', background: '#FDBE15', marginBottom: '12px' }}></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ fontSize: '20px', fontWeight: 'bold' }} className={styles.poppins}>Total:</p>
                                    <p style={{ fontSize: '20px', fontWeight: 'bold' }} className={styles.poppins}> ${vuelo.precio}</p>

                                </div>
                                <button type='submit' onClick={handleReserva} style={{ width: '100%', borderRadius: '12px', padding: '7px', background: '#FDBE15' }} className={styles.poppins}>Comprar</button>
                            </Card>

                        </Col>
                    </Row>
                </div>
            </div>

        </>
    );
}

