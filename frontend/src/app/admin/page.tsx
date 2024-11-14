import { BarrasData } from "@/components/estadisticos/barras";
import { CardDemo } from "@/components/ui/cardAdmin";

export default function Home() {
  return (
    <>
      <div>
        <h1 className="font-bold text-xl mx-auto w-fit">Inicio</h1>
        <div className="flex space-x-4">
          <CardDemo />
          <BarrasData />
        </div>
      </div>
    </>
  );
}
