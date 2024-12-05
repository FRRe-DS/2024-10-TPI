import { useState } from "react";
import styles from "./nav.module.css";
import Link from "next/link";
export default function EditionSubmenu({ toggleMenu }: { toggleMenu: any }) {
  const [showEditions, setShowEditions] = useState(false);
  // Elementos del submenú de ediciones
  const ediciones = [
    { nombre: "Bienal 2022", ruta: "/ediciones?edicion=2022" },
    { nombre: "Bienal 2018", ruta: "/ediciones?edicion=2018" },
    { nombre: "Bienal 2016", ruta: "/ediciones?edicion=2016" },
  ];

  return (
    <div
      onMouseEnter={() => setShowEditions(true)}
      onMouseLeave={() => setShowEditions(false)}
      className={styles.button}
    >
      <Link href={"/"} onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
          <text
            x="10"
            y="45"
            className={styles.text + "sm:font-[60vh] !font-[40vh] capitalize"}
          >
            Ediciones
          </text>
        </svg>
      </Link>
      {showEditions && (
        <div
          className={`${styles.blinds} min-w-[300px] z-20`} // Sombra gris para el submenú
        >
          {ediciones.map((edicion) => (
            <Link
              href={edicion.ruta}
              key={edicion.nombre}
              className={`${styles.button} block px-8 py-5 hover:text-red-700 font-semibold text-3xl`} //Estilo de hover en gris
              onClick={toggleMenu}
            >
              <span className="text-3xl font-semibold">{edicion.nombre}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
