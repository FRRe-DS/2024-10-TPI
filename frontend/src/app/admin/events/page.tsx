import { CircleData } from "@/components/estadisticos/circle";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { getEventos } from "./action";
import { Calendar } from "@/components/ui/calendar";

async function getData(): Promise<Payment[]> {
  const eventos = await getEventos();
  console.log(eventos);
  return eventos.map((evento) => ({
    edicion: evento.edicion,
    nombre: evento.nombre,
    fechaInicio: new Date(evento.fecha_inicio).toLocaleDateString(),
    fechaFin: new Date(evento.fecha_fin).toLocaleDateString(),
    lugar: evento.lugar,
    tematica: evento.tematica,
  }));
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <DataTable columns={columns} data={data} />
        </div>
        <div className="md:col-span-1">
          <Calendar />
        </div>
      </div>

      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
    </div>
  );
}
