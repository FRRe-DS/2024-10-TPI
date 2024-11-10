import { BarrasData } from "@/components/estadisticos/barras";
import { CircleData } from "@/components/estadisticos/circle";
import { CardDemo } from "@/components/ui/cardAdmin";

export default function Home() {
  return (
    <>
      <div>
        <h1 className="font-bold text-xl mx-auto w-fit">Inicio</h1>
        <div className="flex space-x-4">
          <CardDemo />
          <CircleData />
          <BarrasData />
        </div>
      </div>
    </>
  );
}
