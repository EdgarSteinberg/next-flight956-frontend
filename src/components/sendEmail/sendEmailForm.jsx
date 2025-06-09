'use client';
import styles from './styles.module.css';

export default function SendEmailForm({ sendEmail, email, setEmail }) {

    return (
        <>
            <form onSubmit={sendEmail} className={styles.formContainer}>
                  <div className={styles.divContainer}>
                    <h3 className={styles.title}>Recuperar contraseña</h3>
                </div>
                <div className={styles.divContainer}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.inputContainer}
                    />
                </div>

                
                <button type="submit" className={styles.button}>Enviar</button >
            </form>
        </>
    )
}