import { getEsculturas } from './action';
import type { Escultura } from '@/types';
import SculptureList from './sculptureList';

export default async function Home() {
  const esculturas: Escultura[] = await getEsculturas();
  return <SculptureList esculturasInicio={esculturas} />;
}
