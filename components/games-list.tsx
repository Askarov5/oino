import type { Game } from "@/types/search"
import GameCard from "@/components/game-card"
import EmptyState from "@/components/empty-state"
import { Skeleton } from "@/components/ui/skeleton"

interface GamesListProps {
  games: Game[] | undefined
}

export default function GamesList({ games }: GamesListProps) {
  if (!games) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] w-full" />
        ))}
      </div>
    )
  }

  if (games.length === 0) {
    return <EmptyState message="No games found" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  )
}

