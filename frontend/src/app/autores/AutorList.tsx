"use client";
import type { Autor } from "@/types";
import AutorCard from "./AutorCard";
import { useCallback, useEffect, useState } from "react";
import { getAutores } from "./action";
import { useInView } from "react-intersection-observer";

type AutorList = {
  autoresInicio: Autor[];
};

export default function AutorList({ autoresInicio }: AutorList) {
  const [autores, setAutores] = useState<Autor[]>(autoresInicio);
  const [pageNumber, setPageNumber] = useState(2);
  const { ref, inView } = useInView();

  const loadMoreAutores = useCallback(async () => {
    const apiAutores = await getAutores(pageNumber);
    console.log(apiAutores);
    setAutores((autores) => [...autores, ...apiAutores]);
    setPageNumber((pageNumber) => pageNumber + 1);
  }, [pageNumber]);

  useEffect(() => {
    if (inView) {
      loadMoreAutores();
    }
  }, [inView, loadMoreAutores]);

  return (
    <div className="flex flex-col gap-3 flex-wrap">
      {autores.map((autor: Autor) => (
        <AutorCard key={autor.id} autor={autor} />
      ))}
      <div ref={ref}>Loading...</div>
      {/* <button onClick={loadMoreAutores}>Load more</button> */}
    </div>
  );
}
