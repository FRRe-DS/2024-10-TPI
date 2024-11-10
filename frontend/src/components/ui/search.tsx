'use client';
import { useState, FormEvent } from 'react';

interface SearchProps {
  onSearch: (term: string, type: 'obra' | 'autor') => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [inputValue, setInputValue] = useState('');
  const [searchType, setSearchType] = useState<'obra' | 'autor'>('obra');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(inputValue, searchType);
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-grow">
          <span className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder={`Buscar por ${searchType === 'obra' ? 'obra' : 'autor'}...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none"
          />
        </div>
        {/* Botón de búsqueda */}
        <button 
          type="submit" 
          className='px-4 py-2 rounded-lg border border-gray-300 bg-blue-500 text-white
            hover:bg-blue-600 
            active:transform active:scale-95 
            active:bg-blue-700 
            transition-all duration-150'
        >
          Buscar
        </button>
        {/* Select para tipo de búsqueda */}
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as 'obra' | 'autor')}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none bg-white hover:bg-gray-100"
        >
          <option value="obra">Obra</option>
          <option value="autor">Autor</option>
        </select>
      </form>
    </div>
  );
}