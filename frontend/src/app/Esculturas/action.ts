// acá va el fetch de las esculturas
"use server"; 
import { Escultura } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getEsculturas = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API}/obras`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const jsonResponse = await response.json();
      const data = jsonResponse.items as Escultura[];
      data.forEach(escultura => {
        if (!escultura.imagenes) {
          console.warn(`La escultura ${escultura.id} no tiene imágenes`);
        }
      });

      return data;
    } catch (error: unknown) {
      throw new Error(`Error al obtener esculturas: ${error}`);
    }
};


export const getVote = async (esculturaId: number) => {
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
      rating: data.estrellas
    };
  } catch (error) {
    return null;
  }
};


export const postVote = async (esculturaId: number, rating: number) => {
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
              "Authorization": `Bearer ${accessToken.value}`
          },
          body: JSON.stringify({ 
              usuario_id: user?.id,
              obra_id: esculturaId,  // Agregamos el ID de la escultura
              estrellas: rating
          }),
      });

      if (!response.ok) {
          throw new Error('Error al enviar el voto');
      }

      return await response.json();
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
};