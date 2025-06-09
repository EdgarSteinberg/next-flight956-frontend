'use client';
import HotelesDetalle from "@/components/hoteles/hotelesDetalle";
import { useParams } from "next/navigation";


export default function DetalleHotelPage() {

    const { id } = useParams();

    return (
        <>
            <HotelesDetalle id={id} />
        </>

    )
}
