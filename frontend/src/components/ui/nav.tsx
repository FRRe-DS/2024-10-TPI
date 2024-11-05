"use client";
import { useState, useEffect } from "react";
import styles from "./nav.module.css";
import Link from "next/link";
import { deleteCookie } from "@/app/actions";

export default function Nav(
  cookieData: Record<string, string> | undefined,
  correo: Record<string, string> | undefined,
) {
  // Estado para controlar si el menú lateral está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Estado para controlar la visibilidad de la barra de navegación principal al hacer scroll
  const [isVisible, setIsVisible] = useState(true);
  // Estado para almacenar la posición de scroll anterior
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  // Estado para mostrar/ocultar el submenú de ediciones
  const [showEditions, setShowEditions] = useState(false);

  // Función para traducir el ítem "/" a "Ediciones" en el menú
  function traducir(palabra: string) {
    if (palabra === "/") return "Ediciones";
    return palabra;
  }

  // Elementos del menú principal
  const menuItems = ["autores", "Esculturas", "Contacto", "/"];

  // Elementos del submenú de ediciones
  const ediciones = [
    { nombre: "Edición 2016", ruta: "/ediciones/edicion1" },
    { nombre: "Edición 2018", ruta: "/ediciones/edicion2" },
    { nombre: "Edición 2020", ruta: "/ediciones/edicion3" },
  ];

  // Efecto para manejar el scroll y mostrar/ocultar la barra de navegación
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingUp = prevScrollPos > currentScrollPos;

      // Muestra la barra de navegación si se hace scroll hacia arriba o está cerca de la parte superior
      setIsVisible(scrollingUp || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos); // Actualiza la posición de scroll
    };

    if (isMenuOpen) {
      // Bloquea el scroll de la página cuando el menú está abierto
      document.body.style.overflow = "hidden";
    } else {
      // Restaura el scroll de la página cuando el menú está cerrado y añade el listener de scroll
      document.body.style.overflow = "auto";
      window.addEventListener("scroll", handleScroll);
    }

    // Limpia el evento de scroll y desbloquea el scroll del cuerpo al desmontar el componente o cerrar el menú
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, isMenuOpen]);

  // Alterna el estado de apertura/cierre del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Asegura que la barra de navegación esté visible al abrir el menú lateral
    if (!isMenuOpen) {
      setIsVisible(true);
    }
  };

  return (
    <>
      {/* Menú lateral */}
      <nav

        className={`fixed z-[100] flex flex-col gap-8 py-6 h-screen items-center w-full bg-white top-0 left-0 transition-all duration-200 ease-in-out ${

          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } shadow-gray-400`}  // Aplica una sombra gris
      >
        {/* Botón para cerrar el menú lateral */}
        <button onClick={toggleMenu} className="text-2xl">
          Cerrar
        </button>
  
        {/* Renderiza los elementos del menú principal */}
        {menuItems.map((item) => (
          <div
            key={item}
            className={styles.button}
            // Muestra el submenú de ediciones al pasar el cursor sobre "Ediciones"
            onMouseEnter={() => item === "/" && setShowEditions(true)}
            // Oculta el submenú cuando el cursor sale del área de "Ediciones"
            onMouseLeave={() => item === "/" && setShowEditions(false)}
          >
            <Link href={item} onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
                <text
                  x="10"
                  y="45"
                  className={styles.text + "font-[60vh] capitalize"}
                >
                  {traducir(item)}
                </text>
              </svg>
            </Link>
  
            {/* Renderiza el submenú de ediciones solo cuando el cursor está sobre "Ediciones" */}
            {item === "/" && showEditions && (
              <div
                className={`${styles.submenu} absolute mt-2 bg-white shadow-gray-400 rounded px-4 py-2`} // Sombra gris para el submenú
                style={{
                  minWidth: "150px",
                  zIndex: 20,
                }}
                onMouseEnter={() => setShowEditions(true)} // Mantiene el submenú abierto al pasar el cursor sobre él
                onMouseLeave={() => setShowEditions(false)} // Oculta el submenú al salir del área
              >
                {ediciones.map((edicion) => (
                  <Link
                    href={edicion.ruta}
                    key={edicion.nombre}
                    className={`${styles.button} block px-4 py-2 hover:bg-gray-400 text-black`}  //Estilo de hover en gris
                    onClick={toggleMenu}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
                      <text x="10" y="45" className={styles.text + "font-[60vh]"}>
                        {edicion.nombre}
                      </text>
                    </svg>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
  
        {/* Botón para cerrar sesión o enlace de inicio de sesión según el estado de la cookie */}
        {cookieData?.accessToken ? (
          <button
            onClick={async () => {
              await deleteCookie();
              setIsMenuOpen(false);
            }}
            className={styles.button}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
              <text x="10" y="45" className={styles.text + "font-[60vh]"}>
                Cerrar sesión
              </text>
            </svg>
          </button>
        ) : (
          <Link href="/login" className={styles.button} onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
              <text x="10" y="45" className={styles.text + "font-[60vh]"}>
                Iniciar sesión
              </text>
            </svg>
          </Link>
        )}
      </nav>
  
      {/* Barra de navegación principal */}
      <div

        className={`
          fixed top-0 left-0 right-0 
          shadow-lg w-full px-8 py-4 
          min-h-14 flex items-center 
          justify-center text-center 
          bg-white relative
          transition-transform duration-300 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <img
          src="/bienal-del-chaco.jpg"
          alt="Bienal del Chaco"
          className="h-10 w-auto absolute left-5 top-1/2  -translate-y-1/2"
        />
        <button onClick={toggleMenu} className="mx-auto">
          Menú
        </button>
        {/* Muestra el correo del usuario si hay un token de acceso */}
        {cookieData?.accessToken && (
          <p className="ml-auto">Usuario: {cookieData?.correo?.value}</p>
        )}
      </div>
    </>
  );
}