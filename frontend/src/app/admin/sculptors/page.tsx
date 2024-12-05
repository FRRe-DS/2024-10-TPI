"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAutores } from "@/app/autores/action";
import { Autor } from "@/types";

export default async function page() {
  const [autores, setAutores] = useState<Autor[]>([]); // Estado para almacenar las esculturas

  const fetchData = async () => {
    const autores = await getAutores();
    setAutores(autores || []);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 w-full">
      <div className="w-full pr-10">
        <DataTable columns={columns} data={autores} />
      </div>
    </div>
  );
}
