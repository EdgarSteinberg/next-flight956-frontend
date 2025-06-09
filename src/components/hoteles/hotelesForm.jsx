'use client';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

export default function HotelesForm({
    handleSubmit,
    busqueda,
    setBusqueda,
    hotelesFiltrados,
    handleSeleccion,
    setMostrarDropdown,
    mostrarDropdown

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
        <>
            <div className={styles.autocompleteWrapper}>
                <form onSubmit={handleSubmit} className={styles.formStyle}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"

                            value={busqueda}
                            onChange={(e) => {
                                setBusqueda(e.target.value);
                                setMostrarDropdown(true); // Mostrar dropdown mientras escribe
                            }}
                            placeholder="Escribí el nombre de la ciudad"
                            className={styles.inputStyle}
                        />
                        {/* Mostrar coincidencias solo si hay algo escrito */}
                        {busqueda && mostrarDropdown && (
                            <ul className={styles.dropdown}>
                                {hotelesFiltrados.map((hot) => (
                                    <li
                                        key={hot._id}
                                        onClick={() => {
                                            handleSeleccion(hot._id, hot.name);
                                            setMostrarDropdown(false); // Ocultamos el dropdown
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {hot.name}
                                    </li>
                                ))}
                            </ul>
                        )}


                    </div>
                    {/* Fechas */}
                    <input
                        type="date"
                        name="fecha_ida"
                        min={minFecha}
                        className={styles.inputStyle}
                    />
                    <br />
                    <input
                        type="date"
                        name="fecha_vuelta"
                        min={minFecha}
                        className={styles.inputStyle}
                    />
                    <button type="submit" className={styles.buttonSubmit}>Buscar</button>
                </form>

            </div>
        </>
    )
}