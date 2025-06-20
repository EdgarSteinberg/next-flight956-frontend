 "use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./loginForm";
import { ReservaContext } from "@/context/reservaContenxt";
import { getCurrentUser } from "@/services/api";
import Loading from "./loading";
import styles from "./styles.module.css";
import { toast } from 'react-toastify';

export default function Login() {
    const router = useRouter();
    const { setUser, user } = useContext(ReservaContext);
    const [loggingIn, setLoggingIn] = useState(false);
    const [dataUser, setDataUser] = useState({ email: "", password: "" });

   

    const loginUser = async () => {
        try {
            setLoggingIn(true); // ⏳ bloquea la UI

            const response = await fetch(
                "https://node-flight956-backend.onrender.com/api/users/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include", // (no duplica)
                    body: JSON.stringify(dataUser),
                }
            );

            if (!response.ok) {
                const { error } = await response.json();
                toast.error(`Error al logearse: ${error}`);
                setLoggingIn(false);
                return;
            }

            const { status } = await response.json();
            if (status === "success") {
                const currentUser = await getCurrentUser();
                if (currentUser) setUser(currentUser);
                /* 🚀 redirige; el componente se desmonta */
                toast.success(`Usuario logeado correctamente!`)
                router.push("/paquetes");
            } else {
                toast.error("Error al logear el usuario");
                setLoggingIn(false);
            }
        } catch (err) {
            console.error("Error:", err);
            setLoggingIn(false);
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        loginUser();
        setDataUser({ email: "", password: "" });
    };

    const handleOnChange = (e) =>
        setDataUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    /* 1) loader inicial  2) loader durante el login */
    if (loggingIn) return <Loading />;

    return (
        <>
            {user ? (
                <div className={styles.userData}>
                    <h3>¡Ya estás logueado!</h3>
                    <p>
                        Nombre: {user.first_name} Apellido: {user.last_name}
                    </p>
                    <p>Email: {user.email}</p>
                    <button onClick={() => router.back()} className={styles.loginButton}>
                        volver
                    </button>
                </div>
            ) : (
                <LoginForm
                    handleOnChange={handleOnChange}
                    handleOnSubmit={handleOnSubmit}
                    dataUser={dataUser}
                />
            )}
        </>
    );
}
