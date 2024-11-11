import { Escultura } from '@/types';
import FiveStarRating from './FiveStarRating';
import { getVote } from './action';
import { useEffect, useState } from 'react';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  escultura: Escultura;
}
const images = {
  '1': '1.jpg',
  '2': '2.jpg',
  '3': '3.jpg',
  '4': '4.jpg',
  '5': '5.jpg',
  '6': '6.jpg',
  '7': '7.jpg',
  '8': '8.jpg',
  '9': '9.jpg',
} as const;

// Función para obtener una imagen aleatoria
const getRandomImage = () => {
  const keys = Object.keys(images); // Obtiene ['1', '2', '3', '4', '5', '6']
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return `/sculptures/${images[randomKey as keyof typeof images]}`;
};
export default function Modal({ isOpen, onClose, escultura }: ModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  {/* Aca obtengo el voto del usuario del cookie con este id de escultura */}
  const [voto, setVoto] = useState<{ rating: number } | null>(null);
  const imageArray = Object.values(images);

  // Funciones de navegación
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  useEffect(() => {
    const fetchVoto = async () => {
      if (isOpen) {  // Solo hacer la petición si el modal está abierto
        try {
          const votoDatos = await getVote(escultura.id);
          console.log('votoDatos',votoDatos);
          setVoto(votoDatos);
        } catch (error) {
          console.error('Error al obtener el voto:', error);
        }
      }
    };

    fetchVoto();
  }, [isOpen, escultura.id]);

  console.log('estado actual del voto',voto);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[1000px] h-[90vh] h-[600px] overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-black z-10"
        >
          <span className="text-2xl">✕</span>
        </button>
  
        <div className="flex flex-col md:flex-row h-full">
          {/* Contenedor de imagen con navegación */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-full flex-shrink-0 bg-gray-100 relative group">
            <img 
              src={getRandomImage()}
              alt={escultura.nombre_obra}
              className="w-full h-full object-contain"
            />
            
            {/* Flechas de navegación */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={previousImage}
                className="ml-2 p-1.5 rounded-full bg-white/50 hover:bg-white/95 shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-gray-800" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
              </button>
            </div>
            
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={nextImage}
                className="mr-2 p-1.5 rounded-full bg-white/80 hover:bg-white/95 shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-gray-800" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </button>
            </div>

            {/* Indicadores de posición */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
              {imageArray.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-1.5 rounded-full transition-all duration-300 ${
                    currentImageIndex === index 
                      ? 'bg-white w-3' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Contenedor de detalles */}
          <div className="w-full md:w-1/2 h-[40vh] md:h-full relative">
            <div className="p-4 md:p-6 overflow-y-auto h-[calc(100%-80px)] md:h-[calc(100%-100px)]">
              {/* Header y contenido - sin cambios */}
              {/* Header */}
              <h2 className="text-2xl font-bold mb-4">
                Información de la escultura
              </h2>

              {/* Título de la obra */}
              <h3 className="text-xl font-bold mb-4">
                {escultura.nombre_obra}
              </h3>

              {/* Descripción */}
              <div className="mb-6 text-justify">
                <p className="text-gray-600">
                  <span className="font-semibold">Descripción: </span>
                  {escultura.descripcion}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed nulla a lacus efficitur egestas. Maecenas non mattis tellus. Curabitur pretium semper libero, nec maximus tellus blandit nec. Aliquam erat volutpat. Maecenas rhoncus elit mauris, ut elementum metus faucibus vel. Aenean eu justo a nisi iaculis imperdiet. Nam nec varius nunc, vel varius enim. Aenean suscipit blandit mi, in rhoncus mi bibendum sed. Cras vestibulum mollis dictum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed nulla a lacus efficitur egestas. Maecenas non mattis tellus. Curabitur pretium semper libero, nec maximus tellus blandit nec. Aliquam erat volutpat. Maecenas rhoncus elit mauris, ut elementum metus faucibus vel. Aenean eu justo a nisi iaculis imperdiet. Nam nec varius nunc, vel varius enim. Aenean suscipit blandit mi, in rhoncus mi bibendum sed. Cras vestibulum mollis dictum.</p>
              </div>



              {/* Detalles técnicos */}
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Técnica: </span>
                  {escultura.tecnica}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Edición: </span>
                  {escultura.id_edicion}
                </p>
              </div>

              {/* Información del autor */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">
                  Información del Autor
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Nombre: </span>
                    {escultura.autor.nombre}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Apellido: </span>
                    {escultura.autor.apellido}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">País de Origen: </span>
                    {escultura.autor.pais_origen}
                  </p>
                </div>
              </div>
            </div>
  
            {/* Sistema de rating */}
            <div className="absolute bottom-0 right-0 w-full bg-white border-t border-gray-200 p-4 md:p-6">
              <div className="scale-75 md:scale-100 transform-origin-center">
                <FiveStarRating 
                  esculturaId={escultura.id}
                  votoUsuario={voto || {rating: 0}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}