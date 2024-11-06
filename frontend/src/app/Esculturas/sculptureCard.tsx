'use client';
import VoteButtons from './VoteButtons';
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
} as const;

// Función para obtener una imagen aleatoria
const getRandomImage = () => {
  const keys = Object.keys(images); // Obtiene ['1', '2', '3', '4', '5', '6']
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return `/sculptures/${images[randomKey as keyof typeof images]}`;
};

export default function SculptureCard({ escultura }: UserProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="bg-white border rounded-lg w-[450px] gap-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={() => setIsModalOpen(true)}
      > 
        <div className="grid items-center p-3">
          <div className="font-semibold text-sm ml-2">{escultura.autor_id}</div>
        </div>

        <div className="w-full h-[400px]">
          <img 
            src={getRandomImage()} 
            alt={escultura.nombre_obra}
            className="w-full h-full object-cover "  // object-cover para mantener la proporción
          />
        </div>

        <div className="p-3" onClick={(e) => e.stopPropagation()}>
          <VoteButtons 
            esculturaId={escultura.id}
            votosIniciales={{
              positivos: 0,
            }}
          />
          <h3 className="font-semibold text-sm truncate">{escultura.nombre_obra}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3 break-words">{escultura.descripcion}</p>
          <p className="text-sm text-gray-600 mt-1">Técnica: {escultura.tecnica}</p>
          <p className="text-sm text-gray-600 mt-1">Edición: {escultura.id_edicion}</p>
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        escultura={escultura}
      />
    </div>
  );
}