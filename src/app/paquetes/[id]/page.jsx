// app/paquetes/[id]/page.jsx
'use client';
import PaqueteDetalle from '@/components/paquetes/paquetesDetalle';
import { useParams } from 'next/navigation';


export default function DetallePaquetesPage() {
    const { id } = useParams();

    return (
        <>
            <PaqueteDetalle id={id}/>
        </>
    )
}
