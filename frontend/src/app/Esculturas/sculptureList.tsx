"use client";
import type { Escultura } from "@/types";
import SculptureCard from "./sculptureCard";
import { useEffect, useState } from "react";
import { getEsculturas } from "./action";
import { useInView } from "react-intersection-observer";

type SculptureList = {
  esculturasInicio: Escultura[];
};

export default function SculptureList({ esculturasInicio }: SculptureList) {
  const [esculturas, setEsculturas] = useState<Escultura[]>(esculturasInicio);
  const [pageNumber, setPageNumber] = useState(2);
  const { ref, inView } = useInView();

  const loadMoreSculptures = async () => {
    const apiEsculturas = await getEsculturas(pageNumber);
    setEsculturas((esculturas) => [...esculturas, ...apiEsculturas]);
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  useEffect(() => {
    if (inView) {
      loadMoreSculptures();
    }
  }, [inView]);

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 justify-items-center">
      {esculturas.map((escultura: Escultura) => (
        <SculptureCard key={escultura.id} escultura={escultura} />
        ))}
      </div>
      <div ref={ref} className="text-center mt-4">Cargando más esculturas...</div>
    </div>
  );
}
