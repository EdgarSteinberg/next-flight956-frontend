'use client';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';


export default function CartItem({ item, handleDeleteProductInCart, obtenerTipoYProductoId}) {
    const router = useRouter();
    const handleRedirect = () => {
        router.push('/ticket')
    }

        const paquete = item.productoPaquete ? { ...item.productoPaquete, quantity: item.quantity } : null;//Accedo a los items del carrito.
        const vuelo = item.productoVuelo ? { ...item.productoVuelo, quantity: item.quantity } : null;
        const hotel = item.productoHotel ? { ...item.productoHotel, quantity: item.quantity } : null;

        return (
            <>
                {paquete && (
                    <div className={styles.labelContainer}>
                        <h3 style={{ fontWeight: 'bold' }}>✈️ Paquete: {paquete.destino.name}</h3>
                        <p>🛫 Vuelo: {paquete.vuelo.empresa}</p>
                        <p>Desde: {paquete.vuelo.origen.name} → Hasta: {paquete.vuelo.destino.name}</p>
                        <p>📅 Fecha Ida: {new Date(paquete.vuelo.vuelo_ida).toLocaleDateString()}</p>
                        <p>🏨 Hotel: {paquete.hotel.name}</p>
                        <p>🛏️ {paquete.hotel.description}</p>
                        <p>💰 Total paquete: ${paquete.hotel.price + paquete.vuelo.precio}</p>
                        <p>🧾 Cantidad: {paquete.quantity}</p>
                        <button onClick={() => {
                            const { referencia, productoId } = obtenerTipoYProductoId(item);
                            handleDeleteProductInCart({ referencia, productoId });
                        }} style={{ background: 'red', padding: '9px', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>
                            Eliminar
                        </button>
                              
                    </div>
                )}

                {vuelo && (
                    <div className={styles.labelContainer}>
                        <h3 style={{ fontWeight: 'bold' }}>✈️ Vuelo: {vuelo.empresa}</h3>
                        <p>Desde: {vuelo.origen.name} → Hasta: {vuelo.destino.name}</p>
                        <p>🕓 Duración: {vuelo.duracion}</p>
                        <p>📅 Ida: {new Date(vuelo.vuelo_ida).toLocaleDateString()}</p>
                        <p>📅 Vuelta: {new Date(vuelo.vuelo_vuelta).toLocaleDateString()}</p>
                        <p>Clase: {vuelo.clase} | Equipaje incluido: {vuelo.incluye_equipaje ? 'Sí' : 'No'}</p>
                        <p>💰 Precio: ${vuelo.precio}</p>
                        <p>🧾 Cantidad: {vuelo.quantity}</p>

                        <button onClick={() => {
                            const { referencia, productoId } = obtenerTipoYProductoId(item);
                            handleDeleteProductInCart({ referencia, productoId });

                        }} style={{ background: 'red', padding: '9px', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>
                            Eliminar
                        </button>
                    </div>
                )}

                {hotel && (
                    <div className={styles.labelContainer}>
                        <h3 style={{ fontWeight: 'bold' }}>🏨 Hotel: {hotel.name}</h3>
                        <p>{hotel.description}</p>
                        <p>💰 Precio: ${hotel.price}</p>
                        <p>🧾 Cantidad: {hotel.quantity}</p>

                        <button onClick={() => {
                            const { referencia, productoId } = obtenerTipoYProductoId(item);
                            handleDeleteProductInCart({ referencia, productoId });
                        }} style={{ background: 'red', padding: '9px', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>
                            Eliminar
                        </button>
                    </div>
                )}

   <button onClick={handleRedirect} style={{ background: 'green', padding: '9px', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>Procesar Compra</button>
            </>
        )
    
}
