import { CircleData } from "@/components/estadisticos/circle";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { getAutores } from "@/app/autores/action";

async function getData(): Promise<Payment[]> {
  const autores = await getAutores();
  return autores.map(autor => ({
    id: autor.id.toString(),
    nombre: autor.nombre,
    apellido: autor.apellido,
    pais_origen: autor.pais_origen,
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
          <CircleData />
        </div>
      </div>

      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
    </div>
  );
}
