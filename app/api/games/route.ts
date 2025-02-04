import { NextResponse } from "next/server"
import type { Game } from "@/types/search"

const mockGames: Game[] = [
  {
    id: "1",
    sportType: "basketball",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    location: "Central Park, NY",
    currentPlayers: 6,
    maxPlayers: 10,
    organizer: {
      name: "John Doe",
      verified: true,
    },
  },
  {
    id: "2",
    sportType: "tennis",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 48), // 48 hours from now
    location: "Brooklyn Courts, NY",
    currentPlayers: 2,
    maxPlayers: 4,
    organizer: {
      name: "Jane Smith",
      verified: false,
    },
  },
  // Add more mock games as needed
]

export async function GET(request: Request) {
  // In a real application, you would use the URL parameters to filter the games
  // For this example, we'll just return all mock games
  return NextResponse.json(mockGames)
}

