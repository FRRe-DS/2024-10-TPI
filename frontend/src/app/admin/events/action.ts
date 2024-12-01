"use server";
import { Eventos } from "@/types";

export const getEventos = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API}/eventos`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = (await response.json()) as Eventos[];
    return data;
  } catch (error: unknown) {
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
    const data = (await response.json()) as Eventos;
    return data;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
};