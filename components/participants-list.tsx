import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import type { Game } from "@/types/game"

interface ParticipantsListProps {
  game: Game
}

export default function ParticipantsList({ game }: ParticipantsListProps) {
  const skillLevels = ["beginner", "intermediate", "advanced"]
  const totalPlayers = game.players.list.length

  const skillLevelCounts = game.players.list.reduce(
    (acc, player) => {
      acc[player.skillLevel] = (acc[player.skillLevel] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-semibold">
        Players ({game.players.current}/{game.players.max})
      </h3>
      <div className="flex flex-wrap gap-2">
        {game.players.list.map((player) => (
          <HoverCard key={player.id}>
            <HoverCardTrigger>
              <Avatar>
                <AvatarImage src={player.avatar} />
                <AvatarFallback>{player.name[0]}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src={player.avatar} />
                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{player.name}</h4>
                  <p className="text-sm">Skill Level: {player.skillLevel}</p>
                  <p className="text-sm">Games Played: {player.gamesPlayed}</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Skill Level Distribution</h4>
        {skillLevels.map((level) => (
          <div key={level} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="capitalize">{level}</span>
              <span>{(((skillLevelCounts[level] || 0) / totalPlayers) * 100).toFixed(1)}%</span>
            </div>
            <Progress value={((skillLevelCounts[level] || 0) / totalPlayers) * 100} className="h-2" />
          </div>
        ))}
      </div>
      {game.players.waitingList > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {game.players.waitingList} {game.players.waitingList === 1 ? "person" : "people"} on the waiting list
        </p>
      )}
    </div>
  )
}

