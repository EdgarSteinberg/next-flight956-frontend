'use client';
import Image from 'next/image';
import { Card, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteOne } from '@/services/api';
import { toast } from 'react-toastify';
import { ReservaContext } from '@/context/reservaContenxt';
import { useRouter } from 'next/navigation';
import style from './styles.module.css';
import { useContext } from 'react';

export default function HotelRead({ hoteles, setHoteles }) {
    const {user} = useContext(ReservaContext);
    const router = useRouter();
 
    const eliminarHotel = async (id) => {
      if(!user){
        alert('Debe estar logeado!');
        return router.push('/login');
      }

      if(user.role !== 'admin' && user.role !== 'premium'){
        return alert('No tienes los permisos suficientes!')
      }
        try {
            await deleteOne('hoteles', id);
            setHoteles((prev) => prev.filter(hotel => hotel._id !== id));
            toast.success('¡Hotel eliminado correctamente!');
        } catch (error) {
            toast.error('Error al eliminar el hotel.');
        }
    };

    return (
          <div style={{margin: '0 auto', width: '95%'}}>
            <h2 style={{marginTop: '24px', textAlign: 'center', fontWeight: 'bolder'}}>Todos los Hoteles</h2>
            <Row gutter={[16, 16]}>
                {hoteles.map((ciu, index) => (
                    <Col key={ciu._id || index} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            title={<strong>🏨 Hotel: {ciu.name}</strong>}
                            extra={
                                <DeleteOutlined
                                    onClick={() => eliminarHotel(ciu._id)}
                                    style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
                                />
                            }
                            hoverable
                            style={{ width: '100%' }}
                            cover={
                                <div style={{ width: '100%', height: 200, overflow: 'hidden', position: 'relative' }}>
                                  {ciu.image && ciu.image.length > 0 ? (
                                    <Image
                                      src={`https://node-flight956-backend.onrender.com/image/hoteles/${ciu.image[0]}`}
                                      alt={`Imagen de ${ciu.name}`}
                                      fill
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                      style={{ objectFit: 'cover' }}
                                      priority
                                    />
                                  ) : (
                                    <div style={{ height: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <p>No hay imagen disponible</p>
                                    </div>
                                  )}
                                </div>
                              }
                              
                        >
                            <p><strong>📝 </strong> {ciu.description}</p>
                            <p><strong>⭐ Estrellas:</strong> {'⭐'.repeat(ciu.stars)}</p>
                            <p><strong>💸 Precio por noche:</strong> ${ciu.nightPrice}</p>
                            <p><strong>📅 Noches:</strong> {ciu.numberOfNights}</p>
                            <p><strong>💰 Total:</strong> ${ciu.price}</p>
                            <p><strong>🍳 Desayuno incluido:</strong> {ciu.breakfastIncluded ? 'Sí' : 'No'}</p>
                        </Card>

                    </Col>
                ))}
            </Row>
            <br />
        </div>
    );
}
