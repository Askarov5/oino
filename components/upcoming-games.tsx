import { Suspense } from "react"
import type { Game } from "@/types/game"
import GameCard from "@/components/game-card"
import GameCardSkeleton from "@/components/game-card-skeleton"

const mockGames: Game[] = [
  {
    id: "1",
    sportType: "basketball",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    playersNeeded: 2,
    maxPlayers: 10,
    location: "Central Park, NY",
  },
  {
    id: "2",
    sportType: "tennis",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 48), // 48 hours from now
    playersNeeded: 1,
    maxPlayers: 4,
    location: "Brooklyn Courts, NY",
  },
  // Add more mock games as needed
]

export default function UpcomingGames() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Upcoming Games</h2>
        <p className="mt-3 max-w-2xl text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
          Join exciting games in your area
        </p>
        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          <Suspense fallback={<GameCardSkeleton count={3} />}>
            {mockGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Suspense>
        </div>
      </div>
    </section>
  )
}

