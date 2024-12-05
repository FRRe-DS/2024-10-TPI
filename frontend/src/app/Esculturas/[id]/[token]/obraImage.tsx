"use client";
import { useState } from "react";

import Image from "next/image";
const images = {
  "1": "1.jpg",
  "2": "2.jpg",
  "3": "3.jpg",
  "4": "4.jpg",
  "5": "5.jpg",
  "6": "6.jpg",
  "7": "7.jpg",
  "8": "8.jpg",
  "9": "9.jpg",
} as const;

const getRandomImage = () => {
  const keys = Object.keys(images);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return `/sculptures/${images[randomKey as keyof typeof images]}`;
};

export default function ImagenObra(nombreEscultura: string) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageArray = Object.values(images);

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
  return (
    <>
      <div className="w-full md:w-1/2 h-[50vh] md:h-full flex-shrink-0 bg-gray-100 relative group">
        <img
          src={getRandomImage()}
          alt={nombreEscultura}
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
    </>
  );
}
