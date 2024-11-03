"use client";
import { useState, useEffect } from "react";
import styles from "./nav.module.css";
import Link from "next/link";
import { deleteCookie } from "@/app/actions";

export default function Nav(
  cookieData: Record<string, string> | undefined,
  correo: Record<string, string> | undefined,
) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  function traducir(palabra: string) {
    if (palabra === "/") return "Ediciones";
    return palabra;
  }

  const menuItems = ["autores", "Esculturas", "/"];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollingUp = prevScrollPos > currentScrollPos;

      setIsVisible(scrollingUp || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    if (isMenuOpen) {
      // Bloquear scroll cuando el menú está abierto
      document.body.style.overflow = "hidden";
    } else {
      // Restaurar scroll y añadir event listener cuando está cerrado
      document.body.style.overflow = "auto";
      window.addEventListener("scroll", handleScroll);
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsVisible(true);
    }
  };

  return (
    <>
      <nav
        className={`z-10 flex flex-col gap-8 py-6 h-screen items-center absolute w-full bg-white top-0 left-0 transition-all duration-200 ease-in-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button onClick={toggleMenu} className="text-2xl">
          Cerrar
        </button>
        {menuItems.map((item) => (
          <Link
            href={item}
            key={item}
            className={styles.button}
            onClick={toggleMenu}
          >
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
        ))}
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

      <div
        className={`
          fixed top-0 left-0 right-0 
          shadow-lg w-full px-8 py-4 
          min-h-14 flex items-center 
          justify-center text-center 
          bg-white
          transition-transform duration-300 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          Menú
        </button>
        {cookieData?.accessToken && (
          <p className="ml-auto">Usuario: {cookieData?.correo?.value}</p>
        )}
      </div>
    </>
  );
}
