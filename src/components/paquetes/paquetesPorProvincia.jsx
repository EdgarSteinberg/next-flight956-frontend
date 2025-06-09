'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, Row, Col, Divider } from 'antd';
import { WifiOutlined, CarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { FaSwimmingPool, FaStar } from "react-icons/fa";
 

export default function PaquetesPorProvincia({ nombreProvincia }) {
    const router = useRouter();
    const [paquete, setPaquete] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetch(`http://localhost:8080/api/paquetes?buscarPorProvincia=${nombreProvincia}`)
            .then(response => response.json())
            .then(json => {
                console.log("Paquetes relacionados:", json.payload);
                setPaquete(json.payload);
            })
            .catch(error => setError(error));
    }, [nombreProvincia]);

    return (
        <>
            {error && <p>Error: ${error}</p>}
            <Row
                gutter={[20, 20]}
                style={{
                    margin: '0 auto',
                    maxWidth: '1400px',
                    padding: '0 20px',
                }}
            >
                {paquete.map((p) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={p._id}>
                        <Card
                            hoverable
                            onClick={() => router.push(`/paquetes/${p._id}`)}
                            style={{ width: '100%', height: '100%', marginTop: '15px' }}
                            cover={
                                p.destino.image?.length > 0 ? (
                                    <div style={{ position: 'relative', height: '200px' }}>
                                        <Image
                                            src={`http://localhost:8080/image/provincias/${p.destino.image[0]}`}
                                            alt={`Imagen de ${p.destino.name}`}
                                            fill
                                            style={{ objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div style={{ height: '200px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>No hay imagen disponible</p>
                                    </div>
                                )
                            }
                        >
                            <p style={{ fontSize: '12px', color: '#565A60', fontWeight: '500', letterSpacing: '1px' }}>PAQUETE</p>
                            <p style={{ margin: '0', padding: '0', fontSize: '20px', lineHeight: '28px', color: '#323439', fontWeight: '500' }}>Paquetes a {p.destino.name}, {p.destino.country}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <p style={{ margin: '0' }}>
                                    {[...Array(p.hotel.stars)].map((_, i) => (
                                        <FaStar key={i} style={{ color: '#fadb14', marginRight: 4 }} />
                                    ))}
                                </p>
                            </div>
                            <p style={{ margin: '0', padding: '0', fontFamily: 'inherit', color: '#565A60' }}>Saliendo desde {p.destino.name}</p>
                            <p style={{ margin: '0', padding: '0', fontFamily: 'inherit', color: '#565A60' }}>Hotel + Vuelo</p>


                            <Divider style={{ margin: '14px', color: '#565A60' }} />
                            <p style={{ margin: '0', padding: '0', fontFamily: 'inherit', color: '#565A60' }}>Precio final por persona</p>
                            <p style={{ margin: '0', padding: '0', lineHeight: 'initial', fontSize: '24px', color: '#323439', fontWeight: '500' }}> <span style={{ fontSize: '14px', letterSpacing: '.05px', lineHeight: '20px', marginRight: '3px' }}>US$</span>{p.hotel.price}</p>

                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}