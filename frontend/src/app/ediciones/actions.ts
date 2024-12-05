"use server";
import { Autor, AutorPaginatedResponse, EsculturaPaginatedResponse } from "@/types";

export async function getEventoByEdicion(edicion: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/eventos/${edicion}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el evento:", error);
    throw error;
  }
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

  const handleResponse = async (response: Response) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || response.statusText}`);
    }
    return response.json();
  };
  
  export const getRandomAutores = async (pageNumber = 1) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API}/autores`;
      const response = await fetch(url);
      const data = (await handleResponse(response)) as AutorPaginatedResponse;
      const selectedAutores = data.items.sort(() => Math.random() - 0.5).slice(0, 3);
      console.log(selectedAutores);
      return selectedAutores;
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching authors: ${error}`);
    }
  };
  