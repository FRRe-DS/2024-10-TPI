import Nav from "@/components/ui/nav";
import dynamic from "next/dynamic";

const Model = dynamic(() => import("@/components/Model"), { ssr: false });

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-400">
      <div className="text-left mb-4">
        <h3 className="text-[5rem] font-bold">Bienal del Chaco</h3>
        <h1 className=" text-6xl font-bold">2024</h1>
      </div>
      <div className="text-[3rem] p-10 m-10">
        <Model />
      </div>
    </div>
  );
}
