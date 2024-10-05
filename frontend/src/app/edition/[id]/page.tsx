"use client";
import { useState } from "react";
import "./styles.css";
import Image from "next/image";

export default function Page({ params }: { params: { id: string } }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const myImages = [
    "/static/images/image4.webp",
    "/static/images/image5.webp",
    "/static/images/escultura9.jpg",
  ];
  return (
    <>
      <button onClick={() => setIsAnimating(!isAnimating)}>
        click to animate
      </button>
      <h1 className="font-bold text-xl mx-auto w-fit">Edición N°{params.id}</h1>
      <div className="pattern">
        <div className={`face face1 ${isAnimating ? "animated" : ""}`}></div>
        <div className={`face face2 ${isAnimating ? "animated" : ""}`}></div>
        <Image
          src="/static/images/image4.webp"
          width={500}
          height={500}
          alt="image"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 translate-y-1/3 myimage"
        />
      </div>
    </>
  );
}
