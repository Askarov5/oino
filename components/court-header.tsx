"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { Court } from "@/types/court"

interface CourtHeaderProps {
  court: Court
}

export default function CourtHeader({ court }: CourtHeaderProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <header className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {court.images.map((image, index) => (
            <CarouselItem key={index}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative h-[400px] w-full cursor-pointer">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${court.name} - Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-b-lg"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${court.name} - Image ${index + 1}`}
                    width={1200}
                    height={800}
                    className="rounded-lg"
                  />
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{court.name}</h1>
            <div className="flex items-center space-x-2">
              {court.sportTypes.map((sport) => (
                <Badge key={sport} variant="secondary">
                  {sport}
                </Badge>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 hover:bg-white/20"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
            <span className="sr-only">Favorite</span>
          </Button>
        </div>
        <div className="flex items-center mt-4 text-white">
          <MapPin className="h-5 w-5 mr-2" />
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${court.address} ${court.name}`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {court.address}
          </Link>
        </div>
        <div className="flex items-center mt-2 text-white">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="font-bold mr-2">4.5</span>
          <span>(123 reviews)</span>
        </div>
      </div>
    </header>
  )
}

