'use client';

import { useContext, useState } from "react";
import { ReservaContext } from "@/context/reservaContenxt";
import { useRouter } from "next/navigation";
import styles from './syles.module.css';
import TicketForm from "./ticketForm";

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

        const cartId = user.cart ;
        const userId = user._id;
        console.log('userID', userId, 'CartId', cartId)
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

            alert(`Reserva exitosa!`);
        } catch (error) {
            alert(`Error al generar el ticket!`)
        }
    };

    return (
        <>
           <TicketForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            form={form}
          
           />
        </>
    );
}
