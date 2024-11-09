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
        className="text-white hover:text-gray-200 text-2xl absolute top-4 right-6 transition-colors"
      >
        ✕
      </button>
      
      <div className="bg-white rounded-lg w-[1000px] h-[600px] m-4 overflow-hidden">
        <div className="flex h-full"> 
          {/* Columna izquierda - Imagen */}
          <div className="w-1/2 h-full flex-shrink-0">
            <img 
              src="/sculptures/1.jpg" 
              alt={escultura.nombre_obra}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Columna derecha - Detalles con scroll */}
          <div className="w-1/2 h-full overflow-y-auto p-6"> 
            <div className="space-y-6">
              {/* Información de la escultura */}
              <div>
                <h2 className="text-2xl font-bold border-b border-gray-200 pb-4">
                  Información de la escultura
                </h2>
                <div className="space-y-4 mt-4">
                  <h3 className="text-xl font-bold">{escultura.nombre_obra}</h3>
                  <p className="text-gray-600 break-words">
                    <span className="font-semibold">Descripción: </span>
                    {escultura.descripcion}
                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.

                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.


                  </p>
                  <div className="space-y-2 border-b border-gray-200 pb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">Técnica: </span> 
                      {escultura.tecnica}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Edición: </span> 
                      {escultura.id_edicion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Información del autor */}
              <div>
                <h2 className="text-2xl font-bold border-b border-gray-200 pb-4">
                  Información del Autor
                </h2>
                <div className="space-y-2 mt-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}