'use client';
import { useState, useMemo } from 'react';
import type { Escultura } from '@/types';
import SculptureList from './sculptureList';
import Search from '@/components/ui/search';

interface ClientPageProps {
  esculturasInicio: Escultura[];
}

export default function ClientPage({ esculturasInicio }: ClientPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'obra' | 'autor'>('obra');

  const handleSearch = (term: string, type: 'obra' | 'autor') => {
    setSearchTerm(term);
    setSearchType(type);
  };

  const filteredEsculturas = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) return esculturasInicio;
    
    return esculturasInicio.filter((escultura) => {
      if (searchType === 'obra') {
        return escultura.nombre_obra.toLowerCase().includes(term);
      } else {
        // Combinar nombre y apellido del autor para la búsqueda
        const nombreCompleto = `${escultura.autor.nombre} ${escultura.autor.apellido}`.toLowerCase();
        return nombreCompleto.includes(term);
      }
    });
  }, [esculturasInicio, searchTerm, searchType]);

  return (
    <div className='container mx-auto px-4'>
      <Search onSearch={handleSearch} />
      <SculptureList esculturasInicio={filteredEsculturas} />
    </div>
  );
}