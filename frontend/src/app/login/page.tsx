import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function Page() {
  async function handleLogin(data: FormData) {
    "use server";
    const formData = {
      correo: data.get("correo"),
      contrasenia_hasheada: data.get("contrasenia_hasheada"),
    };

    const endpoint = true
      ? `${process.env.NEXT_PUBLIC_API}/login`
      : `${process.env.NEXT_PUBLIC_API}/register`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Algo salió mal.");
      }
      revalidatePath("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mx-auto flex p-5 flex-col justify-center items-center">
      <div className="p-10 border drop-shadow-md shadow-sm w-96 rounded-xl">
        <h1 className="font-bold text-xl mb-4">Inicio de sesión</h1>
        <form className="flex flex-col space-y-4" action={handleLogin}>
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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Iniciar sesión
          </button>
        </form>
        <Link href="/" className="mt-4 text-blue-500 underline">
          Crear una cuenta
        </Link>
      </div>
    </div>
  );
}
