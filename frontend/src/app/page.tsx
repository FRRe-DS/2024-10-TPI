import { Autorcarousel } from "@/components/carrusel/AutoresCarousel";
import dynamic from "next/dynamic";

const Model = dynamic(() => import("@/components/Model"), { ssr: false });



export default function Home() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full h-screen overflow-y-scroll snap-y snap-proximity scrollbar-none scroll-smooth">
        {/* Primera sección - Bienal del Chaco */}

        <div className="h-screen w-full flex items-center justify-center moving-background  snap-start">
          <div className="text-left mb-4">
            <h3 className="text-[5rem] font-bold font-libre mb-[-1rem] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              <span>Bienal del </span>
              <span className="italic">Chaco</span>
            </h3>
            <h1 className="text-6xl font-bold font-libre text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">
              2024
            </h1>
          </div>  

          <div className="text-[5rem] mr-15">
            <Model />
          </div>
        </div>

          {/* Segunda sección - Nuestras Esculturas y Carrusel */}
      <div className="h-screen w-full flex flex-col snap-start">
        {/* Div del texto con imagen de fondo */}
        <div className="relative w-full py-10 bg-white"> {/* Fondo blanco para la sección */}
          {/* Contenido */}
          <div className="w-2/3 h-1 bg-gray-400 mb-8 mx-auto"></div> {/* Barra gris */}


          <div className="relative z-10">
          <p className="text-black-600 font-bold text-center py-4 font-sans max-w-4xl mx-auto px-8 text-3xl uppercase tracking-widest shadow-md">
            Bienvenidos a una experiencia diferente
            </p>
            <p className="text-gray-700 font-semibold text-center py-2 font-sans max-w-3xl mx-auto px-8 text-lg italic shadow-sm">
              Una manifestación internacional de arte contemporáneo que reúne artistas y pueblo en un mismo espacio, conectando de manera potente a la gente con el arte y la naturaleza.
            </p>
            
          </div>
        </div>

        {/* Div del carrusel */}
        <div className="h-[463px] bg-neutral-800">
          <Autorcarousel />
        </div>
      </div>

     {/* Tercera sección */}
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center snap-start px-4">
        <h1 className="text-3xl font-bold font-libre text-white text-center mb-4">
          Los Concursos de Escultura
        </h1>
        <p className="text-xl font-libre text-gray-400 text-center mb-8">
          Proveedores Inagotables de un Patrimonio cada vez mayor
        </p>
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 text-lg font-libre text-white">
          <p>
            Desde el Primer Concurso de Escultura en Madera en la Plaza Central, en 1988, hasta las Bienales internacionales en la actualidad, El Gobierno de la Provincia del Chaco y la Fundación Urunday trabajan mancomunadamente para hacer de cada Bienal una verdadera celebración de la identidad de los chaqueños.
          </p>
          <p>
            Estos certámenes convocan a prestigiosos escultores del mundo que, a cielo abierto y ante miles de espectadores, crean una obra original e inédita. Las obras se realizan en distintos materiales no perecederos y luego son integradas al espacio público, en veredas, bulevares, parques y plazas de la ciudad, enriqueciendo un patrimonio cultural sin precedentes y transformando a Resistencia en un moderno y único museo de arte al aire libre.
          </p>
          <p>
            Los concursos escultóricos se convirtieron rápidamente en una fiesta popular de magnitud impensada. Miles de visitantes llegan desde los más diversos puntos del país y del mundo, transformando el Predio de las Bienales en un suceso cultural y social que reúne a artistas y público en un mismo espacio de intercambio pluricultural.
          </p>
          <p>
            La trascendencia alcanzada por las Bienales ha logrado insertar a Resistencia en los circuitos internacionales de escultura y posicionarla como una referencia internacional del arte y la cultura.
          </p>
        </div>
      </div>

      {/* Cuarta sección - Imagen sin interrupción visual */}
        <div className="w-full bg-black flex justify-center items-center py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl">
            <img src="/ediciones/1988.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/1989.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/1990.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/1991.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/1992.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/1993.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/1994.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/1995.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/1996.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/1997.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/1998.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/1999.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/2000.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/2002.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/2004.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/2006.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/2008.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/2010.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/2012.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/2014.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/2016.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/2018.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/2020.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/2022.png" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
            <img src="/ediciones/2024.jpg" alt="Posters Bienal del Chaco" className="object-contain w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}