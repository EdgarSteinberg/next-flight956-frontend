'use client';

import { getCurrentUser } from '@/services/api';
import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 1. Crear el contexto
export const ReservaContext = createContext();

// 2. Crear el hook para consumir el contexto (opcional pero recomendado)
export const useReserva = () => useContext(ReservaContext);

// 3. Crear el provider
export default function ReservaProvider({ children }) {
    const router = useRouter();
    const [reservas, setReservas] = useState([]);
    const [user, setUser] = useState(null);



    const agregarReserva = ({ id, referencia, quantity = 1 }) => {
        if (!user) {
            alert("Debes iniciar sesión para agregar reservas al carrito.");
            return; // Evita agregar la reserva si no hay usuario logueado
        }
        
        setReservas(prev => [
            ...prev,
            {
                productoId: id,
                referencia,
                quantity
            }
        ])
    };
    // Este useEffect se ejecutará cada vez que el estado 'reservas' cambie
    useEffect(() => {
        console.table(reservas);
        console.log(user)

    }, [reservas, user]);


    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();

            if (currentUser) {
                setUser(currentUser); // Usuario logueado
            } else {
                console.log("Usuario no logueado, se mantiene como anónimo");
            }
        };

        fetchUser();
    }, []);


    const eliminarReserva = (id) => {
        setReservas(reservas.filter(r => r.id !== id));
    };

    const limpiarReservas = () => {
        setReservas([]);
    };

    useEffect(() => {
        fetch(`https://node-flight956-backend.onrender.com/api/users`)
    }, [])

    return (
        <ReservaContext.Provider value={{ reservas, setReservas, agregarReserva, eliminarReserva, limpiarReservas, setUser, user }}>
            {children}
        </ReservaContext.Provider>
    );
}
