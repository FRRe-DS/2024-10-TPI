"use client";
import type { Escultura } from "@/types";
import SculptureCard from "./sculptureCard";

type SculptureList = {
  esculturasInicio: Escultura[];
};

export default function SculptureList({ esculturasInicio }: SculptureList) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {esculturasInicio.map((escultura: Escultura) => (
          <div
            key={escultura.id}
            className="w-full max-w-[450px] justify-self-center"
          >
            <SculptureCard key={escultura.id} escultura={escultura} />
          </div>
        ))}
      </div>
    </div>
  );
}

