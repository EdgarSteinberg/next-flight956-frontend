import styles from './styles.module.css';



export default function PaquetesForm({ error, hoteles, vuelos, provincias, form, handleChange, handleSubmit }) {
    return (
        <>
            <div className={styles.poppins}>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.formContainer}>


                    {/* Selección de provincia */}
                    <div className={styles.divContainer}>
                        <label className={styles.label}>Destino</label>
                        <select name="destino" onChange={handleChange} className={styles.inputStyle}>
                            {provincias.map(provincia => (
                                <option key={provincia._id} value={provincia._id}>
                                    {provincia.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.divContainer}>
                        <label className={styles.label}>Vuelo</label>
                        <select name="vuelo" value={form.vuelo} onChange={handleChange} className={styles.inputStyle}>
                            <option value=''>Seleccione el vuelo</option>
                            {vuelos.map((vue) => (
                                <option key={vue._id} value={vue._id}>{vue.empresa}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.divContainer}>
                        <label className={styles.label}>Hotel</label>
                        <select name="hotel" value={form.hotel} onChange={handleChange} className={styles.inputStyle}>
                            <option value=''>Seleccione el hotel</option>
                            {hoteles.map((ho) => (
                                <option key={ho._id} value={ho._id}>{ho.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.divContainer}>
                        <label className={styles.label}>Desde  </label>
                        <input
                            type="datetime-local"
                            name="desde_fecha"
                            value={form.desde_fecha}
                            onChange={handleChange}
                            className={styles.inputStyle} />
                    </div>

                    <div className={styles.divContainer}>
                        <label className={styles.label}>Hasta  </label>
                        <input
                            type="datetime-local"
                            name="hasta_fecha"
                            value={form.hasta_fecha}
                            onChange={handleChange}
                            className={styles.inputStyle} />
                    </div>
                    <button type="submit" className={styles.button}>Enviar</button>

                </form>
            </div>
            {error && <p style={{ color: 'red' }}>{error.message || 'Ocurrió un error inesperado'}</p>}
        </>
    );
}
