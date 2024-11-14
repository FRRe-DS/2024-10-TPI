'use client';
import { useEffect, useState } from 'react';
import { postVote } from './action';

interface FiveStarRatingProps {
  esculturaId: number;
  votoUsuario: {
    rating: number;
  };
}

export default function FiveStarRating({ esculturaId, votoUsuario}: FiveStarRatingProps) {
  
  const [selectedRating, setSelectedRating] = useState(votoUsuario?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hasVoted, setHasVoted] = useState(!!votoUsuario?.rating);
  
  useEffect(() => {
    setSelectedRating(votoUsuario?.rating || 0);
    setHasVoted(!!votoUsuario?.rating);
  }, [votoUsuario]);

  const handleVote = async () => {
    if (selectedRating === 0) return;
    
    try {
      await postVote(esculturaId, selectedRating);
      setHasVoted(true);
    } catch (error) {
      console.error('Error al votar:', error);
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className="transition-colors focus:outline-none"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setSelectedRating(star)}
            disabled={hasVoted}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill={star <= (hoveredRating || selectedRating) ? '#FFD700' : '#E5E7EB'}
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </button>
        ))}
        {selectedRating > 0 && (
          <span className="text-sm ml-2 text-gray-600">
            {selectedRating} {selectedRating === 1 ? 'estrella' : 'estrellas'}
          </span>
        )}
      </div>

      {!hasVoted && (
        <button 
          onClick={handleVote}
          disabled={selectedRating === 0}
          className={`px-6 py-2 rounded-lg transition-colors ${
            selectedRating === 0 
              ? 'bg-gray-200 text-gray-500'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Votar
        </button>
      )}

      {hasVoted && (
        <span className="text-green-600 font-medium pl-3">
          ¡Gracias por tu voto!
        </span>
      )}
    </div>
  );
}