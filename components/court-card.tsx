import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin } from "lucide-react"
import type { Court } from "@/types/court"

interface CourtCardProps {
  court: Court
}

export default function CourtCard({ court }: CourtCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image src={court?.images?.[0] || "/placeholder.svg"} alt={court.name} layout="fill" objectFit="cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{court.name}</h3>
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">4.5 (123 reviews)</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {court.address}
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {court.sportTypes?.map((sport) => (
            <Badge key={sport} variant="secondary">
              {sport}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 dark:bg-gray-800">
        <Link href={`/courts/${court.id}`} passHref>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

