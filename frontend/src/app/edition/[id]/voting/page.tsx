export default function Page({ params }: { params: { id: string } }) {
  return (
    <h1 className="font-bold text-xl mx-auto w-fit">
      Votación de la edición {params.id}
    </h1>
  );
}
