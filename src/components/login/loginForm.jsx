"use client";

import { useRouter } from "next/navigation";
import styles from './styles.module.css';
import { useState, useEffect } from "react";

export default function LoginForm({ handleOnSubmit, handleOnChange, dataUser }) {
    const [buttonSelect, setButtonSelect] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (buttonSelect === "register") {
            router.push("/register");
        } else if (buttonSelect === "resetPassword") {
            router.push("/sendEmail");
        }
    }, [buttonSelect, router]);

    return (
        <div className={styles.poppins}>
            <form onSubmit={handleOnSubmit} className={styles.formContainer}>
                <div className={styles.divContainer}>
                    <h3 className={styles.title}>Iniciar Sesión</h3>
                </div>
                <div className={styles.divContainer}>
                    <label htmlFor="email" className={styles.labelContainer}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={dataUser.email}
                        onChange={handleOnChange}
                        required
                        className={styles.inputContainer}
                        autoComplete="username"
                    />
                </div>
                <div className={styles.divContainer}>
                    <label htmlFor="password" className={styles.labelContainer}>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={dataUser.password}
                        onChange={handleOnChange}
                        required
                        className={styles.inputContainer}
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit" className={styles.button}>
                    Enviar
                </button>
                <div className={styles.loginPrompt}>
                    <strong className={styles.loginStrong}>¿No tienes cuenta?</strong>
                    <button
                        onClick={() => setButtonSelect("register")}
                        className={styles.loginButton}
                        type="button"
                    >
                        Crear Cuenta
                    </button>
                </div>
                <div className={styles.loginPrompt}>
                    <strong className={styles.loginStrong}>¿Olvidaste tu contraseña?</strong>
                    <button
                        onClick={() => setButtonSelect("resetPassword")}
                        className={styles.loginButton}
                        type="button"
                    >
                        Recuperar contraseña
                    </button>
                </div>
            </form>
        </div>
    );
}
