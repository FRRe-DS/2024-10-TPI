"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function handleLogin(data: FormData) {
  const formData = {
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
    console.log(response);
    const respData = await response.json();
    console.log(respData);
    if (!response.ok) {
      throw new Error(respData.message || "Algo salió mal.");
    }
    const cookieStore = await cookies();
    cookieStore.set("access_token", respData.access_token);
    cookieStore.set("correo", formData.correo as string);
  } catch (error) {
    console.log(error);
  }
  redirect("/");
}
