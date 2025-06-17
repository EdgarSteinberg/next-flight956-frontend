'use client'
import { useRouter } from "next/navigation"


export default function TicketTarjeta({ticket}) {
    const router = useRouter();
    return (
        <>
            <h3>Ticket</h3>
            <p>Código: {ticket.codigo}</p>
            <p>Monto: ${ticket.total}</p>
            <p>Fecha: {new Date(ticket.fecha).toLocaleString()}</p>

            <button onClick={() => router.push(`/ticket/${ticket._id}`)}>
                Ver detalle
            </button>
        </>
    )
}