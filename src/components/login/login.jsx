"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./loginForm";
import { ReservaContext } from "@/context/reservaContenxt";
import { getCurrentUser } from "@/services/api";
import Loading from "./loading";

export default function Login() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const { setUser } = useContext(ReservaContext);
    const [dataUser, setDataUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        setLoading(false)
    }, [])

    const loginUser = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataUser),
                credentials: 'include' // Usar 'include' en lugar de true para manejar cookies
            });

            if (!response.ok) {
                const errorResponse = await response.json(); // Aquí debería ser `response.json()` en lugar de `data.json()`
                alert(`Error al logearse: ${errorResponse.error}`);
                return;
            }

            const data = await response.json(); // Aquí está correctamente la respuesta de `response`

            if (data.status === "success") {
                // alert("Usuario logeado correctamente");

                // 🔥 Ahora sí: traer el usuario actual desde la cookie
                const currentUser = await getCurrentUser();
                if (currentUser) {
                    setUser(currentUser); // 🎯 lo guardás en el contexto global
                    router.push('/paquetes'); // ✅ redirigís donde quieras
                } else {
                    alert("No se pudo obtener el usuario");
                }

            } else {
                alert("Error al logear el usuario");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        loginUser();
        setDataUser({
            email: '',
            password: ''
        });
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setDataUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    if(loading){
        return <Loading/>
    }

    return (
        <>

            <LoginForm
                handleOnChange={handleOnChange}
                handleOnSubmit={handleOnSubmit}
                dataUser={dataUser}
            />

        </>
    );
}
