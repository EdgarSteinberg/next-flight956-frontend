'use client'
import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import { getAll } from '@/services/api';
import Loading from './loading';

export default function VuelosForm({ onSubmit }) {
    const [city, setCity] = useState([]);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        empresa: "",
        origen: "",
        destino: "",
        vuelo_ida: "",
        vuelo_vuelta: "",
        precio: "",
        duracion: "",
        clase: "Económica",
        asientos_disponibles: "",
        incluye_equipaje: false,
        pasajeros: ""
    });
    const [loading, setLoading] = useState(false); // Estado de carga

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const data = await getAll('provincias');
                setCity(data);
            } catch (error) {
                console.error("Error fetching cities:", error);
            } finally {
                setLoading(false);
            }
        };

        // Solo ejecutamos la carga una vez
        if (city.length === 0) {
            fetchCities();
        }
    }, [city]); // Solo vuelve a ejecutar si "city" está vacío, lo que evita múltiples cargas

    if (loading) {
        return <Loading/>; // Mostrar mensaje de carga
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;
        setForm((prev) => ({ ...prev, [name]: val }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form, setForm); // Mandamos los datos y cómo resetear el form
    };
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className={styles.column}>
                    <label>Aerolínea:</label>
                    <select name="empresa" value={form.empresa} onChange={handleChange} className={styles.inputStyle} required>
                        <option value="">Selecciona una aerolínea</option>
                        <option value="aerolineas_argentinas">Aerolíneas Argentinas</option>
                        <option value="latam">LATAM</option>
                        <option value="flybondi">Flybondi</option>
                    </select>
                </div>

                <div className={styles.column}>
                    <label>Origen</label>
                    <select name="origen" value={form.origen} onChange={handleChange} className={styles.inputStyle} required>
                        <option value="">Selecciona una ciudad</option>
                        {city.map((prov) => (
                            <option key={prov._id} value={prov._id}>
                                {prov.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.column}>
                    <label>Destino</label>
                    <select name="destino" value={form.destino} onChange={handleChange} className={styles.inputStyle} required>
                        <option value="">Selecciona una ciudad</option>
                        {city.map((prov) => (
                            <option key={prov._id} value={prov._id}>
                                {prov.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.column}>
                    <label>Vuelo Ida</label>
                    <input
                        type="datetime-local"
                        name="vuelo_ida"
                        value={form.vuelo_ida}
                        onChange={handleChange}
                        className={styles.inputStyle}
                        required />
                </div>

                <div className={styles.column}>
                    <label>Vuelo Vuelta</label>
                    <input
                        type="datetime-local"
                        name="vuelo_vuelta"
                        value={form.vuelo_vuelta}
                        onChange={handleChange}
                        className={styles.inputStyle} />
                </div>

                <div className={styles.column}>
                    <label>Precio</label>
                    <input
                        type="number"
                        name="precio"
                        placeholder='Precio del vuelo'
                        value={form.precio}
                        onChange={handleChange}
                        className={styles.inputStyle}
                        required />
                </div>

                <div className={styles.column}>
                    <label>Duración</label>
                    <input
                        type="text"
                        name="duracion"
                        placeholder='Duracion del vuelo'
                        value={form.duracion}
                        onChange={handleChange}
                        className={styles.inputStyle}
                        required />
                </div>

                <div className={styles.column}>
                    <label>Clase</label>
                    <select name="clase" value={form.clase} onChange={handleChange} className={styles.inputStyle} >
                        <option value="Económica">Económica</option>
                        <option value="Ejecutiva">Ejecutiva</option>
                        <option value="Primera">Primera</option>
                    </select>
                </div>

                <div className={styles.column}>
                    <label>Asientos disponibles</label>
                    <input
                        type="number"
                        name="asientos_disponibles"
                        placeholder='Asientos disponibles'
                        value={form.asientos_disponibles}
                        onChange={handleChange}
                        className={styles.inputStyle}
                        required />
                </div>

                <div className={styles.column}>
                    <label>Incluye equipaje</label>
                    <input
                        type="checkbox"
                        name="incluye_equipaje"
                        checked={form.incluye_equipaje}
                        onChange={handleChange}
                        className={styles.inputStyle} />
                </div>

                <div className={styles.column}>
                    <label>ID del pasajero</label>
                    <input
                        type="text"
                        name="pasajeros"
                        placeholder='Id del usuario'
                        value={form.pasajeros}
                        onChange={handleChange}
                        required
                        className={styles.inputStyle} />
                </div>
                <button type="submit" className={styles.button} >Crear vuelo</button>

            </form>
        </>
    )
}