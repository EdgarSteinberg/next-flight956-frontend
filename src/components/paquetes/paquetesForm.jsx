'use client';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function PaquetesForm({
    handleSubmit,
    buscar,
    setBuscar,
    paquetesFilter,
    handlePaquete,
    fecha_ida,
    setFecha_ida,
    fecha_vuelta,
    setFecha_vuelta,
    paqueteSeleccionado,
    setPaqueteSeleccionado,
    buscarVisible,
    setBuscarVisible
}) {
    const [minFecha, setMinFecha] = useState('');

    useEffect(() => {
        // Solo se ejecuta en el cliente, después del renderizado inicial
        if (typeof window !== 'undefined') {
            const hoy = new Date().toISOString().split("T")[0];
            setMinFecha(hoy);
        }
    }, []);

    // Si minFecha no está disponible, el componente no se renderiza
    if (!minFecha) {
        return null; // o puedes devolver un "loading" si lo prefieres
    }

    return (
        <div className={styles.autocompleteWrapper}>
            <form onSubmit={handleSubmit} className={styles.formStyle}>
                <div style={{ position: 'relative' }} className={styles.formWrapper}>
                    <input
                        type="text"
                        value={buscar || buscarVisible}
                        onChange={(e) => {
                            setBuscar(e.target.value);
                            setBuscarVisible('');
                            setPaqueteSeleccionado('');
                        }}
                        className={styles.inputStyle}
                        placeholder="Seleccione una ciudad"
                    />

                    {buscar && paquetesFilter.length > 0 && (
                        <ul className={styles.dropdown}>
                            {paquetesFilter.map((paq) => (
                                <li
                                    key={paq._id}
                                    onClick={() => handlePaquete(paq)} // Seleccionamos el paquete
                                    style={{ cursor: 'pointer' }}
                                >
                                    {paq.destino.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
               
                    <input
                        type="date"
                        name="fecha_ida"
                        value={fecha_ida}
                        onChange={(e) => setFecha_ida(e.target.value)}
                        className={styles.inputStyle}
                        min={minFecha}
                    />
                    <input
                        type="date"
                        name="fecha_vuelta"
                        value={fecha_vuelta}
                        onChange={(e) => setFecha_vuelta(e.target.value)}
                        className={styles.inputStyle}
                        min={fecha_ida || minFecha}
                    />
                    <button type="submit" className={styles.buttonSubmit}>Buscar</button>
          
            </form>
        </div>
    );
}
