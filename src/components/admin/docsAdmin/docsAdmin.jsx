'use client';

import { useContext, useState } from "react";
import { ReservaContext } from "@/context/reservaContenxt";
import { toast } from 'react-toastify';
import styles from './styles.module.css';

export default function DocsAdmin() {
  const { user } = useContext(ReservaContext);
  const [form, setForm] = useState({
    docs_uno: null,
    docs_dos: null
  });

  const handleOnChange = (e) => {
    const { name, files } = e.target;
    setForm({
      ...form,
      [name]: files[0]
    });
  };

  const handleDocuments = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert('¡Usuario no logeado! Por favor inicia sesión para cargar tus documentos.');
      return;
    }

    if (user.documents && user.documents.length === 2) {
      return alert(`¡Ya cargaste los documentos! Gracias por tu colaboración. 🙌`);
    }

    const userId = user._id;
    const formData = new FormData();
    formData.append("docs", form.docs_uno);
    formData.append("docs", form.docs_dos);

    try {
      const response = await fetch(`https://node-flight956-backend.onrender.com/api/users/documents/${userId}`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(`${data.message}`);
      } else {
        toast.success(`¡Se cargaron los documentos con éxito! 🎉`);
      }
    } catch (error) {
      toast.error(`Error al cargar la documentación: ${error.message}`);
    }
  };
 
  return (
    <div className={styles.container}>
      <form onSubmit={handleDocuments} encType="multipart/form-data" className={styles.form}>
        <h2 className={styles.title}>📑 Subir Documentación</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="docs_uno" className={styles.label}>
            📄 Documento de Identidad
          </label>
          <input
            type="file"
            name="docs_uno"
            accept=".pdf,.jpg,.jpeg,.png"
            className={styles.input}
            onChange={handleOnChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="docs_dos" className={styles.label}>
            📝 Comprobante de Domicilio
          </label>
          <input
            type="file"
            name="docs_dos"
            accept=".pdf,.jpg,.jpeg,.png"
            className={styles.input}
            onChange={handleOnChange}
          />
        </div>

        <button type="submit" className={styles.button}>
          🚀 Enviar Documentos
        </button>
      </form>
    </div>
  );
}
