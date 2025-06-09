import styles from './styles.module.css'

export default function HotelForm({ city, form, handleSubmit, handleChange }) {

    return (
        <div style={{ margin: '0 auto', width: '95%' }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.formContainer}>
                <div className={styles.column}>
                    <label className={styles.label}>Nombre Hotel</label>
                    <input
                        type="text"
                        name="name"
                        placeholder='Nombre Hotel'
                        value={form.name}
                        onChange={handleChange}
                        className={styles.inputStyle}
                    />
                </div>

                <div className={styles.column}>
                    <label className={styles.label}>Ciudad Hotel</label>
                    <select name="location" value={form.location} onChange={handleChange} className={styles.inputStyle}>
                        <option value=''>Seleciona una ciudad</option>
                        {city.map((ciudad) => (
                            <option key={ciudad._id} value={ciudad._id}>
                                {ciudad.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.column}>
                    <label className={styles.label}>Description Hotel</label>
                    <input
                        type="text"
                        name="description"
                        placeholder='Description Hotel'
                        value={form.description}
                        onChange={handleChange}
                        className={styles.inputStyle}
                    />
                </div>

                <div className={styles.column}>
                    <label className={styles.label}>Estrellas Hotel</label>
                    <select
                        name="stars"
                        value={form.stars}
                        onChange={handleChange}
                        className={styles.inputStyle}
                    >
                        <option value="">Selecciona estrellas</option>
                        <option value={1}>⭐</option>
                        <option value={2}>⭐⭐</option>
                        <option value={3}>⭐⭐⭐</option>
                        <option value={4}>⭐⭐⭐⭐</option>
                        <option value={5}>⭐⭐⭐⭐⭐</option>
                    </select>
                </div>

                <div className={styles.column}>
                    <label className={styles.label}>Cantidad de noches Hotel</label>
                    <input
                        type="number"
                        name="numberOfNights"
                        placeholder='Cantidad de noches Hotel'
                        value={form.numberOfNights}
                        onChange={handleChange}
                        className={styles.inputStyle}
                    />
                </div>

                <div className={styles.column}>
                    <label className={styles.label}>Pecio por noche Hotel</label>
                    <input
                        type="number"
                        name="nightPrice"
                        placeholder='Pecio por noche Hotel'
                        value={form.nightPrice}
                        onChange={handleChange}
                        className={styles.inputStyle}
                    />
                </div>

                <div className={styles.column}>
                    <label className={styles.label}>Precio Total Hotel</label>
                    <input
                        type="number"
                        name="price"
                        placeholder='Pecio total Hotel'
                        value={form.price}
                        onChange={handleChange}
                        readOnly
                        className={styles.inputStyle}
                    />
                </div>


                <div className={styles.column}>
                    <label className={styles.label}>Desayuno Hotel</label>
                    <input
                        type="checkbox"
                        name="breakfastIncluded"
                        placeholder='Desayuno Hotel'
                        value={form.breakfastIncluded}
                        onChange={handleChange}
                        className={styles.inputStyle}
                    />
                </div>

                <div className={styles.column}>
                    <label className={styles.label}>Carga la imagen del Hotel</label>
                    <input
                        type="file"
                        name="hotel"
                        placeholder='Carga la imagen del Hotel'
                        onChange={handleChange}
                        className={styles.inputStyle}
                    />
                </div>
                <button type="submit" className={styles.button}>Enviar</button>

            </form>
        </div>
    )
}