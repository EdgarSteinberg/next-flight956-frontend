'use client';

import { useState, useEffect } from "react";
import { Card, Row, Col, Divider } from 'antd';
import { useRouter, useSearchParams } from "next/navigation";
import { FaDollarSign, FaPlane } from 'react-icons/fa';
import styles from './styles.module.css';
import Vuelos from "./vuelos";
import Loading from "./loading";


export default function VuelosPorProvincia() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const nombreProvincia = searchParams.get('nombreProvincia');
    const [vuelos, setVuelos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    // Simulación de provincias (deberías traerlas con fetch)
    const [provincias, setProvincias] = useState([]);

    useEffect(() => {
        if (!nombreProvincia) return;
        fetch(`https://node-flight956-backend.onrender.com/api/vuelos/buscarProvincia?nombreProvincia=${nombreProvincia}`)
            .then(response => response.json())
            .then(json => {
                setVuelos(json.payload);
            })
            .catch(error => setError(error.message));
    }, [nombreProvincia]);

    useEffect(() => {
        // Traé las provincias acá si no las tenés hardcodeadas
        fetch(`https://node-flight956-backend.onrender.com/api/provincias`)
            .then(res => res.json())
            .then(json => setProvincias(json.payload))
            .catch(error => console.error('Error al cargar provincias', error))
            .finally(() => setLoading(false))
    }, []);

    const provinciaActual = provincias.find(p => p.name === nombreProvincia);
  
    if(loading){
        return <Loading/>
    }

    return (
        <>

            <div>

                {error && <p>Error: {error}</p>}

                <Vuelos destinoFijo={provinciaActual} soloFormulario={true} />

                <div className={styles.titulo}>
                    <p style={{ textAlign: 'center',color: '#323439', fontSize: '32px', lineHeight: '36px', fontWeight: '500', margin: '0' }}>Vuelos más baratos</p>
                    <p style={{ textAlign: 'center',marginTop: '7px', color: '#565A60' }}>Estos son los vuelos más baratos para volar a {nombreProvincia}. Encontrá la mejor opción para tu viaje.</p>
                </div>
                
                <Row gutter={[16, 16]} style={{ margin: '0 auto', maxWidth: '1400px', padding: '0 20px' }}>
                    {vuelos.map((vuelo) => (
                        <Col key={vuelo._id} xs={24} sm={12} md={8} lg={6} >
                            <Card
                                hoverable
                                onClick={() => router.push(`/vuelos/${vuelo._id}`)}
                                style={{ cursor: 'pointer' }}

                            >

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FaPlane style={{ marginRight: '6px', color: '#565A60' }} />
                                    <p style={{ margin: 0, color: '#565A60', fontWeight: '500' }}>{vuelo.empresa}</p>
                                </div>

                                <Divider style={{ margin: '14px 0' }} />

                                <div style={{ display: 'flex', gap: '2rem', fontSize: '12px' }}>
                                    {/* IDA */}
                                    <div style={{ flex: '1' }}>
                                        <p style={{ margin: 0, color: '#323439', fontWeight: '500' }}>
                                            <span style={{ color: 'gray' }}>✈️</span>  IDA
                                        </p>
                                        <p style={{ margin: 0, color: '#565A60', fontWeight: '500', letterSpacing: '1px' }}>
                                            {vuelo.origen.name} → {vuelo.destino.name}
                                        </p>
                                        <p style={{ margin: 0, color: '#323439', fontWeight: '500' }}>
                                            {new Date(vuelo.vuelo_ida).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })} - <strong style={{ color: '#03A691' }}> Directo</strong>
                                        </p>
                                    </div>

                                    {/* VUELTA */}
                                    <div style={{ flex: '1' }}>
                                        <p style={{ margin: 0, color: '#323439', fontWeight: '600' }}>
                                            <span style={{ color: 'gray' }}>🛬</span>  VUELTA
                                        </p>
                                        <p style={{ margin: 0, color: '#565A60', fontWeight: '600', letterSpacing: '1px' }}>
                                            {vuelo.destino.name} ← {vuelo.origen.name}
                                        </p>
                                        <p style={{ margin: 0, color: '#323439', fontWeight: '500' }}>
                                            {new Date(vuelo.vuelo_vuelta).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })} - <strong style={{ color: '#03A691' }}> Directo</strong>
                                        </p>
                                    </div>
                                </div>

                                <Divider style={{ margin: '14px 0' }} />
                                <p style={{ margin: 0, color: '#565A60', fontSize: '12px' }}>Precio ida y vuelta desde</p>
                                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaDollarSign size={14} color="#000" />
                                        <p style={{ margin: 0, fontSize: '20px', color: '#323439', fontWeight: '600' }}>
                                            {vuelo.precio}
                                        </p>
                                    </div>

                                    <button className={styles.btn}>
                                        Siguiente <span style={{ fontSize: '16px' }}>➔</span>
                                    </button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

        </>
    );
}

