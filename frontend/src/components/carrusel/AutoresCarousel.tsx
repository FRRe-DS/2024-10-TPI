import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function Autorcarousel() {
  const images = [
    "https://via.assets.so/game.png",
    "https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill",
    "https://via.assets.so/album.png?id=1&q=95&w=360&h=360&fit=fill",
    "https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill",
    "https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill",
    "https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill",
  ];

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-screen-xl mx-auto"
    >
      <CarouselContent >
        {images.map((image, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
            <div className="p-1"> 
                <Card className="h-64 w-64 mx-auto"> 
                <CardContent className="flex aspect-square items-center justify-center p-0"> 
                  <img src={image} alt={`Autor ${index + 1}`} className="h-full w-full object-cover" /> 
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} 
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
