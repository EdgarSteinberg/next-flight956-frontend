import styles from './styles.module.css'
export default function CityForm({ handleOnSubmit, handleOnChange, dataCity }) {

    return (
        <>
            <form onSubmit={handleOnSubmit} className={styles.formContainer} encType="multipart/form-data" >
                <div className={styles.column}>
                    <label htmlFor="name" className={styles.label}>Provincia</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Ingrese un nombre de la ciudad"
                        value={dataCity.name}
                        onChange={handleOnChange}
                        required
                        className={styles.inputStyle}
                    />
                </div>

                <div className={styles.column}>
                    <label htmlFor="name" className={styles.label} >Pais</label>
                    <input
                        type="text"
                        name="country"
                        placeholder="Ingrese nombre del pais"
                        value={dataCity.country}
                        onChange={handleOnChange}
                        required
                        className={styles.inputStyle}
                    />
                </div>

                <div className={styles.column}>
                    <label htmlFor="name" className={styles.label}>Carga una imagen</label>
                    <input
                        type='file'
                        name='provincia'
                        placeholder="Carga una imagen"
                        onChange={handleOnChange}
                        required
                        className={styles.inputStyle}
                    />
                </div>
                <br></br>
                <button type="submit" className={styles.button}>
                    Enviar
                </button>
            </form>
        </>
    )
}