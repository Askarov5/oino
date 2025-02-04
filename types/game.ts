export interface Game {
  id: string
  title: string
  sport: string
  datetime: Date
  location: {
    address: string
    coordinates: [number, number]
  }
  players: {
    current: number
    max: number
    waitingList: number
    list: Player[]
  }
  status: "open" | "private" | "full"
  skillLevel: "beginner" | "intermediate" | "advanced"
  rules: {
    format: string
    equipment: string[]
    policies: string
  }
  organizer: {
    id: string
    name: string
    verified: boolean
    rating: number
    responseRate: string
    responsetime: string
    hostedGames: Game[]
  }
}

export interface Player {
  id: string
  name: string
  skillLevel: "beginner" | "intermediate" | "advanced"
  gamesPlayed: number
  avatar: string
}

export type JoinStatus = "not_joined" | "pending" | "approved" | "denied"

