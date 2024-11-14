"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const handleGoogleLogin = async () => {
  try {
    return {
      url: `/api/auth/signin/google?callbackUrl=${encodeURIComponent(process.env.NEXTAUTH_URL || "http://localhost:3000")}`,
    };
  } catch (error) {
    console.error("Error en login de Google:", error);
    throw error;
  }
};

// manejo de login normal
// esta funcion el facuBlanco no toco nada de nada.
export async function handleLogin(data: FormData) {
  const formData = {
    id: null,
    nombre: null,
    apellido: null,
    correo: data.get("correo"),
    contrasenia_hasheada: data.get("contrasenia_hasheada"),
  };

  const endpoint = `${process.env.NEXT_PUBLIC_API}/login`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const respData = await response.json();
    cookies().set("access_token", respData.token.access_token);
    cookies().set("user", JSON.stringify(respData.user));
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error ? error.message : "Error desconocido",
    );
  }
  redirect("/");
}
