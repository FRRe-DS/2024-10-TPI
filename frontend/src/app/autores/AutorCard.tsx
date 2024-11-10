"use client";
import type { Autor } from "@/types";

interface AutorProps {
  autor: Autor;
}

const AutorCard = ({ autor }: AutorProps) => {
  // Función para formatear la fecha de manera consistente
  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  return (
    <div className="bg-white border rounded-lg w-[700px] h-[250px] overflow-hidden flex hover:shadow-lg transition-shadow">
      {/* Contenido - Lado izquierdo */}
      <div className="flex-1 p-6">
        {/* Header con nombre */}
        <div className="mb-4">
          <h2 className="text-xl font-bold">
            {autor.nombre} {autor.apellido}
          </h2>
          <p className="text-gray-600 font-medium">
            {autor.pais_origen}
          </p>
        </div>

        {/* Información principal */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 line-clamp-3 break-words">
            <span className="font-semibold">Biografía: </span>
            {autor.biografia}
          </p>
          <div className="gap-4 mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Fecha de Nacimiento: </span>
              {new Date(autor.fec_nac).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">DNI: </span>
              {autor.dni}
            </p>
          </div>
        </div>
      </div>

      {/* Imagen - Lado derecho */}
      <div className="w-[250px] flex-shrink-0">
        <img 
          src={`./gatito.jpg`}
          alt={`${autor.nombre} ${autor.apellido}`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AutorCard;