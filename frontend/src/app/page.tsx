import { Autorcarousel } from "@/components/carrusel/AutoresCarousel";
import dynamic from "next/dynamic";

const Model = dynamic(() => import("@/components/Model"), { ssr: false });

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-left mb-4">
          <h3 className="text-[5rem] font-bold">Bienal del Chaco</h3>
          <h1 className=" text-6xl font-bold">2024</h1>
        </div>
        <div className="text-[3rem] p-10 m-10">
          <Model />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full bg-slate-400 py-0 my-0">
        <div className="text-center mb-4">
          <h1 className="text-[3rem] font-bold">Escultores</h1>
        </div>
        <div className="py-0 p-10 m-10">
          <Autorcarousel />
        </div>
      </div>
    </>
  );
}
