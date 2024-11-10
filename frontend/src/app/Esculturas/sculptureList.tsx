"use client";
import type { Escultura } from "@/types";
import SculptureCard from "./sculptureCard";

type SculptureList = {
  esculturasInicio: Escultura[];
};

export default function SculptureList({ esculturasInicio }: SculptureList) {
  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 justify-items-center">
        {esculturasInicio.map((escultura: Escultura) => (
          <SculptureCard key={escultura.id} escultura={escultura} />
        ))}
      </div>
    </div>
  );
}
