// Este archivo es un Server Component por defecto
import { getEsculturas } from './action';
import type { Escultura } from '@/types';
import ClientPage from './ClientPage';

export default async function Page() {
  const esculturas: Escultura[] = await getEsculturas();

  return <ClientPage esculturasInicio={esculturas} />;
}