"use client";
import { Escultura } from "@/types";
import FiveStarRating from "../../FiveStarRating";

interface ObraCardProps {
  escultura: Escultura;
  vote: { rating: number } | null;
}

export default function ObraCard({ escultura, vote }: ObraCardProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-[1000px] h-[90vh] h-[600px] overflow-hidden relative">
          <div className="flex flex-col md:flex-row h-full">
            {/* <ImagenObra nombreEscultura={escultura.nombre_obra} /> */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-full relative">
              <div className="p-4 md:p-6 overflow-y-auto h-[calc(100%-80px)] md:h-[calc(100%-100px)]">
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
              <div className="absolute bottom-0 right-0 w-full bg-white border-t border-gray-200 p-4 md:p-6">
                <div className="scale-75 md:scale-100 transform-origin-center">
                  <FiveStarRating
                    esculturaId={escultura.id}
                    votoUsuario={vote || { rating: 0 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
