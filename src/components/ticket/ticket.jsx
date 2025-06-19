'use client';

import { useContext, useState } from "react";
import { ReservaContext } from "@/context/reservaContenxt";
import { useRouter } from "next/navigation";
import TicketForm from "./ticketForm";
import styles from './syles.module.css';
import TicketId from "./ticketId";
import TicketTarjeta from "./ticketTarjeta";
import { toast } from 'react-toastify';


export default function Ticket() {
    const { user } = useContext(ReservaContext);
    const router = useRouter();
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        sex: '',
        document: '',
        number_doc: '',
        email: ''
    });
    const [ticketDetalle, setTicketDetalle] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            console.log('user en el if:', user);  // 👈 para debuggear
            alert(`Debes estar logeado!`);
            return router.push('/login');
        }

        console.log('nuevo formulario', form);

        const cartId = user.cart;
        const userId = user._id;

        console.log('userID', userId, 'CartId', cartId, 'user', user.ticket)
        try {
            const response = await fetch(`https://node-flight956-backend.onrender.com/api/ticket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cartId, userId }),

            })

            if (!response.ok) {
                return alert(`${data.message}`);
            }

            const data = await response.json();

            toast.success(`Reserva exitosa!`);
            setTicketDetalle(data.payload); // guarda TODO el ticket

        } catch (error) {
            alert(`Error al generar el ticket!`)
        }
    };

    return (
        <>

            {ticketDetalle ? (
                <>
                    <TicketTarjeta ticket={ticketDetalle} />
                </>
            ) : (
                <>
                    <TicketForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        form={form}
                    />
                </>
            )}

        </>
    );
}
