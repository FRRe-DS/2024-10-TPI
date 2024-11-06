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

  const filteredEsculturas = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return esculturasInicio.filter((escultura) => 
      escultura.nombre_obra.toLowerCase().includes(term) ||
      escultura.autor_id.toLowerCase().includes(term)
    );
  }, [esculturasInicio, searchTerm]);

  return (
    <div className='container mx-auto px-4'>
      <Search onSearch={setSearchTerm} />
      <SculptureList esculturasInicio={filteredEsculturas} />
    </div>
  );
}