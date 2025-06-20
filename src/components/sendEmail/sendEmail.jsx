'use client';

import { useState } from "react";
import SendEmailForm from "./sendEmailForm";
import { toast } from 'react-toastify';

export default function SendEmail() {
    const [email, setEmail] = useState('');

    const sendEmail = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://node-flight956-backend.onrender.com/api/users/sendEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),  // Se envía como objeto
            });

            const data = await response.json(); // ¡await aquí!

            if (!response.ok) {
                return toast.error(data.error || 'Error al enviar el email');
            }

            if (data.status === "success") {
                toast.success('Email enviado correctamente!');
            } else {
                toast.error(data.error || 'Error al enviar el email');
            }

        } catch (error) {
            toast.error(`Error al enviar el email: ${error.message}`);
        }
    };

    return (
        <>
           <SendEmailForm
                email={email}
                setEmail={setEmail}
                sendEmail={sendEmail}
           />
        </>
    );
}
