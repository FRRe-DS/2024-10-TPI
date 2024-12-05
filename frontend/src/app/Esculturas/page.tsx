import { getEsculturas } from "./action";
import type { Escultura, EsculturaPaginatedResponse } from "@/types";
import ClientPage from "./ClientPage";
import { getUser } from "./[id]/[time]/action";

export default async function Page() {
  const esculturasR: EsculturaPaginatedResponse = await getEsculturas();
  const esculturas: Escultura[] = esculturasR.items;
  const user = await getUser();
  return <ClientPage esculturasInicio={esculturas} usuario={user} />;
}
