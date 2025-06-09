import Link from "next/link";


const BASE_URL = 'http://localhost:8080/api';

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

    alert('Todos los productos fueron agregados al carrito');
   window.location.href = '/cart';

  } catch (error) {
    console.error(`Error al agregar productos al carrito: ${error.message}`);
    alert(`Error inesperado: ${error.message}`);
  }
};


//Peticion usuario por ID
// export const getCurrentUser = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/users/current`, {
//       withCredentials: true,
//     });
//      response.data.user;
//   } catch (error) {
//     // Si da 401 (Unauthorized), simplemente devolvés null o un objeto anónimo
//     if (error.response && error.response.status === 401) {
//       console.log('Usuario no logueado, se mantiene como anónimo');
//       return null;
//     }
//     // Si es otro error, lanzalo
//     throw error;
//   }
// };

export async function getCurrentUser() {
  try {
    const response = await fetch('http://localhost:8080/api/users/current', {
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
