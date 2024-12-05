"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getEventoByEdicion, getEsculturasRandom, getRandomAutores } from "./actions";
import { Eventos, Autor } from "@/types";
import { ImageCarousel } from "@/components/carrusel/imageCarousel";
import AutorCard from "../autores/AutorCard";

export default function EdicionesPage() {
  const searchParams = useSearchParams();
  const edicion = searchParams.get("edicion");
  const [evento, setEvento] = useState<Eventos | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);

  const imagenes = [
    '/parque2DeFebrero/imagen1.jpg',
    '/parque2DeFebrero/imagen2.jpg',
    '/parque2DeFebrero/imagen3.jpg',
    '/parque2DeFebrero/imagen4.jpg',
    '/parque2DeFebrero/imagen5.jpg',    
  ];

  // Selecciona una imagen aleatoria
  const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (edicion) {
          const eventoData = await getEventoByEdicion(edicion);
          setEvento(eventoData);
        }
        const urls = await getEsculturasRandom();
        setImageUrls(urls);
        
        const autoresData = await getRandomAutores();
        setAutores(autoresData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [edicion]);


  return (
    <main className="min-h-screen">
      {/* Carrusel y titulo */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Imagen de fondo */}
        <div 
            className="absolute inset-0 z-0" 
            style={{
            backgroundImage: `url(${imagenAleatoria})`, // Cambia esta ruta a la de tu imagen
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.8,
            }}
        />
        {/* Filtro de color */}
        <div className="absolute inset-0 bg-black/50 z-0" />
        
        {/* Contenido */}
        <div className="relative z-10 container mx-auto px-4 text-white pt-8">
            <h1 className="text-6xl font-bold text-center underline">
                {evento ? evento.nombre : "Bienal de Escultura"}
            </h1>
            
            {/* Carrusel */}
            <div className="w-full">
            {imageUrls.length > 0 && <ImageCarousel images={imageUrls} />}
            </div>
        </div>
      </section>

      {/* Descripción y Autores */}
      <section className="container mx-auto">
        <div className="text-center py-8 bg-black">
            <h2 className="text-4xl font-bold text-white mb-4 underline ">
            {evento ? evento.tematica : "Cargando temática..."}
            </h2>
            <p className="text-gray-200 text-justify leading-relaxed max-w-4xl mx-auto">
            {evento ? evento.descripcion : "Cargando descripción..."}
            </p>
        </div>

        {/* Podio de Autores */}
        <div className="flex justify-center items-end gap-4 mt-8">
            {/* 2do Puesto */}
            <div className="mb-8">
            <div className="text-center mb-2">
                <span className="text-2xl font-bold text-red-500">🥈 Puesto</span>
            </div>
            <AutorCard autor={autores[1]} />
            </div>

            {/* 1er Puesto - Más alto */}
            <div className="mb-16">
            <div className="text-center mb-2">
                <span className="text-2xl font-bold text-red-500">🥇 Puesto</span>
            </div>
            <AutorCard autor={autores[0]} />
            </div>

            {/* 3er Puesto */}
            <div>
            <div className="text-center mb-2">
                <span className="text-2xl font-bold text-black">🥉 Puesto</span>
            </div>
            <AutorCard autor={autores[2]} />
            </div>
        </div>
        </section>

      {/* Mapa y Redes Sociales */}
      <section className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-black">
        <div className="h-[40vh] shadow-lg rounded-md overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1770.515953873163!2d-58.98229526130258!3d-27.437116313576542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450c5b04a7481d%3A0xf99641a09f8495d2!2sDomo%20Del%20Centenario!5e0!3m2!1ses-419!2sar!4v1733238710786!5m2!1ses-419!2sar"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
        <div className="p-4 text-white flex flex-col ">
            <h3 className="text-xl underline font-bold mb-4">Síguenos en nuestras redes sociales</h3>
            <ul className="space-y-2">
            <li>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Facebook
                </a>
            </li>
            <li>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Twitter
                </a>
            </li>
            <li>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Instagram
                </a>
            </li>
            <li>
                <a href="https://www.gmail.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Correo de contacto
                </a>
            </li>
            </ul>
        </div>
      </section>
    </main>
  );
}