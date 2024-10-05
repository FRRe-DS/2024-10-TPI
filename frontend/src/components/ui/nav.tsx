"use client";
import React from "react";
import styles from "./nav.module.css";

export default function Nav() {
  const menuItems = ["Escultores", "Esculturas", "Ediciones"];
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {isMenuOpen ? (
        <div
          className={`flex flex-col gap-8 py-6 h-screen items-center absolute w-full bg-white top-0 left-0 transition-opacity duration-1000 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
        >
          <button onClick={toggleMenu} className="btn-close">
            Cerrar
          </button>
          {menuItems.map((item) => (
            <button key={item} className={styles.button}>
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
                <text x="10" y="45" className={styles.text + "font-[60vh]"}>
                  {item}
                </text>
              </svg>
            </button>
          ))}
        </div>
      ) : (
        <button onClick={toggleMenu} className="btn-open">
          Abrir Menú
        </button>
      )}
    </>
  );
}
