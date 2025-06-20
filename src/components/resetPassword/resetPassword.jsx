'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from './resetPasswordForm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [passwordRepaet, setPasswordRepeat] = useState('');
    const [mostrarError, setMostrarError] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const resetPassword = async (e) => {
        e.preventDefault(); // evita recarga de página

        // Verificación de contraseñas
        if (password !== passwordRepaet) {
            setMostrarError(true);
            setPassword('');
            setPasswordRepeat('')
            return; // Salimos de la función si hay error
        } else {
            setMostrarError(false);
        }

        try {
            const response = await fetch(`https://node-flight956-backend.onrender.com/api/users/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token,
                    newPassword: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                return   toast.error(`${data.error || 'Ocurrió un error'}`);
            }

            toast.success('Contraseña restablecida con éxito');

            setPassword('');
            setPasswordRepeat('');

            router.push('./login')
        } catch (error) {
              toast.error(`Error al enviar la nueva contraseña: ${error.message}`);
        }
    };

    return (
        <>

            <ResetPasswordForm
                resetPassword={resetPassword}
                password={password}
                setPassword={setPassword}
                passwordRepaet={passwordRepaet}
                setPasswordRepeat={setPasswordRepeat}
                mostrarError={mostrarError}
            />
        </>
    );
}
