
"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { CircleData } from "@/components/estadisticos/circle";
import { getEsculturas } from "@/app/Esculturas/action";
import { columns } from "./columns";
import { Escultura } from "@/types";

export default function Page() {
  const [data, setData] = useState<Escultura[]>([]); // Estado para almacenar las esculturas
  const [chartData, setChartData] = useState<
    { nombre: string; Votos: number; fill: string }[]
  >([]);

  const fetchData = async () => {
    const esculturas = await getEsculturas();
    setData(esculturas.items);

    // Transformar los datos para el gráfico
    const transformedData = esculturas.items.map((item: Escultura, index: number) => ({
      nombre: item.nombre_obra,
      Votos: item.cant_votos, // Asume que `votos` es una propiedad de la escultura
      fill: `hsl(${index * 60}, 70%, 50%)`, // Generar un color único por índice
    }));

    setChartData(transformedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 w-full">
      <div className="w-full pr-10">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="md:col-span-1 py-16">
        <CircleData data={chartData} />
      </div>
    </div>
  );
}
