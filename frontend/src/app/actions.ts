"use server";

import { EsculturaPaginatedResponse } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Function to delete a cookie by its name
export async function deleteCookie() {
  const cookieStore = cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("user");
  redirect("/");
}

export const getEsculturasRandom = async (): Promise<string[]> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/obras`;
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
      const data: EsculturaPaginatedResponse = await response.json();
      const imageUrls = data.items.flatMap(obra => obra.imagenes.map(imagen => imagen.url));
      const shuffledUrls = imageUrls.sort(() => Math.random() - 0.5);
      return shuffledUrls.slice(0, 20);  
  } catch (error) {
    console.error("Error al obtener las esculturas:", error);
    throw error;
  }
};
  