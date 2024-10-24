import Image from "next/image";

export default function Page({ params }: { params: { id: string } }) {
  const myImages = [
    "/static/images/image4.webp",
    "/static/images/image5.webp",
    "/static/images/escultura9.jpg",
  ];
  return (
    <section className="py-4">
      <h1 className="font-bold text-xl mx-auto w-fit">Edición N°{params.id}</h1>
    </section>
  );
}
