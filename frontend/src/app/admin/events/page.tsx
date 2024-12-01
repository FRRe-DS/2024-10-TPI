"use client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getEventos } from "./action";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { Eventos } from "@/types";
import { Button } from "@/components/ui/button";
import { EventoModal } from "../Component/modal";

export default function Page() {
  const [data, setData] = useState<Eventos[]>([]); // Estado para almacenar las esculturas

  async function fetchData() {
    const eventos = await getEventos();
    console.log(eventos)
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
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <DataTable columns={columns} data={data} />
        </div>
        <div className="md:col-span-1">
          <Button
            variant="outline"
            className="ml-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Crear evento
          </Button>
          <EventoModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
          {/* <Calendar /> */}
        </div>
      </div>
    </div>
  );
}
