"use server";
import { AutorPaginatedResponse } from "@/types";

export const getAutores = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/autores`;
    const response = await fetch(url);
    const data = (await response.json()) as AutorPaginatedResponse;
    return data;

  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
};

// export const createAutor = async (autor: Autor) => {
//   try {
//     const url = `${process.env.NEXT_PUBLIC_API}/autores`;
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(autor),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error: unknown) {
//     console.error(error);
//     throw new Error(`Error: ${error}`);
//   }
// };

export const updateAutor = async (id: string, autor: Autor) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/autores/${id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(autor),
    });
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
};

export const deleteAutor = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/autores/${id}`;
    await fetch(url, {
      method: 'DELETE',
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
};