import { useRouter } from "next/navigation";
import styles from './styles.module.css'

export default function RegisterForm({ handleOnSubmit, handleOnChange, dataUser }) {
    const router = useRouter();

    const handleRedirect = () => {
        router.push("/login");
    };

    return (
        <div >
            <form onSubmit={handleOnSubmit} className={styles.formContainer}>
                <div className={styles.divContainer}>
                    <h3 className={styles.title}>Bienvenido crea una cuenta</h3>

                </div>
                <div className={styles.divContainer}>
                    <label htmlFor="first_name" className={styles.labelContainer}>Nombre</label>
                    <input
                        type="text"
                        name="first_name"
                        value={dataUser.first_name}
                        onChange={handleOnChange}
                        required
                        className={styles.inputContainer}
                    />
                </div>

                <div className={styles.divContainer}>
                    <label htmlFor="last_name" className={styles.labelContainer}>Apellido</label>
                    <input
                        type="text"
                        name="last_name"
                        value={dataUser.last_name}
                        onChange={handleOnChange}
                        required
                        className={styles.inputContainer}
                    />
                </div>

                <div className={styles.divContainer}>
                    <label htmlFor="age" className={styles.labelContainer}>Edad</label>
                    <input
                        type="number"
                        name="age"
                        value={dataUser.age}
                        onChange={handleOnChange}
                        required
                        className={styles.inputContainer}
                    />
                </div>

                <div className={styles.divContainer}>
                    <label htmlFor="email" className={styles.labelContainer} >Email</label>
                    <input
                        type="email"
                        name="email"
                        value={dataUser.email}
                        onChange={handleOnChange}
                        required
                        className={styles.inputContainer}
                    />
                </div>

                <div className={styles.divContainer}>
                    <label htmlFor="password" className={styles.labelContainer}>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={dataUser.password}
                        onChange={handleOnChange}
                        required
                        className={styles.inputContainer}
                    />
                </div>

                <button type="submit" className={styles.button}>
                    Enviar
                </button>

                <div className={styles.loginPrompt}>
                    <strong className={styles.loginSrong}>¿Ya tienes una cuenta?</strong>
                    <button
                        onClick={handleRedirect}
                        className={styles.loginButton}
                        type="button"
                    >
                        Iniciar Sesión
                    </button>
                </div>

            </form>
        </div>
    );
}
