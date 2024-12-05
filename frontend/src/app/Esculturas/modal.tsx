import { Escultura, Usuario } from "@/types";
import FiveStarRating from "./FiveStarRating";
import { getVote } from "./action";
import { useEffect, useState } from "react";
import QRCode from "./qrCode";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  usuario: Usuario;
  escultura: Escultura; // Cambiado de EsculturaPaginatedResponse a Escultura
}

export default function Modal({
  isModalOpen,
  escultura,
  usuario,
  setIsModalOpen,
}: ModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [voto, setVoto] = useState<{ rating: number } | null>(null);
  const imageArray = escultura.imagenes; // Ya no necesitamos Object.values ni items[0]

  // Funciones de navegación
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
  useEffect(() => {
    const fetchVoto = async () => {
      if (isModalOpen) {
        try {
          const votoDatos = await getVote(escultura.id);
          setVoto(votoDatos);
        } catch (error) {
          console.error("Error al obtener el voto:", error);
        }
      }
    };

    fetchVoto();
  }, [isModalOpen, escultura.id]);

  if (!isModalOpen) return null;

  // useEffect(() => {
  //   const fetchVoto = async () => {
  //     if (isOpen) {
  //       // Solo hacer la petición si el modal está abierto
  //       try {
  //         const votoDatos = await getVote(escultura.id);
  //         console.log("votoDatos", votoDatos);
  //         setVoto(votoDatos);
  //       } catch (error) {
  //         console.error("Error al obtener el voto:", error);
  //       }
  //     }
  //   };
  //
  //   fetchVoto();
  // }, [isOpen, escultura.id]);
  if (!isModalOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[1000px] h-fit min-h-[600px] overflow-hidden relative">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-700 hover:text-black z-10"
        >
          <span className="text-2xl">✕</span>
        </button>

        <div className="flex flex-col md:flex-row h-full flex-grow">
          {/* Contenedor de imagen con navegación */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-full flex-shrink-0 bg-gray-100 relative group">
            <img
              src={escultura.imagenes[currentImageIndex].url}
              alt={escultura.nombre_obra}
              className="w-full h-full object-contain py-auto my-auto"
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
                      ? "bg-white w-3"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Contenedor de detalles */}
          <div className="w-full md:w-1/2 md:h-full relative">
            <div className="p-4 md:p-6 overflow-y-auto h-[calc(100%-80px)] md:h-[calc(100%-80px)]">
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

              {/* Información del autor */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Puntaje de la Obra</h2>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Estrellas: </span>
                    {escultura.puntaje_total / escultura.cant_votos || 0}
                  </p>
                </div>
              </div>
            </div>
              {usuario?.rol === "visualizadorQR" && (
                <div className="mt-8">
                  <QRCode id={escultura.id} />
                </div>
              )}

            {/* Sistema de rating */}
            {/* <div className="absolute bottom-0 right-0 w-full bg-white border-t border-gray-200 p-4 md:p-6"> */}
            {/*   <div className="scale-75 md:scale-100 transform-origin-center"> */}
            {/*     <FiveStarRating */}
            {/*       esculturaId={escultura.id} */}
            {/*       votoUsuario={voto || { rating: 0 }} */}
            {/*     /> */}
            {/*   </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
