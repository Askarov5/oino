import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { differenceInSeconds } from "date-fns"
import type { Game } from "@/types/game"
import { useState, useEffect } from "react"

interface GameStatusProps {
  game: Game
}

export default function GameStatus({ game }: GameStatusProps) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const secondsLeft = differenceInSeconds(game.datetime, new Date())
      if (secondsLeft <= 0) {
        setTimeLeft("Game has started")
        clearInterval(timer)
      } else {
        const days = Math.floor(secondsLeft / 86400)
        const hours = Math.floor((secondsLeft % 86400) / 3600)
        const minutes = Math.floor((secondsLeft % 3600) / 60)
        setTimeLeft(`Starts in ${days}d ${hours}h ${minutes}m`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [game.datetime])

  return (
    <Card>
      <CardContent className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          {game.status === "open" && <Button className="bg-green-500 hover:bg-green-600">Join Now</Button>}
          {game.status === "full" && <Badge variant="destructive">Game Full</Badge>}
          {game.status === "private" && <Button variant="outline">Request to Join</Button>}
          <span className="text-sm font-medium">{timeLeft}</span>
        </div>
        <Badge variant="outline">
          {game.players.current}/{game.players.max} players
        </Badge>
      </CardContent>
    </Card>
  )
}

