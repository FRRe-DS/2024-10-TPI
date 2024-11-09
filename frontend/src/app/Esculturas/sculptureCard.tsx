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
      <div className="bg-white border rounded-lg w-[450px] h-[600px] gap-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={() => setIsModalOpen(true)}
      > 
        <div className="grid items-center p-3">
          <div className="font-semibold text-sm ml-2">{escultura.autor.nombre} {escultura.autor.apellido}</div>
        </div>

        <div className="w-full h-[420px]">
          <img 
            src={getRandomImage()} 
            alt={escultura.nombre_obra}
            className="w-full h-full object-cover "  // object-cover para mantener la proporción
          />
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
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        escultura={escultura}
      />
    </div>
  );
}