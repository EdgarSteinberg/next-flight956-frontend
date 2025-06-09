import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ReservaContext } from "@/context/reservaContenxt";
import Image from "next/image";
import { Card, Row, Col } from 'antd';
import { FaUserCircle, FaCheckCircle } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from "next/navigation";
import style from './styles.module.css';
import Loading from "./loading";
 

export default function PaqueteDetalle() {
    const { agregarReserva, user } = useContext(ReservaContext);
    const { id } = useParams();
    const [paquete, setPaquete] = useState(null);
    const [error, setError] = useState(null);
    const [tab, setTab] = useState('descripcion');
    const [startDate, setStartDate] = useState(new Date());
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:8080/api/paquetes/${id}`)
            .then(response => response.json())
            .then(json => {
                console.log(json.payload);
                setPaquete(json.payload);
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [id]);


    const agregarAlCarrito = async (reserva) => {

        if(!user){
            return router.push(`/login`)
        }

        const cartId = user.cart;
        console.log(cartId)
        try {
            const response = await fetch(`http://localhost:8080/api/carts/${cartId}/products/${reserva.productoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    referencia: reserva.referencia,
                    quantity: reserva.quantity
                })
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert('Todos los productos fueron agregados al carrito');
                router.push('/cart')
            } else {
                alert(`Error al agregar el paquete: ${data.error || 'Error desconocido'}`);
            }
        } catch (error) {
            setError(error.message);
        }
    };


    if (!paquete) return <Loading/>
    if (error) return <p>Error: {error}</p>;

    if(loading) {
        return <Loading/>
    }

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

    function cuotas(numero) {
        return (numero / 3).toFixed(2)
    }

    return (
        <div style={{ margin: '0 auto', width: '90%', marginTop: '12px' }}>

            <Row gutter={[20, 20]} align="middle">
                {/* Imagen */}
                <Col xs={24} md={16}>
                    <div style={{ height: '230px', position: 'relative', width: '100%' }}>
                        {paquete.destino?.image?.length > 0 ? (
                            <Image
                                src={`http://localhost:8080/image/provincias/${paquete.destino.image[0]}`}
                                alt={`Imagen de ${paquete.destino.name}`}
                                style={{ objectFit: 'cover', borderRadius: '12px 0' }}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        ) : (
                            <div style={{ height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <p>No hay imagen disponible</p>
                            </div>
                        )}
                    </div>

                    {/* Menu */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '12px',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            color: '#2D384C'
                        }}

                    >
                        <button
                            onClick={() => setTab('descripcion')}
                            style={{
                                border: 'none',
                                cursor: 'pointer',
                                background: 'transparent',
                                color: tab === 'descripcion' ? '#1677ff' : '#2D384C',
                                textDecoration: tab === 'descripcion' ? 'underline' : 'none',
                                fontWeight: 'bold'
                            }}
                            className={style.poppins}
                        >
                            Descripción
                        </button>

                        <button
                            onClick={() => setTab('fechas')}
                            style={{
                                border: 'none',
                                cursor: 'pointer',
                                background: 'transparent',
                                color: tab === 'fechas' ? '#1677ff' : '#2D384C',
                                textDecoration: tab === 'fechas' ? 'underline' : 'none',
                                fontWeight: 'bold'
                            }}
                            className={style.poppins}
                        >
                            Fechas y Precios
                        </button>

                        <button
                            onClick={() => setTab('vuelo')}
                            style={{
                                border: 'none',
                                cursor: 'pointer',
                                background: 'transparent',
                                color: tab === 'vuelo' ? '#1677ff' : '#2D384C',
                                textDecoration: tab === 'vuelo' ? 'underline' : 'none',
                                fontWeight: 'bold'
                            }}
                            className={style.poppins}
                        >
                            Vuelo
                        </button>

                        <button
                            onClick={() => setTab('hotel')}
                            style={{
                                border: 'none',
                                cursor: 'pointer',
                                background: 'transparent',
                                color: tab === 'hotel' ? '#1677ff' : '#2D384C',
                                textDecoration: tab === 'hotel' ? 'underline' : 'none',
                                fontWeight: 'bold'
                            }}
                            className={style.poppins}
                        >
                            Hotel
                        </button>
                    </div>


                    {/*Deciption */}
                    {tab === 'descripcion' && (
                        <Col xs={24} md={24}>
                            <Card style={{ color: '#2D384C', minHeight: '450px' }} className={style.poppins}>
                                <h2 style={{ fontSize: '20px', fontWeight: 'bold' }} className={style.no_margin}>{paquete.destino.name}, {paquete.destino.country}</h2>
                                <span style={{ fontSize: '13px', color: '#8290A6' }}>Paga en 3 cuotas sin interés </span>

                                <ul style={{ listStyle: 'none', padding: '0', marginTop: '12px' }}>
                                    <li><strong>Duración:</strong> {paquete.hotel.numberOfNights} noches </li>
                                    <li><strong>Destino:</strong> {paquete.destino.name} </li>
                                    <li><strong>Saliendo desde:</strong> {paquete.vuelo.origen.name}</li>
                                    <li><strong>Fecha de salida:</strong> {new Date(paquete.desde_fecha).toLocaleDateString()} </li>
                                    <li><strong>Pasajeros:</strong> 2 pasajeros, 1 habitación </li>
                                </ul>

                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>El precio incluye</p>

                                <p className={style.no_margin}><FaCheckCircle style={{ color: 'green', marginRight: '8px' }} />Incluye equipaje de mano (1 pieza de 8kg) y equipaje en bodega (1 pieza de 15kg)</p>
                                <p className={style.no_margin}><FaCheckCircle style={{ color: 'green', marginRight: '8px' }} />Traslado aeropuerto / hotel / aeropuertos</p>
                                <p className={style.no_margin}><FaCheckCircle style={{ color: 'green', marginRight: '8px' }} />Transferencia / Depósito</p>
                                <p className={style.no_margin}><FaCheckCircle style={{ color: 'green', marginRight: '8px' }} />{paquete.hotel.numberOfNights} noches de alojamiento con régimen desayuno</p>
                                <p className={style.no_margin}><FaCheckCircle style={{ color: 'green', marginRight: '8px' }} />Asistencia al Viajero </p>
                            </Card>
                        </Col>
                    )}

                    {/*VUELO */}
                    {tab === 'vuelo' && (
                        <Col xs={24} md={24}>
                            <Card style={{ color: '#2D384C', minHeight: '450px' }} className={style.poppins}>
                                <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}  >Vuelos</h2>

                                {/* Vuelo ida */}
                                <p className={style.no_margin} style={{ fontWeight: 'bold' }}>Ida </p>

                                <p>{paquete.vuelo.origen.name} ➡ {paquete.vuelo.destino.name} <span style={{ color: '#8290A6', marginLeft: '7px' }}> {new Date(paquete.desde_fecha).toLocaleDateString()}</span></p>

                                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', textAlign: 'center', marginBottom: '16px' }}>
                                    <span style={{ color: '#8290A6', fontSize: '14px' }}>{paquete.vuelo.empresa}</span>

                                    <div style={{ flexDirection: 'column', width: '25%' }}>
                                        <p className={style.no_margin} style={{ color: '#8290A6' }}>{paquete.vuelo.origen.name}</p>
                                        <p className={style.no_margin} > {formatearHora(paquete.vuelo.vuelo_ida)}</p>
                                    </div>

                                    <div>
                                        <p className={style.no_margin} style={{ color: '#8290A6' }}>{paquete.vuelo.duracion}</p>
                                        <hr style={{ width: '200px' }} className={style.no_margin}></hr>
                                        <p className={style.no_margin} style={{ color: '#8290A6' }}>Directo</p>

                                    </div>

                                    <div style={{ flexDirection: 'column', width: '25%' }}>
                                        <p className={style.no_margin} style={{ color: '#8290A6' }}>{paquete.vuelo.destino.name}</p>
                                        <p className={style.no_margin}>{formatearHora(paquete.vuelo.vuelo_vuelta)}</p>
                                    </div>
                                </div>

                                {/* Vuelo vuelta */}
                                <p className={style.no_margin} style={{ fontWeight: 'bold' }}>Vuelta</p>

                                <p>{paquete.vuelo.origen.name} ➡ {paquete.vuelo.destino.name} <span style={{ color: '#8290A6', marginLeft: '7px' }}> {new Date(paquete.desde_fecha).toLocaleDateString()}</span></p>

                                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', textAlign: 'center' }}>
                                    <span style={{ color: '#8290A6' }}>{paquete.vuelo.empresa}</span>

                                    <div style={{ flexDirection: 'column', width: '25%' }}>
                                        <p className={style.no_margin} style={{ color: '#8290A6' }}>{paquete.vuelo.destino.name}</p>
                                        <p className={style.no_margin}>{formatearHora(paquete.vuelo.vuelo_vuelta)}</p>
                                    </div>

                                    <div>
                                        <p className={style.no_margin} style={{ color: '#8290A6' }}>{paquete.vuelo.duracion}</p>
                                        <hr style={{ width: '200px' }} className={style.no_margin}></hr>
                                        <p className={style.no_margin} style={{ color: '#8290A6' }}>Directo</p>

                                    </div>

                                    <div style={{ flexDirection: 'column', width: '25%' }}>
                                        <p className={style.no_margin} style={{ color: '#8290A6' }}>{paquete.vuelo.origen.name}</p>
                                        <p className={style.no_margin} > {formatearHora(paquete.vuelo.vuelo_ida)}</p>
                                    </div>

                                </div>
                            </Card>
                        </Col>
                    )}


                    {/*Hotel */}
                    {tab === 'hotel' && (
                        <Col xs={24} md={24}>

                            <Card className={style.poppins} style={{ minHeight: '450px' }}>
                                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2D384C' }} className={style.no_margin}>Hotel</h2>

                                <div style={{ display: 'flex' }}>

                                    <div style={{ height: '230px', position: 'relative', width: '100%', flex: '1' }}>
                                        <Image
                                            src={`http://localhost:8080/image/hoteles/${paquete.hotel.image[0]}`}
                                            alt={paquete.destino.name}
                                            style={{ objectFit: 'cover', borderRadius: '12px 0' }}
                                            fill
                                            priority
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>



                                    <div style={{ flex: '1', marginLeft: '12px' }}>
                                        <p className={style.no_margin} style={{ fontSize: '18px' }}>{paquete.hotel.name}</p>
                                        <p>
                                            {'⭐'.repeat(paquete.hotel.stars)}
                                        </p>

                                        <button style={{cursor: 'pointer', padding: '4px', width: '30%', borderRadius: '12px', fontSize: '16px', marginTop: '30%', background: '#4285F4', color: 'white' }} onClick={() => router.push(`/hoteles/${paquete.hotel._id}`)}>Ver detalle</button>
                                    </div>
                                </div>
                            </Card>

                        </Col>
                    )}


                    {/*Fecha */}
                    {tab === 'fechas' && (
                        <Col xs={24} md={24}>

                            <Card className={style.poppins} style={{ minHeight: '450px' }} >
                                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2D384C' }} className={style.no_margin}>Fecha</h2>
                                <div style={{ display: 'flex', marginTop: '12px' }}>
                                    <div style={{ flex: '1', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>

                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            minDate={new Date()}
                                            inline

                                        />
                                    </div>
                                    <div style={{ flex: '1' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ flexDirection: 'column' }}>
                                                <p className={style.no_margin}> <strong style={{ color: '#4285F4' }}>Salida:</strong> {new Date(paquete.desde_fecha).toLocaleDateString()}</p>
                                                <p className={style.no_margin}> <strong style={{ color: '#4285F4' }}>Regreso:</strong> {new Date(paquete.hasta_fecha).toLocaleDateString()}</p>
                                            </div>
                                            <div style={{ flexDirection: 'column' }}>
                                                <p className={style.no_margin} style={{ color: '#4285F4', fontWeight: 'bold' }}>{paquete.hotel.numberOfNights} noches </p>
                                                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>${paquete.vuelo.precio}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                        </Col>
                    )}
                </Col>







                {/* Detalles del paquete DERECHA */}
                <Col xs={24} md={8}>
                    <Card style={{ color: '#2D384C' }} className={style.poppins}>

                        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{paquete.destino.name}, {paquete.destino.country}</h2>

                        <p style={{ padding: '12px', background: '#F5F7F9', borderRadius: '9px', marginBottom: '9px' }} className={style.no_margin}> <strong> 🗓️ Salida:</strong> {new Date(paquete.desde_fecha).toLocaleDateString()} - <strong>Regreso:</strong> {new Date(paquete.hasta_fecha).toLocaleDateString()}</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', marginBottom: '12px', background: '#F5F7F9', borderRadius: '9px' }}>
                            <FaUserCircle style={{ fontSize: '1.3rem' }} />
                            <p style={{ fontSize: '14px' }} className={style.no_margin}><strong>2 pasajeros, 1 habitación</strong></p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>3 cuotas sin interés de </span>
                            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>${cuotas(paquete.vuelo.precio + paquete.hotel.price)}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '7px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Precio total para 2 personas </span>
                                <span style={{ fontSize: '13px', color: '#8290A6' }}>(1 hab. doble) </span>

                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>${paquete.vuelo.precio + paquete.hotel.price} </span>
                        </div>

                        {/*Btn Comprar */}
                        <button style={{ cursor: 'pointer',padding: '7px', width: '100%', borderRadius: '16px', fontSize: '16px', marginTop: '14px', background: '#4285F4', color: 'white', fontWeight: 'bold' }} onClick={() => {
                            const nuevaReserva = {
                                productoId: paquete._id,
                                referencia: "paquete", // este nombre es clave para que coincida con el backend
                                quantity: 1
                            };

                            agregarReserva({
                                id: paquete._id,
                                referencia: "paquete_fli"
                            });

                            agregarAlCarrito(nuevaReserva);
                        }}>Comprar</button>
                    </Card>

                    <Card style={{ color: '#2D384C' }} className={style.poppins}>
                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Formas de pago</p>
                        <p className={style.no_margin}><FaCheckCircle style={{ color: 'green', marginRight: '8px' }} /> Tarjeta de crédito</p>
                        <p className={style.no_margin}><FaCheckCircle style={{ color: 'green', marginRight: '8px' }} /> Tarjeta de débito</p>
                        <p className={style.no_margin}><FaCheckCircle style={{ color: 'green', marginRight: '8px' }} /> Dos tarjetas</p>
                        <p className={style.no_margin}><FaCheckCircle style={{ color: 'green', marginRight: '8px' }} /> Transferencia / Depósito</p>
                        <p className={style.no_margin}><FaCheckCircle style={{ color: 'green', marginRight: '8px' }} /> Múltiples medios (pago offline)</p>
                        <p className={style.no_margin}><FaCheckCircle style={{ color: 'green', marginRight: '8px' }} /> Cuota Simple</p>
                    </Card>

                </Col>

            </Row>



        </div >
    );
}

