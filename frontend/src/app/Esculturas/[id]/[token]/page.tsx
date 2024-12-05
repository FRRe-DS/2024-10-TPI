"use server";
import { getEsculturaId, getVote, isValidQRToken } from "./action";
import ObraCard from "./obraCard";

export default async function EsculturaId({
  params,
}: {
  params: { token: string; id: string };
}) {
  const { token, id } = params;
  console.log(token);
  const isQRExpired = await isValidQRToken(token);

  if (isQRExpired) return <h1>El QR expiro</h1>;

  const escultura = await getEsculturaId(id);
  const vote = await getVote(escultura.id);
  return <ObraCard escultura={escultura} vote={vote} />;
}
