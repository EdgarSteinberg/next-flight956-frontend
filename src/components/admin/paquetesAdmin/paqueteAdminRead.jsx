'use client';

import { deleteOne } from "@/services/api";
import { toast } from 'react-toastify';
import Image from "next/image";
import { Card, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ReservaContext } from "@/context/reservaContenxt";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function PaqueteRead({ paquetes, setPaquetes }) {
    const {user} = useContext(ReservaContext);
    const router = useRouter();

    const eliminarPaquete = async (pid) => {
        if(!user){
            alert('Debes estar logeado');
            return router.push('/login');
        }

        if(user.role !== 'admin' && user.role !== 'premium'){
            return alert('No tienes los permisos sufiencientes!')
        }

        try {
            await deleteOne('paquetes', pid);
            setPaquetes((prevPaquetes) => prevPaquetes.filter(paq => paq._id !== pid));
            toast.success('Paquete Eliminado Correctamente!');
        } catch (error) {
            console.error('Error al eliminar paquete:', error);
            toast.error(`Hubo un problema al eliminar el paquete: ${error.message}`);
        }
    };

    return (
        <div style={{margin: '0 auto', width: '95%'}}>
            <h2 style={{marginTop: '12px', textAlign: 'center', fontWeight: 'bolder'}}>Todos los paquetes</h2>
            <Row gutter={[16, 16]}>
                {paquetes.map((paq) => (
                    <Col key={paq._id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            title={<strong>Destino: {paq.destino.name}</strong>}
                            extra={
                                <DeleteOutlined
                                    onClick={() => eliminarPaquete(paq._id)}
                                    style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
                                />
                            }
                            hoverable
                            style={{ width: '100%' }}
                            cover={
                                paq.destino && paq.destino.image && paq.destino.image.length > 0 ? (
                                    <div style={{position: 'relative', width: '100%', height:'200px'}}>
                                        <Image
                                            src={`http://localhost:8080/image/provincias/${paq.destino.image[0]}`}
                                            alt={paq.destino.name || 'Imagen de Provincia'}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 25vw"
                                            style={{objectFit: 'cover', borderRadius: '12px'}}
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div style={{ height: 200, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>No hay imagen disponible</p>
                                    </div>
                                )
                            }
                        >
                            <h4><strong>Vuelo:</strong> {paq.vuelo?.empresa || 'Sin vuelo'}</h4>
                            <p><strong>Hotel:</strong> {paq.hotel?.name || 'Sin hotel'}</p>
                            <p><strong>Destino:</strong> {paq.destino?.name || 'Sin destino'}</p>
                            <p><strong>Desde Fecha:</strong> {new Date(paq.desde_fecha).toLocaleDateString()}</p>
                            <p><strong>Hasta Fecha:</strong> {new Date(paq.hasta_fecha).toLocaleDateString()}</p>

                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
