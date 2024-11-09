"use client";
import type { Autor } from "@/types";
import AutorCard from "./AutorCard";

type AutorList = {
  autoresInicio: Autor[];
};

export default function AutorList({ autoresInicio }: AutorList) {
  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 justify-items-center">
        {autoresInicio.map((autor: Autor) => (
          <AutorCard key={autor.id} autor={autor} />
        ))}
      </div>
    </div>
  );
}