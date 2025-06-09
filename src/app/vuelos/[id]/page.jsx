'use client'
import VuelosDetalle from "@/components/vuelos/vuelosDetalle";
import { useParams } from "next/navigation";


export default function DetalleVuelosPaeg() {
    const { id } = useParams();

    return(
        <>
            <VuelosDetalle id={id}/>
        </>
    )
}