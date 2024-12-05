"use client";
import type { Escultura, Usuario } from "@/types";
import SculptureCard from "./sculptureCard";

type SculptureList = {
  esculturasInicio: Escultura[];
  usuario: Usuario;
};

export default function SculptureList({
  esculturasInicio,
  usuario,
}: SculptureList) {
  // Validación inicial
  if (!esculturasInicio) {
    return <div>Cargando esculturas...</div>;
  }

  // Validación de items
  if (!esculturasInicio || !Array.isArray(esculturasInicio)) {
    return <div>No hay esculturas disponibles</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {esculturasInicio.map((escultura: Escultura) => (
          <div
            key={escultura.id}
            className="w-full max-w-[450px] justify-self-center"
          >
            <SculptureCard escultura={escultura} usuario={usuario} />
          </div>
        ))}
      </div>
    </div>
  );
}

