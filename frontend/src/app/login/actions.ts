"use server";
import { revalidatePath } from "next/cache";
export async function handleLogin(data: FormData) {
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
