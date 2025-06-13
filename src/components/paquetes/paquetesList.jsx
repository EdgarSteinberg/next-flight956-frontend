'use client';
import Image from "next/image";
import { Card, Row, Col, Tag, Divider } from 'antd';
import styles from "./styles.module.css"
import { WifiOutlined, CarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { FaSwimmingPool, FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PaquetesList({ paquetes }) {
    const router = useRouter();
    return (
        <>
            <strong className={styles.titulo}>Ofertas en paquetes turísticos para los mejores destinos</strong>
            <Row
                gutter={[20, 20]}
                style={{
                    margin: '0 auto',
                    maxWidth: '1400px',
                    padding: '0 20px',
                }}
            >
                {paquetes.map((p) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={p._id}>
                        <Card
                            hoverable
                            onClick={() => router.push(`/paquetes/${p._id}`)}
                            style={{ width: '100%', height: '100%', marginTop: '15px' }}
                            cover={
                                p.destino.image?.length > 0 ? (
                                    <div style={{ position: 'relative', height: '200px' }}>
                                        <Image
                                            src={`https://node-flight956-backend.onrender.com/image/provincias/${p.destino.image[0]}`}
                                            alt={`Imagen de ${p.destino.name}`}
                                            fill
                                            style={{ objectFit: 'cover', borderRadius: '9px' }}
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
                            <p style={{ margin: '0', padding: '0', lineHeight: 'initial', fontSize: '24px', color: '#323439', fontWeight: '500' }}> <span style={{ fontSize: '14px', letterSpacing: '.05px', lineHeight: '20px', marginRight: '3px' }}>$</span>{p.hotel.price + p.vuelo.precio}</p>

                        </Card>
                    </Col>
                ))}
            </Row>

        </>
    );
}
