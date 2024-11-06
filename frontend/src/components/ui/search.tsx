'use client';
import { useState, FormEvent } from 'react';

interface SearchProps {
  onSearch: (term: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    console.log(inputValue);
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar esculturas..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none"
          />
        </div>
      </form>
    </div>
  );
}