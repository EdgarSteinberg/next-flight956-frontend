"use client";
import { useContext, useEffect, useState } from "react";
import { ReservaContext } from "@/context/reservaContenxt";
import styles from './syles.module.css';

export default function TicketResumen() {
    const { user } = useContext(ReservaContext);
    const [cart, setCart] = useState(null);

    useEffect(() => {
        if (!user?.cart) return;

        fetch(`https://node-flight956-backend.onrender.com/api/carts/${user.cart}`)
            .then(res => res.json())
            .then(json => setCart(json.payload))
            .catch(console.error);
    }, [user]);

    if (!cart) return null;

    return (
        <>
            <h3 className={styles.title}>Resumen de tu compra</h3>

            <section className={styles.formContainer}>

                <div className={styles.divContainer}>
                    {cart.productos.map(item => {
                        const { productoVuelo, productoHotel, productoPaquete, quantity } = item;

                        if (productoPaquete) {
                            return (
                                <div key={item._id} className={styles.labelContainer} style={{ marginBottom: '1rem' }}>
                                    Paquete:  {productoPaquete.destino.name} ({quantity})<br />
                                    Vuelo {productoPaquete.vuelo.empresa} –{" "}
                                    {new Date(productoPaquete.vuelo.vuelo_ida).toLocaleDateString()}<br />
                                    Hotel {productoPaquete.hotel.name}<br />
                                    Total:  ${productoPaquete.hotel.price + productoPaquete.vuelo.precio}
                                </div>
                            );
                        }

                        if (productoVuelo) {
                            return (
                                <div key={item._id} className={styles.labelContainer} style={{ marginBottom: '1rem' }}>
                                    Vuelo: {productoVuelo.empresa} ({quantity})<br />
                                    {productoVuelo.origen.name} → {productoVuelo.destino.name} –{" "}
                                    {new Date(productoVuelo.vuelo_ida).toLocaleDateString()}<br />
                                    Precio: ${productoVuelo.precio}
                                </div>
                            );
                        }

                        if (productoHotel) {
                            return (
                                <div key={item._id} className={styles.labelContainer} style={{ marginBottom: '1rem' }}>
                                    Hotel:  {productoHotel.name} ({quantity})<br />
                                    {productoHotel.description}<br />
                                    Precio: ${productoHotel.price}
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>
            </section>
        </>
    );
}
