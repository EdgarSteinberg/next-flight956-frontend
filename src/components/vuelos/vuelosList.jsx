'use client';
import { getAll } from "@/services/api";
import { useEffect, useState } from "react";
import { Card, Row, Col, Divider } from 'antd';
import Image from "next/image";
import styles from './styles.module.css'
import { useRouter } from "next/navigation"; 


export default function VuelosList() {
    const router = useRouter(); // no useParams acá, eso es solo para capturar params en la ruta actual
    const [vuelos, setVuelos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAll('vuelos')
            .then(data => setVuelos(data))
            .catch(error => setError(error));
    }, []);

    const vuelosFiltradosPorProvincia = vuelos.reduce((acc, vuelo) => {
    if (!acc.find(v => v.destino.name === vuelo.destino.name)) {
      acc.push(vuelo);
    }
    return acc;
  }, []);


 return (
    <>
      <strong className={styles.titulo}>Encontrá vuelos baratos para los mejores destinos</strong>
      <Row gutter={[20, 20]} style={{ margin: '0 auto', maxWidth: '1400px', padding: '0 20px' }}>
        {vuelosFiltradosPorProvincia.map((v) => (
          <Col xs={24} sm={12} md={8} lg={6} key={v._id}>
            <Card
              hoverable
              style={{ width: '100%', height: '100%', marginTop: '15px', cursor: 'pointer' }}
             onClick={() => router.push(`/vuelos/vuelosPorProvincia?nombreProvincia=${encodeURIComponent(v.destino.name)}`)}
              cover={
                v.destino.image?.length > 0 ? (
                  <div style={{ position: 'relative', height: '200px' }}>
                    <Image
                      src={`https://node-flight956-backend.onrender.com/image/provincias/${v.destino.image[0]}`}
                      alt={`Imagen de ${v.name}`}
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
              <p style={{ fontSize: '12px', color: '#565A60', fontWeight: '500', letterSpacing: '1px' }}>VUELO</p>
              <p style={{ margin: 0, fontSize: '20px', color: '#323439', fontWeight: '500' }}>Vuelos a la ciudad {v.destino.name}</p>
          
              <p style={{ margin: 0, color: '#565A60' }}>Por {v.empresa}</p>
              <p style={{ margin: 0, color: '#323439', fontWeight: '500', fontSize: '12px' }}>Ida y vuelta</p>
              <Divider style={{ margin: '14px', color: '#565A60' }} />
              <p style={{ margin: 0, color: '#565A60' }}>Precio ida y vuelta desde</p>
              <p style={{ margin: 0, fontSize: '24px', color: '#323439', fontWeight: '500' }}>
                <span style={{ fontSize: '14px', marginRight: '3px' }}>$</span>{v.precio}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}