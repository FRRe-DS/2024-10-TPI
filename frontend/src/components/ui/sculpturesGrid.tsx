'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import VoteButtons from '@/components/ui/VoteButtons';
// definimos los tipos de datos para las esculturas
interface Escultura {
  id: number;
  nombre: string;
  imagen: string;
  descripcion: string;
  autor: string; 
  autorImagen: string;  // URL de la foto de perfil del autor
  votosPositivos: number;
  votosNegativos: number;
}

// creamos un array de esculturas de prueba
const esculturasDePrueba: Escultura[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    nombre: `Escultura ${i + 1}`,
    imagen: "https://via.placeholder.com/600x600",
    descripcion: `Descripción de la escultura ${i + 1}`,
    autor: `Artista ${i + 1}`,
    fecha: "2 horas",
    autorImagen: "https://via.placeholder.com/40x40",
    votosPositivos: 0,
    votosNegativos: 0
  }));

export default function EsculturasGrid() {
  const [esculturas, setEsculturas] = useState<Escultura[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const loadMoreEsculturas = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      // Simulamos una carga con delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Agregamos 6 esculturas por vez
      const start = (page - 1) * 6;
      const end = start + 6;
      const nuevasEsculturas = esculturasDePrueba.slice(start, end);
      
      if (nuevasEsculturas.length > 0) {
        setEsculturas(prev => [...prev, ...nuevasEsculturas]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error cargando esculturas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    loadMoreEsculturas();
  }, []); // Solo se ejecuta al montar el componente
  // Carga más cuando llegas al final
  useEffect(() => {
    if (inView) {
      loadMoreEsculturas();
    }
  }, [inView]);


  return (
    <div className="max-w-md mx-auto">
      {esculturas.map((escultura) => (
        <div key={escultura.id} className="bg-white border rounded-lg mb-6">
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
            className="w-full aspect-square object-cover"
          />
          
          <div className="p-3">
            <VoteButtons 
                esculturaId={escultura.id}
                votosIniciales={{
                    positivos: escultura.votosPositivos,
                    negativos: escultura.votosNegativos
                }}
            />
            <h3 className="font-semibold text-sm">{escultura.nombre}</h3>
            <p className="text-gray-600 mt-1 text-sm">{escultura.descripcion}</p>
          </div>
        </div>
      ))}
      
      {loading && (
        <div className="text-center p-3 text-sm">Cargando más esculturas...</div>
      )}
      <div ref={ref} className="h-8" />
    </div>
  );
}