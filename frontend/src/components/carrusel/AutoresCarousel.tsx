"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Autorcarousel() {
  const images = [
    "/imagen1.jpg",
    "/imagen2.jpg",
    "/imagen3.jpg",
    "/imagen4.jpg",
    "/imagen5.jpg",
  ];

// ... imports ...

return (
  <div className="relative w-full h-[500px] border-t-2 border-black">
    <div className="relative z-10">
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-full h-full max-w-screen-xl mx-auto"
      >
        <CarouselContent className="flex items-center justify-center h-full py-7"> {/* Agregado h-full */}
          {images.map((image, index) => (
            <CarouselItem key={index} className="lg:basis-1/3 flex justify-center">
              <div>
                <Card className="h-[50vh] w-[53vh] mx-auto flex flex-col items-center border-0"> 
                  <CardContent className="w-full h-full relative p-0">
                    <img
                      src={image}
                      alt={`Escultor ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 hover:bg-black/0 transition-all duration-300"/>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  </div>
);
}
