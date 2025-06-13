'use client'; // ✅ Esto va al principio, ¡bien ahí!

import { deleteOne } from "@/services/api";
import { toast } from 'react-toastify';
import { Card, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Image from "next/image";
import { ReservaContext } from "@/context/reservaContenxt";
import { useRouter } from "next/navigation";
import styles from './styles.module.css';
import { useContext } from "react";

export default function CityRead({ ciudad, setCiudad, error, setError }) {

  const { user } = useContext(ReservaContext);
  const router = useRouter();

  console.log('ciudad', ciudad)
  const handleCity = async (id) => {
    if (!user) {
      alert('Debes estar logeado!');
      return router.push('/login')
    }

    if (user.role !== 'admin' && user.role !== 'premium') {
      return alert('No tienes los permisos suficientes!')
    }
    try {
      await deleteOne('provincias', id);
      setCiudad((prev) => prev.filter((ciu) => ciu._id !== id));
      toast.success('Ciudad Eliminada Correctamente!');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div style={{ width: '95%', margin: '0 auto' }} className={styles.poppins}>
      <h2 style={{ marginTop: '24px', textAlign: 'center', fontWeight: 'bolder' }}>Todas las provincias</h2>
      <Row gutter={[16, 16]}>
        {ciudad.map((ciu, index) => (
          <Col key={ciu._id || index} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={<strong>Provincia: {ciu.name}</strong>}
              extra={[
                <DeleteOutlined key="delete" style={{ color: 'red' }} onClick={() => handleCity(ciu._id)} />,
              ]}
              hoverable
              style={{ width: '100%' }}
              cover={
                ciu.image ? (
                  <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                    <Image
                      src={`https://node-flight956-backend.onrender.com/image/provincias/${ciu.image}`}
                      alt={ciu.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      style={{ objectFit: 'cover', borderRadius: '12px' }}
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
              <p><strong>País:</strong> {ciu.country}</p>
            </Card>

          </Col>
        ))}
      </Row>
      {error && <p>{`Error: ${error.message}`}</p>}
    </div>
  );
}
