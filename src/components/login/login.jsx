"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./loginForm";

export default function Login() {
    const router = useRouter();


    const [dataUser, setDataUser] = useState({
        email: '',
        password: ''
    });

    const loginUser = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: 'POST',
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
                alert("Usuario logeado correctamente");

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

    return (
        <>
            <h4>Iniciar Seción</h4>
            <LoginForm
                handleOnChange={handleOnChange}
                handleOnSubmit={handleOnSubmit}
                dataUser={dataUser}
            />

        </>
    );
}
