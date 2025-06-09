'use client';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import styles from './styles.module.css';

export default function VuelosForm({
  origenTexto, setOrigenTexto, origenSeleccionado, setOrigenSeleccionado,
  destinoTexto, setDestinoTexto, destinoSeleccionado, setDestinoSeleccionado,
  provincias, fechaIda, setFechaIda, fechaVuelta, setFechaVuelta,
  handleSubmit, cantidadPasajeros, setCantidadPasajeros, mostrarDropdownOrigen,
  setMostrarDropdownOrigen, mostrarDropdownDestino, setMostrarDropdownDestino, destinoFijo
}) {

  const provinciaOrigenFiltrada = provincias.filter((p) =>
    p.name.toLowerCase().includes(origenTexto.toLowerCase())
  );
  const provinciasFiltradasDestino = provincias.filter((p) =>
    p.name.toLowerCase().includes(destinoTexto.toLowerCase())
  );

  useEffect(() => {
    if (destinoFijo) {
      setDestinoTexto(destinoFijo.name);
      setDestinoSeleccionado(destinoFijo);
    }
  }, [destinoFijo]);

  return (
    <div className={styles.autocompleteWrapper}>
      <form   onSubmit={handleSubmit} className={styles.formStyle}>
        <div style={{ position: 'relative'  }} className={styles.formWrapper}>
          {/* Origen */}
         
            <input
              type="text"
              name="origen"
              placeholder="Selecione una provincia"
              value={origenTexto}
              onChange={(e) => {
                setOrigenTexto(e.target.value);
                setOrigenSeleccionado(null);
                setMostrarDropdownOrigen(true)
              }}
              className={styles.inputStyle}
            />
            {origenTexto && mostrarDropdownOrigen && (
              <ul className={styles.dropdown}>
                {provinciaOrigenFiltrada.map((p) => (
                  <li
                    key={p._id}
                    onClick={() => {
                      setOrigenTexto(p.name);
                      setOrigenSeleccionado(p);
                      setMostrarDropdownOrigen(false)

                    }}
                  >
                    {p.name}
                  </li>
                ))}
              </ul>
            )}
    

          {/* Destino */}
        
            <input
              type="text"
              name="destino"
              placeholder="Destino"
              value={destinoFijo ? destinoFijo.name : destinoTexto}
              disabled={!!destinoFijo} // Deshabilitado si viene fijo
              onChange={(e) => {
                if (!destinoFijo) {
                  setDestinoTexto(e.target.value);
                  setDestinoSeleccionado(null);
                  setMostrarDropdownDestino(true);
                }
              }}
              className={styles.inputStyle}
            />
            {!destinoFijo && destinoTexto && mostrarDropdownDestino && (
              <ul className={styles.dropdown}>
                {provinciasFiltradasDestino.map((p) => (
                  <li
                    key={p._id}
                    onClick={() => {
                      setDestinoTexto(p.name);
                      setDestinoSeleccionado(p);
                      setMostrarDropdownDestino(false);
                    }}
                  >
                    {p.name}
                  </li>
                ))}
              </ul>
            )}
    
          </div>

          {/* Fechas */}
          <DatePicker
            selected={fechaIda}
            onChange={(date) => setFechaIda(date)}
            placeholderText="Ida"
            dateFormat="dd/MM/yyyy"
            locale={es}
            className={styles.inputStyle}
          />

          <DatePicker
            selected={fechaVuelta}
            onChange={(date) => setFechaVuelta(date)}
            placeholderText="Vuelta"
            dateFormat="dd/MM/yyyy"
            locale={es}
            className={styles.inputStyle}
          />

          {/* Cantidad de pasajeros */}
          <input
            type="number"
            min="1"
            name="cantidadPasajeros"
            placeholder="Cantidad de pasajeros"
            value={cantidadPasajeros}
            onChange={(e) => setCantidadPasajeros(e.target.value)}
            className={styles.inputStyle}
          />

          <button type="submit" className={styles.buttonSubmit}>Buscar</button>
      </form>
    </div>
  );
}



