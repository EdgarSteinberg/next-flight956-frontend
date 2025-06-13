'use client';

import { getAll } from "@/services/api";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import Loading from "./loading"
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import styles from './styles.module.css';
import VuelosList from "./vuelosList";
import VuelosForm from "./vuelosForm";
import { useRouter } from "next/navigation";

export default function Vuelos({ destinoFijo = null, soloFormulario }) {
  const router = useRouter();
  const [provincias, setProvincias] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fechaIda, setFechaIda] = useState('');
  const [fechaVuelta, setFechaVuelta] = useState('');

  const [origenSeleccionado, setOrigenSeleccionado] = useState(null);
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null);
  const [origenTexto, setOrigenTexto] = useState('');
  const [destinoTexto, setDestinoTexto] = useState('');

  const [mostrarDropdownOrigen, setMostrarDropdownOrigen] = useState(false);
  const [mostrarDropdownDestino, setMostrarDropdownDestino] = useState(false);
  const [matchBusqueda, setMatchBusqueda] = useState([]);
  const [cantidadPasajeros, setCantidadPasajeros] = useState(1);

  useEffect(() => {
    getAll('provincias')
      .then(data => setProvincias(data))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const destino = destinoFijo || destinoSeleccionado;

    if (!origenSeleccionado || !destino || !fechaIda || !fechaVuelta) {
      alert("Faltan completar todos los campos.");
      return;
    }

    try {
      const url = `https://node-flight956-backend.onrender.com/api/vuelos/buscar?origen=${origenSeleccionado._id}&destino=${destino._id}&vuelo_ida=${fechaIda}&vuelo_vuelta=${fechaVuelta}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Error en la búsqueda");

      const data = await response.json();
      if (!data.payload || data.payload.length === 0) {
        alert("No se encontraron vuelos para los criterios seleccionados.");

        setMatchBusqueda(data.payload); // Estado much

        return;
      }
      setMatchBusqueda(data.payload);

      router.push(`/vuelos/${data.payload[0]._id}`);

    } catch (error) {
      setError(`Error al obtener los vuelos: ${error.message}`);
    }
  };

  if (loading) return <Loading />

  return (
    <>


      <VuelosForm
        origenTexto={origenTexto}
        setOrigenTexto={setOrigenTexto}
        origenSeleccionado={origenSeleccionado}
        setOrigenSeleccionado={setOrigenSeleccionado}
        destinoTexto={destinoTexto}
        setDestinoTexto={setDestinoTexto}
        destinoSeleccionado={destinoSeleccionado}
        setDestinoSeleccionado={setDestinoSeleccionado}
        provincias={provincias}
        fechaIda={fechaIda}
        setFechaIda={setFechaIda}
        fechaVuelta={fechaVuelta}
        setFechaVuelta={setFechaVuelta}
        cantidadPasajeros={cantidadPasajeros}
        setCantidadPasajeros={setCantidadPasajeros}
        handleSubmit={handleSubmit}
        mostrarDropdownOrigen={mostrarDropdownOrigen}
        setMostrarDropdownOrigen={setMostrarDropdownOrigen}
        mostrarDropdownDestino={mostrarDropdownDestino}
        setMostrarDropdownDestino={setMostrarDropdownDestino}
        destinoFijo={destinoFijo}
      />


      {!soloFormulario && (
        <div>
          <VuelosList />
        </div>
      )}

    </>
  );
}
