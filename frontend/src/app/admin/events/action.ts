"use server";
import { Eventos } from "@/types";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.message || response.statusText}`);
  }
  return response.json();
};

export const getEventos = async (pageNumber = 1) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/eventos?page=${pageNumber}`;
    const response = await fetch(url)
    const data = (await handleResponse(response)).items as Eventos[];
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
};
export const createEvento = async (evento: Eventos) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/eventos`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evento),
    });
    const data = await handleResponse(response) as Eventos;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
};