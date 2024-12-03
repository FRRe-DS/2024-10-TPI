"use client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getEventos } from "./action";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { Eventos } from "@/types";
import { Button } from "@/components/ui/button";
import { EventoModal } from "../Component/modalEvent";

export default function Page() {
  const [data, setData] = useState<Eventos[]>([]); // Estado para almacenar las esculturas

  async function fetchData() {
    const eventos = await getEventos();
    setData(eventos);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setEventos] = useState<Eventos[]>([]);

  const handleSave = (nuevoEvento: Eventos) => {
    setEventos((prev) => [...prev, nuevoEvento]); // Agrega el nuevo evento a la lista
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 w-full">
      <div className="w-full ">
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Crear evento
        </Button>
        <DataTable columns={columns} data={data} />
      </div>
      <div className="w-full md:w-1/6">
        <Calendar />
      </div>
      <EventoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
