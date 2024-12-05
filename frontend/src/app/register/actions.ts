"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// tomo los datos del fomulario
export async function handleRegister(data: FormData) {
  const formData = {
    nombre: data.get("nombre"),
    apellido: data.get("apellido"),
    correo: data.get("correo"),
    contrasenia_hasheada: data.get("contrasenia_hasheada"),
    rol: "votante",
  };

  // me conecto con el endpoint, mi bd
  const endpoint = `${process.env.NEXT_PUBLIC_API}/register`;

  // mando el metodo post
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const respData = await response.json();
    if (!response.ok) {
      throw new Error(respData.message || "Algo salió mal.");
    }
    const cookieStore = await cookies();
    cookieStore.set("access_token", respData.token.access_token);
    cookieStore.set("user", JSON.stringify(respData.user));
  } catch (error) {
    console.log(error);
  }
  redirect("/");
}
