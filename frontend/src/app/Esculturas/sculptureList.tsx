"use client";
import { useState, useEffect } from "react";
import type { Escultura } from "@/types";
import SculptureCard from "./sculptureCard";

type SculptureList = {
  esculturasInicio: Escultura[];
};

export default function SculptureList({ esculturasInicio }: SculptureList) {
  const [esculturasMostradas, setEsculturasMostradas] = useState<Escultura[]>([]);
  const [pagina, setPagina] = useState(1);
  const elementosPorPagina = 6;

  useEffect(() => {
    // Calculamos el índice inicial y final para la página actual
    const indexInicial = 0;
    const indexFinal = pagina * elementosPorPagina;
    setEsculturasMostradas(esculturasInicio.slice(indexInicial, indexFinal));
  }, [pagina, esculturasInicio]);

  const cargarMas = () => {
    setPagina(prevPagina => prevPagina + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {esculturasMostradas.map((escultura: Escultura) => (
          <div
            key={escultura.id}
            className="w-full max-w-[450px] justify-self-center"
          >
            <SculptureCard escultura={escultura} />
          </div>
        ))}
      </div>

      {/* Botón "Cargar más" */}
      {esculturasMostradas.length < esculturasInicio.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={cargarMas}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Cargar más obras
          </button>
        </div>
      )}
    </div>
  );
}