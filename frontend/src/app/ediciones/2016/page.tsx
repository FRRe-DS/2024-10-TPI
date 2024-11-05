
export default function Home() {
    return (
      <div className="h-screen flex items-center pl-20">
          <div className="text-left text-[5rem] font-bold">
              <h3>Bienal Internacional</h3>
              <h3> de Esculturas 2016</h3>
          </div>
          <div 
            className="bg-right bg-no-repeat -z-10 h-screen w-[90vh] bg-center"
            style={{ backgroundImage: `url('/ediciones/edicion_2016.jpg')` }}
          ></div>
      </div>
    );
  }