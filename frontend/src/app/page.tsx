import { Autorcarousel } from "@/components/carrusel/AutoresCarousel";
import dynamic from "next/dynamic";

const Model = dynamic(() => import("@/components/Model"), { ssr: false });

export default function Home() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full h-screen overflow-y-scroll snap-y snap-proximity scrollbar-none scroll-smooth">
        {/* Primera sección - Bienal del Chaco */}
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-t from-slate-500 via-slate-300 to-white snap-start">
          <div className="text-left mb-4">
            <h3 className="text-[5rem] font-bold font-britannic mb-[-1rem]">
              <span>Bienal del </span>
              <span className="italic">Chaco</span>
            </h3>
            <h1 className="text-6xl font-bold font-britannic text-center">
              2024
            </h1>
          </div>
          <div className="text-[3rem] mr-28">
            <Model />
          </div>
        </div>

        {/* Segunda sección - Nuestras Esculturas y Carrusel */}
        <div className="h-screen w-full flex flex-col snap-start">
          {/* Div del texto con imagen de fondo */}
          <div className="relative w-full py-10">
            {" "}
            {/* Ajusta el py-16 según necesites más o menos espacio */}
            {/* Imagen de fondo */}
            <div className="absolute inset-0 bg-[url('/parque2DeFebrero/imagen1.jpg')] bg-cover bg-center bg-no-repeat" />
            {/* Overlay oscuro para mejor legibilidad */}
            <div className="absolute inset-0 bg-black/65" />
            {/* Contenido */}
            <div className="relative z-10">
              <p className="text-white text-justify py-8 font-sans max-w-4xl mx-auto px-8 text-xl border-4 border-white rounded-lg">
                Nuestra Bienal es un evento anual que celebra el arte y la cultura en la ciudad de Resistencia, Chaco, Argentina. Desde su creación en 2014, ha sido un espacio donde artistas de todo el mundo han podido mostrar y compartir sus obras de escultura.
              </p>
            </div>
          </div>

          {/* Div del carrusel */}
          <div className="h-[463px] bg-neutral-800">
            <Autorcarousel />
          </div>
        </div>
        {/* Tercera sección */}
        <div className="h-screen w-full bg-white flex flex-col items-center justify-center snap-start">
          <h1 className="text-[3rem] font-bold font-britannic text-white text-center mb-8">
            Nueva Sección
          </h1>
          <div className="w-full max-w-4xl px-4">
            {/* Aquí va el contenido de tu tercera sección */}
          </div>
        </div>
      </div>
    </div>
  );
}

