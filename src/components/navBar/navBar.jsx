'use client';
import Link from 'next/link';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { ReservaContext } from '@/context/reservaContenxt';
import { useContext } from 'react';
import { FaShoppingCart, FaPlane, FaBed, FaSuitcaseRolling, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Navbar() {
    const router = useRouter();
    const { reservas } = useContext(ReservaContext);


    const handleChange = (event) => {
        const selectedValue = event.target.value;

        if (selectedValue === "docs") {
            window.open("https://node-flight956-backend.onrender.com/api/docs/#/", "_blank");
        } else if (selectedValue) {
            // Redireccionar a la página seleccionada
           router.push(selectedValue)
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('https://node-flight956-backend.onrender.com/api/users/logout', {
                method: 'POST',
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok && data.message === 'Logout exitoso') {
                toast.success('Sesión cerrada exitosamente');
                window.location.href = '/login';
            } else {
                toast.error(`Error al cerrar sesión: ${data.message || 'desconocido'}`);
            }
        } catch (error) {
            toast.error(`Error al cerrar la sesión: ${error.message}`);
        }
    };

    return (
        <nav className={styles.navStyle}>


            {/* Enlaces regulares */}
            <Link href="/login" className={styles.linkStyle}>
                <FaUser style={{ marginRight: '8px' }} /> Iniciar Sesión
            </Link>
            {/*  <Link href="/register" className={styles.linkStyle}>Registro</Link> */}

            <Link href="/vuelos" className={styles.linkStyle}>
                <FaPlane style={{ marginRight: '8px' }} /> Vuelos
            </Link>

            <Link href="/hoteles" className={styles.linkStyle}>
                <FaBed style={{ marginRight: '8px' }} /> Hoteles
            </Link>

            <Link href="/" className={styles.linkStyle}>
                <FaSuitcaseRolling style={{ marginRight: '8px' }} /> Paquetes
            </Link>


            {reservas.length > 0 && (
                <Link href="/cart" className={`${styles.linkStyle} text-3xl`}>
                    <FaShoppingCart size={24} style={{ marginTop: '5px' }} />

                </Link>
            )}
            <div className={styles.selectContainer}>
                <select onChange={handleChange} defaultValue="" className={styles.selectStyle}>

                    <option value="" disabled>Ir a sección admin...</option>
                    <option value="/admin/vuelos">VuelosAdmin</option>
                    <option value="/admin/city">CiudadesAdmin</option>
                    <option value="/admin/hoteles">HotelesAdmin</option>
                    <option value="/admin/paquetes">PaquetesAdmin</option>
                    <option value="/admin/users">UsersAdmin</option>
                    <option value="/admin/docs"  >Premium</option>
                    <option value="docs">Swagger</option>

                </select>
            </div>

            <a onClick={handleLogout} className={styles.linkStyle} style={{ cursor: 'pointer' }}>
                Cerrar Sesión
            </a>
        </nav>
    );
}
