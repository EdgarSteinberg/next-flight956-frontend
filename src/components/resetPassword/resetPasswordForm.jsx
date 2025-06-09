'use client';
import styles from './styles..module.css';

export default function ResetPasswordForm({resetPassword,password,setPassword, passwordRepaet, setPasswordRepeat,mostrarError}){

    return(
        <>
            <form onSubmit={resetPassword} className={styles.formContainer}>
                {mostrarError && <p style={{ color: 'red' }}>Las contraseñas no coinciden</p>}
                <div className={styles.divContainer}>
                    <h3 className={styles.title}>Ingresa la nueva contraseña</h3>
                </div>
                <label className={styles.labelContainer}>Nueva contraseña</label>
                <div className={styles.divContainer}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Ingresa la nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.inputContainer}
                    />
                </div>

                <label className={styles.labelContainer}>Repite contraseña</label>
                <div className={styles.divContainer}>
                    <input
                        type="password"
                        name="passwordRepaet"
                        placeholder="Repite contraseña"
                        value={passwordRepaet}
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                        className={styles.inputContainer}
                    />
                </div>
                <button type="submit" className={styles.button}>Enviar</button>
            </form>
        </>
    )
}