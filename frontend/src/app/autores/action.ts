"use server";
import { Autor } from "@/types";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.message || response.statusText}`);
  }
  return response.json();
};

export const getAutores = async (pageNumber = 1) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/autores?page=${pageNumber}`;
    const response = await fetch(url);
    const data = (await handleResponse(response)).items as Autor[];
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetching authors: ${error}`);
  }
};

export const createAutor = async (autor: Autor) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/autores`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(autor),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(error);
    throw new Error(`Error creating author: ${error}`);
  }
};

export const updateAutor = async (id: number, autor: Autor) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/autores/${id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(autor),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(error);
    throw new Error(`Error updating author: ${error}`);
  }
};

export const deleteAutor = async (id: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/autores/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    await handleResponse(response);
  } catch (error) {
    console.error(error);
    throw new Error(`Error deleting author: ${error}`);
  }
};