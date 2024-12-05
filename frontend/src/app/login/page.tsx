"use client";
import Link from "next/link";
import { handleLogin } from "./actions";
import { useFormStatus } from "react-dom";
import { handleGoogleLogin } from './actions';

export default function Page() {
  const { pending } = useFormStatus();
  
  // const handleGoogleClick = async () => {
  //   try {
  //       const response = await handleGoogleLogin();
  //       console.log("URL de redirección:", response.url);
  //       window.location.href = response.url;
  //   } catch (error) {
  //       console.error("Error al iniciar sesión con Google:", error);
  //   }
  // };
  
  return (
    <div className="mx-auto flex p-5 flex-col justify-center items-center">
      <div className="p-10 border drop-shadow-md shadow-sm w-96 rounded-xl">
        <h1 className="font-bold text-xl mb-4">Inicio de sesión</h1>
        <form className="flex flex-col space-y-2" action={handleLogin}>
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
            Iniciar sesión
          </button>

          {/* boton de google */}
          {/* <button
            type="button"
            onClick={handleGoogleClick}
            className="flex items-center justify-center gap-2 w-full bg-white text-gray-700 p-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            <img src="/google.svg" alt="Google logo" className="w-5 h-5" />
            Continuar con Google
          </button> */}

        </form>
        <Link href="/register" className="mt-4 text-blue-500 underline">
          Crear una cuenta
        </Link>
      </div>
    </div>
  );
}
