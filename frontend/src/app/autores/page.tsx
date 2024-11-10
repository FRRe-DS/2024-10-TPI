import { Autor } from "@/types";
import AutorList from "./AutorList";
import { getAutores } from "./action";

export default async function Home() {
  const autores: Autor[] = await getAutores();

  return <AutorList autoresInicio={autores} />;
}
