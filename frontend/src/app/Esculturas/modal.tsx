import { Escultura } from '@/types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  escultura: Escultura;
}

export default function Modal({ isOpen, onClose, escultura }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <button 
            onClick={onClose}
            className="text-white hover:text-white-100 text-2xl absolute top-2 right-4"
        >
            ✕
        </button>
      <div className="bg-white rounded-lg max-w-5xl w-full m-4">
        
        <div className="flex gap-6"> 
          {/* Columna izquierda - Imagen */}
          <div>
            <img 
              src="/sculptures/1.jpg" 
              alt={escultura.nombre_obra}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Columna derecha - Detalles */}
          <div className="w-1/2 space-y-4">
            <div className="flex justify-between items-center mt-4 mb-4 border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold">Información de la escultura</h2>
            </div>
            <h3 className="text-xl font-bold"> {escultura.nombre_obra}</h3>
            <p className="text-gray-600 line-clamp-3 break-words">
                <span className="font-semibold">Descripción: </span>{escultura.descripcion}
            </p>
            
            <div className="space-y-2 mt-6 border-b border-gray-200 pb-4">
              <p className="text-gray-600">
                <span className="font-semibold">Técnica: </span> {escultura.tecnica}
              </p>
              <p className="text-gray-600 overflow-hidden">
                <span className="font-semibold">Edición: </span> {escultura.id_edicion} 
              </p>
            </div>
            <div className="flex justify-between items-center mt-4 mb-4">
              <h2 className="text-2xl font-bold">Información del Autor</h2>
            </div>
            <div className="space-y-2 mt-6 pb-4">
                <p className="text-gray-600">
                    <span className="font-semibold">ID de Autor: </span> {escultura.autor_id}
                </p>
                <p className="text-gray-600">
                    // Aca continua con la info del autor
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}