"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Calendar } from "@/components/ui/calendar";
import { Eventos } from "@/types";
import { Button } from "@/components/ui/button";
import { EventoModal } from "../Component/modalEvent";
import { getEventos } from "./action";

export default function Page() {
  const [data, setData] = useState<Eventos[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    const eventos = await getEventos();
    setData(eventos);
  };

  useEffect(() => {
    fetchData();
   
  }, []);

  const handleSave = (nuevoEvento: Eventos) => {
      setData((prev) => (Array.isArray(prev) ? [...prev, nuevoEvento] : [nuevoEvento]));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 w-full">
      <div className="w-full">
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
