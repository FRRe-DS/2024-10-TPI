"use server";
import { EsculturaPaginatedResponse } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getEsculturas = async (
  pageNumber = 1,
): Promise<EsculturaPaginatedResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API}/obras?page=${pageNumber}`;
  const response = await fetch(url, {
    method: "GET", // Cambiado a GET para mayor compatibilidad
    cache: "no-store", // Evitamos el caché
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

export const getQRToken = async () => {
  const url = `${process.env.NEXT_PUBLIC_API}/qr`;
  const response = await fetch(url);

  console.log(response);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

export const isValidQRToken = async (token: string) => {
  const url = `${process.env.NEXT_PUBLIC_API}/qr/verify?token=${token}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

export const getVote = async (
  esculturaId: number,
): Promise<{ rating: number } | null> => {
  try {
    const userString = cookies().get("user");
    const user = userString ? JSON.parse(userString?.value) : null;

    if (!user) {
      return null;
    }
    const url = `${process.env.NEXT_PUBLIC_API}/votos/${user.id}/${esculturaId}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      rating: data.estrellas,
    };
  } catch (error) {
    console.error("Error detallado:", error);
    return null;
  }
};

export const postVote = async (
  esculturaId: number,
  rating: number,
): Promise<any> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  const userString = cookieStore.get("user");
  const user = userString ? JSON.parse(userString?.value) : null;

  if (!accessToken) {
    redirect("/login");
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API}/votos`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify({
        usuario_id: user?.id,
        obra_id: esculturaId, // Agregamos el ID de la escultura
        estrellas: rating,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el voto");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
