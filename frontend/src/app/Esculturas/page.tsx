// Este archivo es un Server Component por defecto
import { getEsculturas } from './action';
import type { Escultura } from '@/types';
import type { EsculturaPaginatedResponse } from '@/types';
import ClientPage from './ClientPage';

export default async function Page() {
  const esculturasR: EsculturaPaginatedResponse = await getEsculturas();
  const esculturas: Escultura[] = esculturasR.items;
  return <ClientPage esculturasInicio={esculturas} />;
}