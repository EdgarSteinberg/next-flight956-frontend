'use client';

import { getAll } from "@/services/api";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { Card, Row, Col } from 'antd';
import styles from './styles.module.css';
import { toast } from 'react-toastify';

export default function UserAdmin() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAll('users')
            .then(data => {
                console.log(data);
                setUsers(data);
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, []);

    const handleDelete = async (userId) => {

        try {
            const response = await fetch(`https://node-flight956-backend.onrender.com/api/users/${userId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await response.json()

            if (!response.ok) {
                if (response.status === 401) {
                    return toast.error('No estás autenticado. Por favor, inicia sesión.');
                }
                if (response.status === 403) {
                    return toast.error('No tenés permisos suficientes para realizar esta acción.');
                }
                return alert(`Error: ${data.message || 'Ocurrió un error inesperado.'}`);
            }


            toast.success(`Usuario eliminado correctamente.`);
        }
        catch (error) {
            toast.error(`Error al eliminar los usuarios ${error.message}`)
        }

    }

    const handlePremium = async (userId) => {

        try {
            const response = await fetch(`https://node-flight956-backend.onrender.com/api/users/premium/${userId}`, {
                method: 'PUT',
                credentials: 'include'
            })

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    return toast.error('No estás autenticado. Por favor, inicia sesión.');
                }
                if (response.status === 403) {
                    return toast.error('No tenés permisos suficientes para realizar esta acción.');
                }
                return toast.error(`Error: ${data.message || 'Ocurrió un error inesperado.'}`);
            }


            toast.success(`Cambio de role exitoso: ${data.payload?.role || ''}`);


        } catch (error) {
            toast.error(`Error al actualizar el role del usuario ${error.message}`)
        }
    }


    const handleUsersDelete = async () => {
        try {
            const response = await fetch(`https://node-flight956-backend.onrender.com/api/users/`,
                {
                    method: 'DELETE',
                    credentials: 'include'
                }
            )
            const data = await response.json();

            if (!response.ok) {
                return toast.error(`${data.message || ' error al eliminar los usuarios.'}`)
            }

            toast.error(`Usuarios eliminados ${data.status}`)

        } catch (error) {
            toast.error(`Error al eliminar los usuarios ${error.message}`);
        }
    }

    if (loading) {
        return <Loading />
    }
    return (
        <div className={styles.poppins}>
            <button onClick={handleUsersDelete} className={styles.buttonDelete} style={{ padding: '12px' }} >Eliminar usuarios inactivos</button>
            {users.length > 0 && (

                <Row>
                    {users.map((u) => (
                        <Col key={u._id || index} xs={24} sm={12} md={8} lg={6}>
                            <Card style={{ minheight: '500px', padding: '12px' }} className={styles.poppins}>
                                <div style={{ fontSize: '16px', fontWeight: 'bolder' }}>
                                    <p>Nombre: {u.first_name}</p>
                                    <p>Apellido: {u.last_name}</p>
                                    <p>Edad: {u.age}</p>
                                    <p>Email: {u.email}</p>
                                    <p>Role: {u.role}</p>
                                    <div>
                                        <span style={{ fontWeight: 'bold' }}>Documentación:</span>
                                        {u.documents.length > 0 ? (
                                            u.documents.map((d) => (
                                                <div key={d._id}>
                                                    <p>{d.name}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p style={{ background: 'red', color: 'white', borderRadius: '12px', textAlign: 'center' }}>
                                                No posee documentos
                                            </p>
                                        )}
                                    </div>

                            
                                <p>Última conexión: {new Date(u.last_connection).toLocaleString()}</p>
                                <button className={styles.buttonPremium} style={{ marginRight: '12px' }} onClick={() => handlePremium(u._id)}>Premium</button>
                                <button className={styles.buttonDelete} onClick={() => handleDelete(u._id)}>Eliminar</button>
                            </div>
                        </Card>
                        </Col>
            ))
                    }
        </Row>

    )
}
        </div >
    )
}


