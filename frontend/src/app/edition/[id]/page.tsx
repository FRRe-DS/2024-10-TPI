export default function Page({ params }: { params: { id: string } }) {
  return (
    <h1 className="font-bold text-xl mx-auto w-fit">Edición N°{params.id}</h1>
  );
}
