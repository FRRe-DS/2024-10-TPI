"use client";
import { useState, useEffect } from "react";
import styles from "./nav.module.css";
import Link from "next/link";
import { deleteCookie } from "@/app/actions";
import EditionSubmenu from "./editionSubmenu";
import Image from "next/image";

export default function Nav(cookieData: any, user: any) {
  // Estado para controlar si el menú lateral está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Estado para controlar la visibilidad de la barra de navegación principal al hacer scroll
  const [isVisible, setIsVisible] = useState(true);
  // Estado para almacenar la posición de scroll anterior
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // Elementos del menú principal
  const menuItems = ["Esculturas", "autores"];

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
      <nav
        className={`fixed z-[100] flex flex-col gap-8 py-6 h-screen items-center w-full bg-white top-0 left-0 transition-all duration-200 ease-in-out shadow-gray-400 
${
  isMenuOpen
    ? "opacity-100 pointer-events-auto"
    : "opacity-0 pointer-events-none"
} 
`}
      >
        {cookieData?.user && (
          <p className="sm:hidden block">
            {`Usuari@: ${cookieData?.user?.nombre} ${cookieData?.user?.apellido}`}
          </p>
        )}
        {/* Botón para cerrar sesión o enlace de inicio de sesión según el estado de la cookie */}
        {cookieData?.cookieData ? (
          <button
            onClick={async () => {
              await deleteCookie();
              setIsMenuOpen(false);
            }}
            className={styles.button}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
              <text
                x="10"
                y="45"
                className={styles.text + "sm:font-[60vh] !font-[40vh]"}
              >
                Cerrar sesión
              </text>
            </svg>
          </button>
        ) : (
          <Link href="/login" className={styles.button} onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
              <text
                x="10"
                y="45"
                className={styles.text + "sm:font-[60vh] !font-[40vh]"}
              >
                Iniciar sesión
              </text>
            </svg>
          </Link>
        )}

        {/* Renderiza los elementos del menú principal */}
        {menuItems.map((item) => (
          <div key={item} className={styles.button}>
            <Link href={item} onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
                <text
                  x="10"
                  y="45"
                  className={
                    styles.text + "sm:font-[60vh] !font-[40vh] capitalize"
                  }
                >
                  {item}
                </text>
              </svg>
            </Link>
          </div>
        ))}
        <EditionSubmenu toggleMenu={toggleMenu} />
        <button onClick={toggleMenu} className="mt-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width={20}
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </button>
      </nav>

      {/* Barra de navegación principal */}
      <div
        className={`
          top-0 left-0 right-0 
          shadow-lg w-full px-8 py-4 
          min-h-14 flex items-center 
          justify-center text-center 
          bg-white relative
          transition-transform duration-300 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <Link href={"/"}>
          <Image
            width={120}
            height={40}
            src="/bienal-del-chaco.jpg"
            alt="Bienal del Chaco"
            className="absolute left-5 top-1/2  -translate-y-1/2"
          />
        </Link>
        <button
          onClick={toggleMenu}
          className="absolute left-1/2 -translate-x-1/2"
        >
          Menú
        </button>
        {cookieData?.user && (
          <p className="ml-auto sm:block hidden">
            {`Usuari@: ${cookieData?.user?.nombre} ${cookieData?.user?.apellido}`}
          </p>
        )}
      </div>
    </>
  );
}
