"use client";
import React from "react";
import styles from "./nav.module.css";
import Link from "next/link";
export default function Nav() {
  function traducir(palabra: string) {
    if (palabra === "login") return "Iniciar sesión";
    if (palabra === "/") return "Ediciones";
    return palabra;
  }
  // Este array contiene la ruta a la que redirigir, se la traduce para mostrarle al usuario
  const menuItems = ["Escultores", "Esculturas", "/", "login"];
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
              <text x="10" y="45" className={styles.text + "font-[60vh]"}>
                {traducir(item)}
              </text>
            </svg>
          </Link>
        ))}
      </nav>

      <div className="relative">
        <button
          onClick={toggleMenu}
          className="shadow-lg sticky w-full px-8 py-4 flex items-center justify-center text-center"
        >
          <div className="absolute inset-0 blur-sm bg-opacity-50"></div>
          <span className="relative">Abrir Menú</span>
        </button>
      </div>
    </>
  );
}
