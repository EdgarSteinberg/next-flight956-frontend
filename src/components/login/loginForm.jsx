"use client";

import { useRouter } from "next/navigation";

export default function LoginForm({ handleOnSubmit, handleOnChange, dataUser }) {
    const router = useRouter();

    const handleRedirect = () => {
        router.push("/register");
    };

    return (
        <>
            <form onSubmit={handleOnSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={dataUser.email}
                    onChange={handleOnChange}
                    required
                    style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={dataUser.password}
                    onChange={handleOnChange}
                    required
                    style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff", borderRadius: "4px" }}>
                    Enviar
                </button>
            </form>
            <strong>No tienes cuenta?</strong>
            <button onClick={handleRedirect} style={{ marginTop: "10px", padding: "8px", backgroundColor: "#28a745", color: "#fff", borderRadius: "4px" }}>
                Crear Cuenta
            </button>
        </>
    );
}
