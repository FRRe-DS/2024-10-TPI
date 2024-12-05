"use client";
import type { Autor, AutorPaginatedResponse } from "@/types";
import AutorCard from "./AutorCard";

type AutorListProps = {
  autoresInicio: Autor[];
};

export default function AutorList({ autoresInicio }: AutorListProps) {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {autoresInicio.map((autor: Autor) => (
          <AutorCard key={autor.id} autor={autor} />
        ))}
      </div>
    </div>
  );
}