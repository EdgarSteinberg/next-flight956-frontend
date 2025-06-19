'use client';
import { useState } from 'react';
import styles from './syles.module.css';
import TicketResumen from './ticketResume';
import Loading from './loading';

export default function TicketForm({ handleSubmit, handleChange, form }) {
    const [loading, setLoading] = useState(true)

    return (
        <div className={styles.flex}>

            <TicketResumen setLoading={setLoading} />
            {loading ? (
                <Loading />
            ) : (


                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <div className={styles.divContainer}>
                        <label className={styles.labelContainer}>Nombre</label>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="Igual que en el DNI"
                            value={form.first_name}
                            onChange={handleChange}
                            className={styles.inputContainer}
                            required
                        />

                        <label className={styles.labelContainer}>Apellido</label>
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Igual que en el DNI"
                            value={form.last_name}
                            onChange={handleChange}
                            className={styles.inputContainer}
                            required
                        />

                        <label className={styles.labelContainer}>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="example@gmail.com"
                            value={form.email}
                            onChange={handleChange}
                            className={styles.inputContainer}
                            required
                        />

                        <label className={styles.labelContainer}>Sexo</label>
                        <select
                            name="sex"
                            value={form.sex}
                            onChange={handleChange}
                            className={styles.inputContainer}
                            required
                        >
                            <option value="">Seleccione...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>

                        <label className={styles.labelContainer}>Tipo de documento</label>
                        <select
                            name="document"
                            value={form.document}
                            onChange={handleChange}
                            className={styles.inputContainer}
                            required
                        >
                            <option value="">Seleccione...</option>
                            <option value="DNI">DNI</option>
                            <option value="Pasaporte">Pasaporte</option>
                        </select>

                        <label className={styles.labelContainer}>Numero de documento</label>
                        <input
                            type="number"
                            name="number_doc"
                            value={form.number_doc}
                            onChange={handleChange}
                            className={styles.inputContainer}
                            required
                        />

                        <button type="submit" className={styles.button}>Reservar pasaje</button>
                    </div>
                </form>
            )
            }
        </div >


    )
}