'use client'
import { useRouter } from "next/navigation"
import styles from './syles.module.css'

export default function TicketTarjeta({ ticket }) {
    const router = useRouter();
    return (
        <div className={styles.flex}>
        <div className={styles.divContainer}>
            <h3 className={styles.title} style={{ textAlign: 'center' }}>Ticket</h3>
            <div className={styles.formContainer} >
                <p>Código: {ticket.codigo}</p>
                <p>Monto: ${ticket.total}</p>
                <p>Fecha: {new Date(ticket.fecha).toLocaleString()}</p>

                <button onClick={() => router.push(`/ticket/${ticket._id}`)} className={styles.button}>
                    Ver detalle
                </button>
            </div>
        </div>
        </div>
    )
}