'use client';
import { useState } from 'react';

interface VoteButtonsProps {
  esculturaId: number;
  votosIniciales: {
    positivos: number;
    negativos: number;
  };
}

export default function VoteButtons({ esculturaId, votosIniciales }: VoteButtonsProps) {
  const [votos, setVotos] = useState(votosIniciales);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleVote = async (tipo: 'up' | 'down') => {
    try {
      // Si ya votó lo mismo, remover voto
      if (userVote === tipo) {
        // Llamada a la API para remover voto
        setUserVote(null);
        setVotos(prev => ({
          ...prev,
          [tipo === 'up' ? 'positivos' : 'negativos']: prev[tipo === 'up' ? 'positivos' : 'negativos'] - 1
        }));
        return;
      }

      // Si ya votó pero diferente, cambiar voto
      if (userVote) {
        // Llamada a la API para cambiar voto
        setUserVote(tipo);
        setVotos(prev => ({
          positivos: tipo === 'up' ? prev.positivos + 1 : prev.positivos - 1,
          negativos: tipo === 'down' ? prev.negativos + 1 : prev.negativos - 1
        }));
        return;
      }

      // Nuevo voto
      setUserVote(tipo);
      setVotos(prev => ({
        ...prev,
        [tipo === 'up' ? 'positivos' : 'negativos']: prev[tipo === 'up' ? 'positivos' : 'negativos'] + 1
      }));
    } catch (error) {
      console.error('Error al votar:', error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Like */}
      <div className="flex items-center">
        <button 
          className={`transition-colors ${
            userVote === 'up' 
              ? 'text-[#3b5998]'  // Azul cuando está seleccionado
              : 'text-gray-300 hover:text-[#3b5998]'  // Gris claro por defecto
          }`}
          onClick={() => handleVote('up')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z"/>
          </svg>
        </button>
        <span className="text-sm ml-2">{votos.positivos}</span>
      </div>

      {/* Dislike */}
      <div className="flex items-center">
        <button 
          className={`transition-colors ${
            userVote === 'down' 
              ? 'text-[#3b5998]'  // Azul cuando está seleccionado
              : 'text-gray-300 hover:text-[#3b5998]'  // Gris claro por defecto
          }`}
          onClick={() => handleVote('down')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'rotate(180deg)' }}>
            <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z"/>
          </svg>
        </button>
        <span className="text-sm ml-2">{votos.negativos}</span>
      </div>
    </div>
  );
}