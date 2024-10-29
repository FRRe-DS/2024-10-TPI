import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Ups.. hubo un error</h1>
      <p>hola</p>
      <Link href="/" className="underline text-blue-500 hover:text-blue-800">
        Volver a home{" "}
      </Link>
    </div>
  );
}
