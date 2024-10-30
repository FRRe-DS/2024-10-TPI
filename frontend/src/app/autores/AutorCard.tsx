import type { Autor } from "@/types";

type UserProps = {
  autor: Autor;
};

export default function AutorCard({ autor }: UserProps) {
  return (
    <div className="bg-indigo-400 text-white rounded w-96 p-3">
      <div>{autor.nombre}</div>
      <div>{autor.apellido}</div>
      <div>{autor.pais_origen}</div>
    </div>
  );
}
