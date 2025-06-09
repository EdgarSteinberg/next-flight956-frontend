"use client";

import dynamic from 'next/dynamic';

const Ticket = dynamic(() => import("@/components/ticket/ticket"), { ssr: false });
export default function TicketPage() {
    return (
        <>
            <Ticket />
        </>
    )
}