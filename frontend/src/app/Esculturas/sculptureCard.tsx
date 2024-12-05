"use client";
import type { Escultura, Usuario } from "@/types";
import { useState } from "react";
import Modal from "./modal";

type UserProps = {
  escultura: Escultura;
  usuario: Usuario;
};

export default function SculptureCard({ escultura, usuario }: UserProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageArray = escultura?.imagenes ?? [];

  if (!escultura?.imagenes?.length) {
    return (
      <div className="bg-white border rounded-lg w-full max-w-[450px] h-[600px] flex items-center justify-center">
        <p>No hay imágenes disponibles</p>
      </div>
    );
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + imageArray.length) % imageArray.length,
    );
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator
      .share({
        title: escultura.nombre_obra,
        text: `Obra "${escultura.nombre_obra}" por ${escultura.autor.nombre} ${escultura.autor.apellido}`,
        url: window.location.href,
      })
      .catch((error) => console.log("Error al compartir:", error));
  };

  return (
    <div>
      <div
        className="bg-white border rounded-lg w-full max-w-[450px] h-[620px] gap-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center justify-between p-3">
          <div className="font-semibold text-sm ml-2">
            {escultura.autor.nombre} {escultura.autor.apellido}
          </div>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-full mr-2 border border-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 15v1a3 3 0 003 3h10a3 3 0 003-3v-1m-3-4l-5-5m0 0l-5 5m5-5v10"
              />
            </svg>
          </button>
        </div>

        <div className="w-full h-[420px] relative group">
          <img
            src={imageArray[currentImageIndex].url}
            alt={escultura.nombre_obra}
            className="w-full h-full object-cover"
          />

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
                    ? "bg-white w-3"
                    : "bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-sm truncate">
            {escultura.nombre_obra}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2 break-words">
            {escultura.descripcion}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Técnica: {escultura.tecnica}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Edición: {escultura.id_edicion}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          escultura={escultura}
          usuario={usuario}
        />
      )}
    </div>
  );
}

