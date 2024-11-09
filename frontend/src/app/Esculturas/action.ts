// acá va el fetch de las esculturas

"use server";
import { Escultura } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const getEsculturas = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API}/obras`;
      const response = await fetch(url);
    const data = (await response.json()).items as Escultura[];
    return data;
  } catch (error: unknown) {
    console.error(error);
      throw new Error(`Error: ${error}`);
    }
};

export const postVote = async (esculturaId: number, voteType: "positivo") => {
    
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token");

    if (!accessToken) {
        // redirigir a login
        redirect("/login");
    }

    const url = `${process.env.NEXT_PUBLIC_API}/obras/${esculturaId}/votes`;
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ voteType }),
  });
};
