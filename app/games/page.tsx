"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GameFilters from "@/components/game-filters"
import GameCard from "@/components/game-card"
import type { Game } from "@/types/game"

// Mock data for games
const mockGames: Game[] = [
  {
    id: "1",
    title: "Friendly Basketball Match",
    sport: "basketball",
    datetime: new Date("2023-06-15T18:00:00"),
    location: {
      address: "123 Main St, New York, NY",
      coordinates: [40.7128, -74.006],
    },
    players: {
      current: 8,
      max: 10,
      waitingList: 2,
      list: [],
    },
    status: "open",
    skillLevel: "intermediate",
    rules: {
      format: "5v5 full court",
      equipment: ["basketball"],
      policies: "Fair play, respect all players",
    },
    organizer: {
      id: "org1",
      name: "John Doe",
      verified: true,
      rating: 4.5,
      responseRate: "95%",
      responsetime: "< 1 hour",
      hostedGames: [],
    },
  },
  // Add more mock games here...
]

export default function GamesPage() {
  const [filteredGames, setFilteredGames] = useState<Game[]>(mockGames)

  const handleFilterChange = (filters: any) => {
    const filtered = mockGames.filter((game) => {
      if (filters.sport && game.sport !== filters.sport) return false
      if (filters.skillLevel && game.skillLevel !== filters.skillLevel) return false
      if (filters.date && !isSameDay(game.datetime, filters.date)) return false
      if (filters.location && !game.location.address.toLowerCase().includes(filters.location.toLowerCase()))
        return false
      return true
    })
    setFilteredGames(filtered)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Find Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <GameFilters onFilterChange={handleFilterChange} />
          </CardContent>
        </Card>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          {filteredGames.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No games found matching your filters.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

