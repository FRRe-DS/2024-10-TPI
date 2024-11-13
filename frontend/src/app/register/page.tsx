"use client";
import Link from "next/link";
import { handleRegister } from "./actions";
import { useFormStatus } from "react-dom";

export default function Page() {
  const { pending } = useFormStatus();
  return (
    <div className="mx-auto flex p-5 flex-col justify-center items-center">
      <div className="p-10 border drop-shadow-md shadow-sm w-96 rounded-xl">
        <h1 className="font-bold text-xl mb-4">Registrarse</h1>
        <form className="flex flex-col space-y-4" action={handleRegister}>
          <input
            type="name"
            placeholder="Nombre"
            name="nombre"
            className="border p-2 rounded"
            required
          />
          <input
            type="lastname"
            placeholder="Apellido"
            name="apellido"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="correo"
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="contrasenia_hasheada"
            className="border p-2 rounded"
            required
          />
          <button
            disabled={pending}
            type="submit"
            className="disabled:bg-gray-400 bg-blue-500 text-white p-2 rounded"
          >
            Registrarse
          </button>
        </form>
        <Link href="/login" className="mt-4 text-blue-500 underline">
          Volver a Login
        </Link>
      </div>
    </div>
  );
}

