import { deleteOne, getAll } from "@/services/api"
import { toast } from 'react-toastify';
import { Card, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ReservaContext } from "@/context/reservaContenxt";
import styles from './styles.module.css'
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function VuelosRead({ vuelos, setError, setVuelos }) {
    const router = useRouter();
    const {user} = useContext(ReservaContext);

    const eliminarVuelo = async (vid) => {
        if(!user){
            alert(`Tienes que estar logeado!`);
            return router.push('/login');
        }

        if(user.role !== 'admin' && user.role !== 'premium'){
            return alert(`No tienes los permisos suficientes!`)
        }

        try {
            await deleteOne('vuelos', vid);
            setVuelos((prevVuelo) => prevVuelo.filter(vue => vue._id !== vid));
            toast.success('🛫 Vuelo eliminado correctamente!');
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div style={{width: '95%', margin: '0 auto'}}> 
            <h2 style={{marginTop: '12px', textAlign: 'center', fontWeight: 'bolder'}}>Todos los vuelos</h2>
            <Row gutter={[16, 16]}>
                {
                    vuelos.map((vue, index) => (

                        <Col key={vue._id || index} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                title={vue.empresa}
                                extra={<DeleteOutlined style={{ color: 'red' }} onClick={() => eliminarVuelo(vue._id)} />}
                                hoverable
                                className={styles.poppins}
                            >
                                <p><strong>Origen:</strong> {vue.origen?.name || "Desconocido"}</p>
                                <p><strong>Destino:</strong> {vue.destino?.name || "Desconocido"}</p>
                                <p><strong>Duración:</strong> {vue.duracion}</p>
                                <p><strong>Precio:</strong> ${vue.precio}</p>
                                <p><strong>Asientos disponibles:</strong> {vue.asientos_disponibles}</p>
                                <p><strong>Incluye equipaje:</strong> {vue.incluye_equipaje ? "Sí" : "No"}</p>
                                <p><strong>Fecha de ida:</strong> {new Date(vue.vuelo_ida).toLocaleDateString()}</p>
                                <p><strong>Fecha de vuelta:</strong> {new Date(vue.vuelo_vuelta).toLocaleDateString()}</p>
                                <p><strong>Pasajeros:</strong>
                                    {vue.pasajeros?.length > 0
                                        ? vue.pasajeros.map((p) => p.email).join(", ")
                                        : "Ninguno"}
                                </p>
                            </Card>
                        </Col>
                    ))}
            </Row>

        </div>
    )
}
