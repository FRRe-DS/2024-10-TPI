"use client";
import type { Autor } from "@/types";

interface AutorProps {
  autor: Autor;
}

const AutorCard = ({ autor }: AutorProps) => {
  return (
    <div className="bg-white border rounded-lg w-full max-w-sm overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagen - Arriba */}
      <div className="w-full h-[400px]">
        <img
          src={autor.url}
          alt={`${autor.nombre} ${autor.apellido}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido - Abajo */}
      <div className="p-4 sm:p-6">
        {/* Header con nombre */}
        <div className="mb-4">
          <h2 className="text-xl font-bold">
            {autor.nombre} {autor.apellido}
          </h2>
          <p className="text-gray-600 font-medium">{autor.pais_origen}</p>
        </div>

        {/* Información principal */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 break-words line-clamp-5">
            <span className="font-semibold">Biografía: </span>
            {autor.biografia}
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Fecha de Nacimiento: </span>
              {(autor.fec_nac)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutorCard;

