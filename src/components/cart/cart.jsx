'use client';
import { useContext, useEffect, useState } from 'react';
import { ReservaContext } from '@/context/reservaContenxt';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

export default function Cart() {
    const router = useRouter();
    const { user, reservas } = useContext(ReservaContext);
    const [cart, setCart] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user.cart) return;

        setLoading(true); // Asegurate de setearlo al volver a cargar

        fetch(`https://node-flight956-backend.onrender.com/api/carts/${user.cart}`)
            .then(res => res.json())
            .then(json => {
                setCart(json.payload);
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [user]); // <- importante

    console.log('carrito', cart);


    const handleDeleteProductInCart = async ({ productoId, referencia }) => {
        try {
            const response = await fetch(
                `https://node-flight956-backend.onrender.com/api/carts/${user.cart}/products/${productoId}?referencia=${referencia}`,
                { method: 'DELETE' }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(`Error del servidor: ${data.error}`);
                return;
            }

            alert('Se quito del carrito');
            // Recargar el carrito si es necesario
            setCart(prev => ({
                ...prev,
                productos: prev.productos.filter(item => {
                    const { productoVuelo, productoHotel, productoPaquete } = item;

                    if (referencia === 'vuelo') return productoVuelo?._id !== productoId;
                    if (referencia === 'hotel') return productoHotel?._id !== productoId;
                    if (referencia === 'paquete') return productoPaquete?._id !== productoId;

                    return true; // por si viene algo inesperado
                })
            }));

            return data;
        } catch (error) {
            console.log(`Error al eliminar el producto: ${error.message}`);
        }
    };

    const handleClearCart = async (cartId) => {
        try {
            const response = await fetch(
                `https://node-flight956-backend.onrender.com/api/carts/${cartId}/products/`,
                { method: 'DELETE' }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(`Error al vaciar el carrito: ${data.error || data.message}`);
                return;
            }

            alert('Carrito vaciado correctamente');

            // Actualizar estado local del carrito
            setCart(prev => ({
                ...prev,
                productos: []
            }));
        } catch (error) {
            alert(`Error al vaciar el carrito: ${error.message}`);
        }
    };


    const obtenerTipoYProductoId = (item) => {
        if (item.productoVuelo) {
            return { referencia: 'vuelo', productoId: item.productoVuelo._id };
        }
        if (item.productoHotel) {
            return { referencia: 'hotel', productoId: item.productoHotel._id };
        }
        if (item.productoPaquete) {
            return { referencia: 'paquete', productoId: item.productoPaquete._id };
        }
        return { referencia: null, productoId: null };
    };

    const handleRedirect = () => {
        router.push('/ticket')
    }

    if (loading) return <p className={styles.cargando}>cargando...</p>
    if (error) return alert(`se ha producido un error, ${error.message}`)

    return (
        <div style={{ margin: '0 auto', padding: '20px' }} className={styles.poppins}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }} className={styles.labelContainer}>
                <p style={{ textAlign: 'center', fontSize: '24px' }} className={styles.no_margin}>Tu carrito</p>
                <button onClick={() => handleClearCart(cart._id)} style={{ background: 'red', padding: '9px', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>Vaciar Carrito</button>
                <button onClick={handleRedirect} style={{ background: 'green', padding: '9px', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>Procesar Compra</button>
            </div>
            {!cart || cart.productos.length === 0 ? (
                <p className={styles.title}>El carrito está vacío</p>
            ) : (
                cart.productos.map((item) => {

                    const paquete = item.productoPaquete ? { ...item.productoPaquete, quantity: item.quantity } : null;//Accedo a los items del carrito.
                    const vuelo = item.productoVuelo ? { ...item.productoVuelo, quantity: item.quantity } : null;
                    const hotel = item.productoHotel ? { ...item.productoHotel, quantity: item.quantity } : null;

                    return (
                        <div key={item._id} className={styles.formContainer}>
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


                        </div>
                    );
                })


            )}
        </div>
    );



}