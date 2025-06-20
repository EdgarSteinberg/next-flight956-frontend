"use client";
import { useContext, useEffect, useState } from "react";
import { ReservaContext } from "@/context/reservaContenxt";
import styles from './syles.module.css';


export default function TicketResumen({ setLoading }) {
    const { user } = useContext(ReservaContext);
    const [cart, setCart] = useState(null);


    useEffect(() => {
        if (!user?.cart) return;
        setLoading(true)

        fetch(`https://node-flight956-backend.onrender.com/api/carts/${user.cart}`)
            .then(res => res.json())
            .then(json => setCart(json.payload))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [user]);


    if (!cart) return;
    return (
        <div>
            <h3 className={styles.titlex}>Resumen de tu compra</h3>




            {cart.productos.map(item => {
                const { productoVuelo, productoHotel, productoPaquete, quantity } = item;

                if (productoPaquete) {
                    return (
                        <div key={item._id} className={styles.formContainer} style={{ marginBottom: '1rem' }}>
                            Paquete:  {productoPaquete.destino.name} - Empresa: {productoPaquete.vuelo.empresa}<br />
                            Fecha: {new Date(productoPaquete.vuelo.vuelo_ida).toLocaleDateString()} - Hotel: {productoPaquete.hotel.name}<br />
                            Total:  ${productoPaquete.hotel.price + productoPaquete.vuelo.precio}
                        </div>
                    );
                }

                if (productoVuelo) {
                    return (
                        <div key={item._id} className={styles.formContainer} style={{ marginBottom: '1rem' }}>
                            Vuelo: {productoVuelo.empresa} <br />
                            {productoVuelo.origen.name} → {productoVuelo.destino.name} –{" "}
                            Fecha: {new Date(productoVuelo.vuelo_ida).toLocaleDateString()}<br />
                            Precio: ${productoVuelo.precio}
                        </div>
                    );
                }

                if (productoHotel) {
                    return (
                        <div key={item._id} className={styles.formContainer} style={{ marginBottom: '1rem' }}>
                            Hotel:  {productoHotel.name} ({quantity})<br />
                            {productoHotel.description}<br />
                            Precio: ${productoHotel.price}
                        </div>
                    );
                }

                return null;
            })}


        </div>
    );
}
