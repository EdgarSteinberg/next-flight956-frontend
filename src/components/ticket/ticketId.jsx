import { useEffect, useState } from "react";
import Loading from "./loading";
import styles from './syles.module.css'


export default function TicketId({ id }) {
    const [ticketId, setTicketId] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {

        fetch(`https://node-flight956-backend.onrender.com/api/ticket/${id}`)
            .then((response) => response.json())
            .then((json) => {
                setTicketId(json.payload);
                setMostrar(true)
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={styles.flex}>
            <p className={styles.title}>Ticket Codigo: {ticketId?.codigo}</p>
            <div className={styles.formContainer}>

                <p className={styles.labelContainer}>Fecha: {new Date(ticketId?.fecha).toLocaleDateString('es-AR')}</p>

                {ticketId?.productos?.map((producto, index) => (
                    <div key={index} style={{ marginBottom: '1rem' }} className={styles.labelContainer}>
                        <p>Producto: {producto.producto}</p>
                        <p>Tipo: {producto.tipo}</p>
                        <p>Nombre: {producto.nombre}</p>
                        <p>Precio Unitario: {producto.precioUnitario}</p>
                        <p>Cantidad: {producto.quantity}</p>

                    </div>
                ))}
            </div>
        </div>
    );

}
