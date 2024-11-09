import { Escultura } from '@/types';
import FiveStarRating from './FiveStarRating';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  escultura: Escultura;
}

export default function Modal({ isOpen, onClose, escultura }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[1000px] h-[600px] m-4 overflow-hidden">
        <div className="flex h-full">
          {/* Columna izquierda - Imagen */}
          <div className="w-1/2 h-full flex-shrink-0 bg-gray-100">
            <img 
              src="/sculptures/1.jpg"
              alt={escultura.nombre_obra}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Columna derecha - Detalles */}
          <div className="w-1/2 h-full overflow-y-auto">
            {/* Botón de cerrar */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-700 hover:text-black"
            >
              <span className="text-2xl">✕</span>
            </button>

            <div className="p-6">
              {/* Header */}
              <h2 className="text-2xl font-bold mb-4">
                Información de la escultura
              </h2>

              {/* Título de la obra */}
              <h3 className="text-xl font-bold mb-4">
                {escultura.nombre_obra}
              </h3>

              {/* Descripción */}
              <div className="mb-6">
                <p className="text-gray-600">
                  <span className="font-semibold">Descripción: </span>
                  {escultura.descripcion}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed nulla a lacus efficitur egestas. Maecenas non mattis tellus. Curabitur pretium semper libero, nec maximus tellus blandit nec. Aliquam erat volutpat. Maecenas rhoncus elit mauris, ut elementum metus faucibus vel. Aenean eu justo a nisi iaculis imperdiet. Nam nec varius nunc, vel varius enim. Aenean suscipit blandit mi, in rhoncus mi bibendum sed. Cras vestibulum mollis dictum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed nulla a lacus efficitur egestas. Maecenas non mattis tellus. Curabitur pretium semper libero, nec maximus tellus blandit nec. Aliquam erat volutpat. Maecenas rhoncus elit mauris, ut elementum metus faucibus vel. Aenean eu justo a nisi iaculis imperdiet. Nam nec varius nunc, vel varius enim. Aenean suscipit blandit mi, in rhoncus mi bibendum sed. Cras vestibulum mollis dictum.


                </p>
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
              <div className="p-6 border-t border-gray-200">
                <FiveStarRating 
                  esculturaId={escultura.id}
                  votosIniciales={{
                    rating: 0
                  }}
                />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}