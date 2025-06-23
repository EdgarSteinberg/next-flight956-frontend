/* import VuelosPorProvincia from "@/components/vuelos/vuelosPorProvincia"

export default function VuelosPorProvinciaPage(){
   return(
    <>
        <VuelosPorProvincia/>
    </>
   )
} */


import { Suspense } from "react";
import VuelosPorProvincia from "@/components/vuelos/vuelosPorProvincia";
import Loading from "@/components/hoteles/loading";

export default function VuelosPorProvinciaPage() {
    return (
        <Suspense fallback={<Loading />}>
            <VuelosPorProvincia />
        </Suspense>
    );
}