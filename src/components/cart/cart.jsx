'use client';
import { useContext, useEffect, useState } from 'react';
import { ReservaContext } from '@/context/reservaContenxt';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { toast } from 'react-toastify';
import CartItem from './cartItem';

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




    const handleDeleteProductInCart = async ({ productoId, referencia }) => {
        try {
            const response = await fetch(
                `https://node-flight956-backend.onrender.com/api/carts/${user.cart}/products/${productoId}?referencia=${referencia}`,
                { method: 'DELETE' }
            );

            const data = await response.json();

            if (!response.ok) {
                toast.error(`Error del servidor: ${data.error}`);
                return;
            }

            toast.success('Se quito del carrito');
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
            toast.error(`Error al eliminar el producto: ${error.message}`);
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
                toast.error(`Error al vaciar el carrito: ${data.error || data.message}`);
                return;
            }

            toast.error('Carrito vaciado correctamente');

            // Actualizar estado local del carrito
            setCart(prev => ({
                ...prev,
                productos: []
            }));
        } catch (error) {
            toast.error(`Error al vaciar el carrito: ${error.message}`);
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

   

    if (loading) return <p className={styles.cargando}>cargando...</p>
    if (error) return toast.error(`se ha producido un error, ${error.message}`)

    return (
        <div style={{ margin: '0 auto', padding: '20px' }} className={styles.poppins}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }} className={styles.labelContainer}>
                <p style={{ textAlign: 'center', fontSize: '24px' }} className={styles.no_margin}>Tu carrito</p>
                <button onClick={() => handleClearCart(cart._id)} style={{ background: 'red', padding: '9px', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>Vaciar Carrito</button>
            </div>

            {!cart || cart.productos.length === 0 ? (
                <p className={styles.title}>El carrito está vacío</p>
            ) : (

                cart.productos.map((item) => 
                    <CartItem
                        key={item._id }
                        item={item}
                        handleDeleteProductInCart={handleDeleteProductInCart}
                        obtenerTipoYProductoId={obtenerTipoYProductoId}
                    />
                )

            )}
        </div>
    );



}