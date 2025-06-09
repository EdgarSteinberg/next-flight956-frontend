'use client';

import TicketId from "@/components/ticket/ticketId";
import { useParams } from "next/navigation";

export default function TicketIdPage() {
    const { id } = useParams();
    return (
        <>
            <TicketId id={id} />
        </>
    )
}