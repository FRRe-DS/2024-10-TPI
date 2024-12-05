"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface CarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: CarouselProps) {
  return (
    <div className="relative w-full h-[500px]">
      <div className="relative z-10">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            })
          ]}
          className="w-full h-full max-w-screen-xl mx-auto"
        >
          <CarouselContent className="flex items-center justify-center h-full py-14">
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className="lg:basis-1/3 flex justify-center"
              >
                <div>
                  <Card className="h-[50vh] w-[53vh] mx-auto flex flex-col items-center border-0">
                    <CardContent className="w-full h-full relative p-0">
                      <img
                        src={image}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 hover:bg-black/0 transition-all duration-300" />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}