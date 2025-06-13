'use client';
import Image from "next/image";
import { Card, Row, Col, Tag, Divider } from 'antd';
import { WifiOutlined, CarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { FaSwimmingPool, FaStar } from "react-icons/fa";
import styles from './styles.module.css';
import { useRouter } from "next/navigation";

export default function HotelesList({ hoteles }) {
const router = useRouter();

    return (
        <>
            <strong className={styles.titulo}>Las mejores ofertas de hoteles en los destinos más populares</strong>
            <Row
                gutter={[20, 20]}
                style={{
                    margin: '0 auto',
                    maxWidth: '1400px',
                    padding: '0 20px',
                }}
            >
                {hoteles.map((h) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={h._id}>
                        <Card
                            onClick={()=> router.push(`/hoteles/${h._id}`)}
                            hoverable
                            style={{ width: '100%', height: '100%', marginTop: '15px' }}
                            cover={
                                h.image?.length > 0 ? (
                                    <div style={{ position: 'relative', height: '200px' }}>
                                        <Image
                                            src={`https://node-flight956-backend.onrender.com/image/hoteles/${h.image[0]}`}
                                            alt={`Imagen de ${h.name}`}
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
                            <div>
                                <h3 style={{ fontSize: '12px', color: '#565A60', fontWeight: '500', letterSpacing: '1px' }}>ALOJAMIENTO</h3>
                                <p style={{ margin: '0', padding: '0', fontSize: '20px', lineHeight: '28px', color: '#323439', fontWeight: '500' }}>Hotel: {h.name}</p>
                                <p style={{ margin: '0', padding: '0', fontFamily: 'inherit', color: '#565A60' }}>A pocos km de la ciudad</p>
                                <span style={{ margin: '0', padding: '0', fontFamily: 'inherit', color: '#565A60' }}>Estadia en la ciudad de {h.name}</span>
                                {/* <p>🛏️ Estadia: <strong>{new Date(p.desde_fecha).toLocaleDateString()}</strong> al <strong>{new Date(p.hasta_fecha).toLocaleDateString()}</strong></p> */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                    <p style={{ margin: '0' }}>
                                        {[...Array(h.stars)].map((_, i) => (
                                            <FaStar key={i} style={{ color: '#fadb14', marginRight: 4 }} />
                                        ))}
                                    </p>

                                    <Tag icon={<WifiOutlined />} color="blue"></Tag>
                                    <Tag icon={<FaSwimmingPool />} color="cyan"></Tag>
                                    <Tag icon={<CarOutlined />} color="green"></Tag>
                                </div>
                            </div>

                            <Divider style={{ margin: '14px', color: '#565A60' }} />
                            <hr />
                            <div >
                                <p style={{ margin: '0', padding: '0', fontSize: '12px', lineHeight: '16px', fontWeight: '400', color: '#323439' }}>1 noche, 2 personas desde ${h.nightPrice}</p>
                                <p style={{ margin: '0', padding: '0', lineHeight: 'initial', fontSize: '12px', color: '#565A60', textDecoration: 'line-through' }}>us$20</p>
                                <p style={{ margin: '0', padding: '0', lineHeight: 'initial', fontSize: '24px', color: '#323439', fontWeight: '500' }}> <span style={{ fontSize: '14px', letterSpacing: '.05px', lineHeight: '20px', marginRight: '3px' }}>US$</span>{h.price}</p>
                            </div>

                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}