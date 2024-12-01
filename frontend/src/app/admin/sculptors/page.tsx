import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAutores } from "@/app/autores/action";


export default async function page() {
  async function fetchData() {
    const autores = await getAutores();
    return autores;
  }
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <DataTable columns={columns} data={await fetchData()} />
        </div>
      </div>

      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
    </div>
  );
}
