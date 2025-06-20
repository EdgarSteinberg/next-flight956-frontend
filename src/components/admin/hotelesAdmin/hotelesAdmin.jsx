'use client';
import { useContext, useEffect, useState } from "react";
import { getAll, create } from "@/services/api";
import HotelForm from "./hotelesAdminForm";
import HotelRead from "./hotelesAdminRead";
import { toast } from 'react-toastify';
import Loading from "./loading";
import { ReservaContext } from "@/context/reservaContenxt";
import { useRouter } from "next/navigation";

export default function Hoteles() {
    const {user} = useContext(ReservaContext);
    const router = useRouter();
    const [city, setCity] = useState([]);
    const [hoteles, setHoteles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({
        name: '',
        location: '',
        description: '',
        stars: '',
        nightPrice: '',
        price: '',
        breakfastIncluded: '',
        hotel: '',
        checkbox: '',
        numberOfNights: '',
        hotel:'',
    })


    const endpoint = [`provincias`, `hoteles`]
    useEffect(() => {
        endpoint.forEach((end) => {
            getAll(end)
                .then(data => {
                    if (end === 'provincias') setCity(data);
                    if (end === 'hoteles') setHoteles(data);
                })
                .catch(error => setError(error))
                .finally(() => setLoading(false))
        });
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
            alert('Debes estar logeado!')
            return router.push('/login')
        }

        if(user.role !== 'admin' && user.role !== 'premium'){
            return toast.error('No tienes los permisos suficientes')
        }

        try {
            await create('hoteles', form); // metodo post
            const nuevosHoteles = await getAll('hoteles'); // 🚀 Traemos todo actualizado
            toast.success('Hotel creado correctamente!');
            setHoteles(nuevosHoteles);
        } catch (error) {
            toast.error(`Error, ${error.message}`);
            return;
        }

        setForm({
            name: '',
            location: '',
            description: '',
            stars: '',
            nightPrice: '',
            price: '',
            breakfastIncluded: false,
            hotel: null,
            numberOfNights: '',
          });
    }

    const handleChange = (e) => {
        const { name, type, checked, files, value } = e.target;
      
        setForm(prev => {
          const updated = {
            ...prev,
            [name]: type === 'file'
              ? files[0]
              : type === 'checkbox'
              ? checked
              : value
          };
      
          // Cálculo del precio total si ya hay valores disponibles
          const nightPrice = Number(updated.nightPrice);
          const numberOfNights = Number(updated.numberOfNights);
      
          if (!isNaN(nightPrice) && !isNaN(numberOfNights)) {
            updated.price = nightPrice * numberOfNights;
          }
      
          return updated;
        });
      };
      


    if (loading) {
        return <Loading />
    }

    return (
        <>
            <HotelForm
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                city={city}
            />
            <HotelRead
                city={city}
                hoteles={hoteles}
                setHoteles={setHoteles}
            />

        </>
    )
}