'use client';
import type { Escultura } from '@/types';
import { useState } from 'react';
import Modal from './modal'; 

type UserProps = {
  escultura: Escultura;
};

const images = {
  '1': '1.jpg',
  '2': '2.jpg',
  '3': '3.jpg',
  '4': '4.jpg',
  '5': '5.jpg',
  '6': '6.jpg',
  '7': '7.jpg',
  '8': '8.jpg',
  '9': '9.jpg',
} as const;

// Función para obtener una imagen aleatoria
const getRandomImage = () => {
  const keys = Object.keys(images); // Obtiene ['1', '2', '3', '4', '5', '6']
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return `/sculptures/${images[randomKey as keyof typeof images]}`;
};

export default function SculptureCard({ escultura }: UserProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageArray = Object.values(images);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se abra el modal
    setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  return (
    <div>
      <div className="bg-white border rounded-lg w-full max-w-[450px] h-[600px] gap-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      > 
        <div className="grid items-center p-3">
          <div className="font-semibold text-sm ml-2">
            {escultura.autor.nombre} {escultura.autor.apellido}
          </div>
        </div>

        <div className="w-full h-[420px] relative group">
          <img 
            src={getRandomImage()}
            alt={escultura.nombre_obra}
            className="w-full h-full object-contain"
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

          {/* Indicadores de posición más sutiles */}
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
                    ? 'bg-white w-3' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-3" onClick={(e) => e.stopPropagation()}>
          
          <h3 className="font-semibold text-sm truncate">{escultura.nombre_obra}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2 break-words">{escultura.descripcion}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit diam id ex malesuada, vitae porttitor felis rhoncus. Cras aliquam ipsum a libero laoreet, ut bibendum libero eleifend. Etiam elementum auctor enim ac faucibus. Sed ac velit bibendum, convallis nisi nec, lobortis massa. Etiam tincidunt a arcu in malesuada. Ut dapibus elit eget velit aliquet dignissim non non justo. Aenean bibendum eros in lectus condimentum aliquet. Pellentesque porttitor nunc ac dui interdum malesuada. Nam ac diam ultrices lacus imperdiet aliquet ut eget risus. Nullam tempor tortor in erat posuere, dignissim vestibulum diam pretium. Vivamus malesuada in nisi eget scelerisque. Vivamus dictum velit eget purus pellentesque, vel laoreet urna ullamcorper. Aliquam arcu sapien, mattis ac convallis eget, euismod id orci. Maecenas tincidunt, massa at pulvinar fringilla, dui diam varius tortor, semper auctor odio odio sit amet orci. Quisque congue faucibus elit ut scelerisque.


          </p>
          <p className="text-sm text-gray-600 mt-1">Técnica: {escultura.tecnica}</p>
          <p className="text-sm text-gray-600 mt-1">Edición: {escultura.id_edicion}</p>
        </div>
      </div>
      {
        isModalOpen && ( // Aca renderiza el modal si está abierto
          <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            escultura={escultura}
          />
        )
      }
    </div>
  );
}