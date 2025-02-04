import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { format } from "date-fns"
import type { Game } from "@/types/game"

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{game.title}</span>
          <Badge>{game.sport}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(game?.datetime ?? Date.now(), "PPP p")}
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            {game.location.address}
          </div>
          <div className="flex items-center">
            <UsersIcon className="mr-2 h-4 w-4" />
            {game.players?.current}/{game.players?.max} players
          </div>
        </div>
        <Badge variant="outline" className="mt-4">
          {game.skillLevel}
        </Badge>
      </CardContent>
      <CardFooter>
        <Link href={`/games/${game.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

