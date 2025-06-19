import Link from "next/link";
import { toast } from 'react-toastify';


const BASE_URL = 'https://node-flight956-backend.onrender.com/api';

export const getAll = async (endpoint) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`);
  const data = await res.json();

  if (!res.ok || data.status !== "success") {
    alert(data.error || `Error al obtener ${endpoint}`);
    return;
  }

  return data.payload;
};

export const createSinArchivo = async (endpoint, formData) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (data.status !== 'success') {
    alert(data.error || `Error al crear en ${endpoint}`);
    return;
  }

  return data;
};
export const create = async (endpoint, formData) => {
  const form = new FormData();

  // Aquí agregas todos los campos, incluso el archivo
  for (let key in formData) {
    form.append(key, formData[key]);
  }

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    body: form, // No es necesario especificar 'Content-Type', FormData lo maneja automáticamente
    credentials: 'include'
  });

  const data = await response.json();

  if (data.status !== 'success') {
    alert(data.error || `Error al crear en ${endpoint}`);
    return;
  }

  return data;
};

export const deleteOne = async (endpoint, id) => {
  const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  const data = await response.json();

  if (data.status !== 'success') {
    alert(data.error || `Error al eliminar en ${endpoint}`);
    return;
  }

  return data;
}


export const agregarAlCarrito = async (endpoint, carritoId, reservas) => {

  if (!reservas?.length) {
    alert('No hay productos en la reserva para agregar');
    return;
  }

  try {
    for (const item of reservas) {
      const response = await fetch(`${BASE_URL}/${endpoint}/${carritoId}/products/${item.productoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          referencia: item.referencia,
          quantity: item.quantity
        })
      });

      if (!response.ok) {
        const errorText = await response.text(); // Ver qué respondió
        console.error('Respuesta del servidor:', errorText);
        throw new Error(`Error al agregar producto: ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== 'success') {
        alert(`No se pudo agregar el producto: ${item.referenciaSchema}`);
        return;

      }
    }

    toast.success('Todos los productos fueron agregados al carrito');
   window.location.href = '/cart';

  } catch (error) {
    console.error(`Error al agregar productos al carrito: ${error.message}`);
    alert(`Error inesperado: ${error.message}`);
  }
};

 

export async function getCurrentUser() {
  try {
    const response = await fetch('https://node-flight956-backend.onrender.com/api/users/current', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      //console.error("No se pudo obtener el usuario");
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (err) {
    console.error("Error en getCurrentUser:", err);
    return null;
  }
}
