/* "use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./loginForm";
import { ReservaContext } from "@/context/reservaContenxt";
import { getCurrentUser } from "@/services/api";
import Loading from "./loading";
import styles from './styles.module.css'

export default function Login() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const { setUser, user } = useContext(ReservaContext);

    const [dataUser, setDataUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        setLoading(false)
    }, [])

    const loginUser = async () => {
      
        try {

            const response = await fetch("https://node-flight956-backend.onrender.com/api/users/login", {
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
                alert("Usuario logeado correctamente");

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

    if (loading) {
        return <Loading />
    }
 
 
    return (
        <>
            
            {user ? (
                <div className={styles.userData}>
                    <h3>¡Ya estás logueado!</h3>
                    <p>Nombre: {user.first_name} Apellido: {user.last_name}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={() => router.back()} className={styles.loginButton}>volver</button>
                </div>

            ) : (
                <>
                    <LoginForm
                        handleOnChange={handleOnChange}
                        handleOnSubmit={handleOnSubmit}
                        dataUser={dataUser}
                    />
                </>
            )}

        </>
    );
}
 */

"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./loginForm";
import { ReservaContext } from "@/context/reservaContenxt";
import { getCurrentUser } from "@/services/api";
import Loading from "./loading";
import styles from "./styles.module.css";

export default function Login() {
    const router = useRouter();
    const { setUser, user } = useContext(ReservaContext);

    /** Loader inicial (al montar la página)
    const [loading, setLoading] = useState(true);
    /** Loader mientras se envía el formulario */
    const [loggingIn, setLoggingIn] = useState(false);

    const [dataUser, setDataUser] = useState({ email: "", password: "" });

    /* spinner inicial */
    //suseEffect(() => setLoading(false), []);

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
                alert(`Error al logearse: ${error}`);
                setLoggingIn(false);
                return;
            }

            const { status } = await response.json();
            if (status === "success") {
                const currentUser = await getCurrentUser();
                if (currentUser) setUser(currentUser);
                /* 🚀 redirige; el componente se desmonta */
                router.push("/paquetes");
            } else {
                alert("Error al logear el usuario");
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
