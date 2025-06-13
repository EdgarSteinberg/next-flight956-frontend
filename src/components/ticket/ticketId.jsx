import { useEffect, useState } from "react";
import Loading from "./loading";

export default function TicketId({ id }) {
    const [ticketId, setTicketId] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch(`https://node-flight956-backend.onrender.com/api/ticket/${id}`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json.payload);
                setTicketId(json.payload);
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <p>Ticket ID: {ticketId?._id}</p>
            <p>Cart: {ticketId?.cart}</p>
            <p>Fecha: {new Date(ticketId?.fecha).toDateString()}</p>

            {ticketId?.productos?.map((producto, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                    <p>Producto: {producto.producto}</p>
                    <p>Tipo: {producto.tipo}</p>
                    <p>Nombre: {producto.nombre}</p>
                    <p>Precio Unitario: {producto.precioUnitario}</p>
                    <p>Cantidad: {producto.quantity}</p>
                    <hr />
                </div>
            ))}
        </>
    );
}
