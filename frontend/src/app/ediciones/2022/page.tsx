
export default function Home() {
  return (
    <div className="flex h-screen items-center">
        <div className="flex pl-20 text-left items-center h-screen text-[5rem] font-bold">
            <div className="flex flex-col">
              <h3>Bienal Internacional</h3>
              <h3> de Esculturas 2022</h3>
            </div>
        </div>
        <div 
          className="absolute inset-0 -z-10 bg-gradient-to-l from-gray-100 to-white"
        ></div>
        <div 
          className="absolute inset-0 -z-10 bg-no-repeat h-screen w-[90vh] ml-auto"
          style={{ backgroundImage: `url('/ediciones/edicion_2022.jpg')` }}
      ></div>
    </div>
  );
}