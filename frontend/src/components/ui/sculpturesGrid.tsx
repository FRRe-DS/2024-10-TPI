'use client';
import { useEffect, useState } from 'react';
import VoteButtons from '@/components/ui/VoteButtons';

interface Escultura {
  id: number;
  nombre: string;
  imagen: string;
  descripcion: string;
  autor: string; 
  autorImagen: string;
  votosPositivos: number;
}

export default function EsculturasGrid() {
  const [escultura, setEscultura] = useState<Escultura | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEscultura = async () => {
      try {
        setLoading(true);
        // Probamos con el ID 1
        const response = await fetch('http://localhost:8000/obras/1');
        
        if (!response.ok) {
          throw new Error('Error al cargar la escultura');
        }
        
        const data = await response.json();
        console.log('Datos recibidos:', data); // Para ver qué devuelve
        setEscultura(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEscultura();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!escultura) {
    return <div>No se encontró la escultura</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border rounded-lg">
          <div className="flex items-center p-3">
            <img 
              src={escultura.autorImagen}
              alt={escultura.autor}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="font-semibold text-sm ml-2">{escultura.autor}</div>
          </div>
          
          <img 
            src={escultura.imagen} 
            alt={escultura.nombre}
            className="w-full aspect-[16/9] object-cover"
          />
          
          <div className="p-3">
            <VoteButtons 
                esculturaId={escultura.id}
                votosIniciales={{
                    positivos: escultura.votosPositivos,
                }}
            />
            <h3 className="font-semibold text-sm truncate">{escultura.nombre}</h3>
            <p className="text-sm text-gray-600 mt-1">{escultura.descripcion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}