"use client"

import { useState, useEffect } from "react"
import { format, isToday } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Clock, MapPin } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Game {
  id: string
  sport: string
  title: string
  date: Date
  time: string
  location: string
  availableSpots: number
}

// Mock data - replace with API call in production
const mockGames: Game[] = [
  {
    id: "1",
    sport: "Basketball",
    title: "Pickup Basketball Game",
    date: new Date(),
    time: "18:00",
    location: "Central Park Court",
    availableSpots: 2,
  },
  {
    id: "2",
    sport: "Soccer",
    title: "Amateur Soccer Match",
    date: new Date(),
    time: "17:30",
    location: "Riverside Fields",
    availableSpots: 4,
  },
  {
    id: "3",
    sport: "Tennis",
    title: "Doubles Tennis Tournament",
    date: new Date(),
    time: "10:00",
    location: "City Tennis Club",
    availableSpots: 8,
  },
  {
    id: "4",
    sport: "Basketball",
    title: "3v3 Street Ball",
    date: new Date(),
    time: "20:00",
    location: "Downtown Courts",
    availableSpots: 3,
  },
]

export default function TodayGames() {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulating API call
    const fetchGames = async () => {
      try {
        // In a real application, you would fetch data from an API here
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
        const todayGames = mockGames.filter((game) => isToday(game.date))
        setGames(todayGames)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to fetch games. Please try again later.")
        setIsLoading(false)
      }
    }

    fetchGames()
  }, [])

  const sportsList = Array.from(new Set(games.map((game) => game.sport)))

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Today's Games</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (games.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Today's Games</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Games Today</AlertTitle>
            <AlertDescription>There are no games scheduled for today. Check back tomorrow!</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Today's Games - {format(new Date(), "MMMM d, yyyy")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={sportsList[0]} className="w-full">
          <TabsList className="mb-4">
            {sportsList.map((sport) => (
              <TabsTrigger key={sport} value={sport}>
                {sport}
              </TabsTrigger>
            ))}
          </TabsList>
          {sportsList.map((sport) => (
            <TabsContent key={sport} value={sport}>
              <div className="space-y-4">
                {games
                  .filter((game) => game.sport === sport)
                  .map((game) => (
                    <Card key={game.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{game.title}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="w-4 h-4 mr-1" />
                              {game.time}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {game.location}
                            </div>
                          </div>
                          <Badge variant={game.availableSpots > 0 ? "secondary" : "destructive"}>
                            {game.availableSpots > 0 ? `${game.availableSpots} spots left` : "Full"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

