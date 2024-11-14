"use server";
import { Eventos } from "@/types";

// export const getAutores = async (pageNumber = 1) => {
//     try {
//       const url = `${process.env.NEXT_PUBLIC_API}/autores?page=${pageNumber}`;
//       const response = await fetch(url);
//       const data = (await response.json()).items as Autor[];
//       return data;
//     } catch (error: unknown) {
//       console.error(error);
//       throw new Error(`Error: ${error}`);
//     }
//   };

export const getEventos = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API}/eventos`;
      const response = await fetch(url);
      const data = (await response.json()) as Eventos[];
      return data;
    } catch (error: unknown) {
      console.error(error);
      throw new Error(`Error: ${error}`);
    }
  };