"use client";  // Añadir esta línea al principio del archiv
import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "./registerForm";

export default function Register() {
    const router = useRouter();

    const [dataUser, setDataUser] = useState({
        first_name: "",
        last_name: "",
        age: "",
        email: "",
        password: "",
    });

    const registerUser = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Asegurándonos de que estamos enviando JSON
                },
                body: JSON.stringify(dataUser), // Convertimos dataUser a JSON
            });

            if (!response.ok) {
                // Si la respuesta no es exitosa (status no 2xx)
                const errorData = await response.json();
                alert("Error al registrar el usuario: " + errorData.error);
                return;
            }

            const data = await response.json(); // Aquí obtenemos el JSON de la respuesta
            if (data.status === "success") {
                alert("Usuario registrado correctamente");
                console.log("Payload:", data.payload); // Aquí mostramos el payload
                router.push("/login");
            } else {
                alert("Error al registrar el usuario");
          
            }
        } catch (error) {
            alert("Hubo un error con la solicitud: " + error.message);
        }
    };


    const handleOnSubmit = (e) => {
        e.preventDefault();

        // Aquí invocamos la función registerUser para enviar los datos
        registerUser();

        setDataUser({
            first_name: "",
            last_name: "",
            age: "",
            email: "",
            password: "",
        })
    };

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setDataUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
       <>
        <h3>Crear Cuenta</h3>
        <RegisterForm
            handleOnSubmit={handleOnSubmit}
         handleOnChange={handleOnChange}
         dataUser={dataUser}
        />
       </>
    );
}
