import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      votos: 1003,
      escultura: "Peortins",
      escultor: "Juan pedro",
    },
    {
      id: "728ed52f",
      votos: 352,
      escultura: " picapiedra",
      escultor: "Piedra juan",
    },
    {
      id: "728ed52f",
      votos: 1200,
      escultura: "piedra",
      escultor: "Alberto",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-11">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
