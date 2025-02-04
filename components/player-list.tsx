import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Game } from "@/types/game"

interface PlayerListProps {
  players: Game["players"]
}

export default function PlayerList({ players }: PlayerListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "waitinglist":
        return "bg-yellow-500"
      case "pending":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Players ({players.total}/{players.max})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {players.list.map((player) => (
              <div key={player.id} className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={`/avatars/player-${player.id}.png`} />
                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{player.name}</p>
                  <Badge variant="secondary" className={`text-xs ${getStatusColor(player.status)}`}>
                    {player.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Beginner</span>
              <span>{players.skillLevels.beginner}%</span>
            </div>
            <Progress value={players.skillLevels.beginner} className="h-2" />
            <div className="flex justify-between text-sm">
              <span>Intermediate</span>
              <span>{players.skillLevels.intermediate}%</span>
            </div>
            <Progress value={players.skillLevels.intermediate} className="h-2" />
            <div className="flex justify-between text-sm">
              <span>Advanced</span>
              <span>{players.skillLevels.advanced}%</span>
            </div>
            <Progress value={players.skillLevels.advanced} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

