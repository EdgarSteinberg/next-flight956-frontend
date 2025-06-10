"use client";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {

    const router = useRouter();

    return (
        <div>
            <h3 style={{ color: 'black', fontSize: '20px', marginTop: '250px', textAlign: 'center' }}>
                404 || This page could not be found.</h3>
            <div style={{
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center'
            }}>
                <button
                    style={{
                        padding: "12px 14px",
                        borderRadius: "6px",
                        color: "#264399",

                        cursor: "pointer",
                        fontWeight: "700",
                        fontSize: "0.9rem",

                    }}
                    onClick={() => router.back()} // ← ¡Esto te manda a la página anterior!
                >
                    🔙 Volver a la página anterior
                </button>
            </div>
        </div>
    )
}
