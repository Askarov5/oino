"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import GameHeader from "@/components/game-header"
import GameStatus from "@/components/game-status"
import GameDetails from "@/components/game-details"
import OrganizerProfile from "@/components/organizer-profile"
import JoinGame from "@/components/join-game"
import ParticipantsList from "@/components/participants-list"
import { Card } from "@/components/ui/card"
import type { Game, JoinStatus } from "@/types/game"
import { Skeleton } from "@/components/ui/skeleton"
  import { getGameById } from "@/lib/api"
import { get } from "http"

interface GameDetailsPageProps {
  game: Game
}


export default function GameDetailsPage({ game: initialGame }: GameDetailsPageProps) {
  const router = useRouter()
  const [joinStatus, setJoinStatus] = useState<JoinStatus>("not_joined")



  const { data: game, error } = useSWR(initialGame.id, getGameById, { fallbackData: initialGame })

  if (error) return <div className="text-center py-8">Failed to load game details. Please try again later.</div>

  if (!game) return <Skeleton className="h-[400px] w-full" />

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GameHeader game={game} />
          <GameStatus game={game} />
          <GameDetails game={game} />
          <Card>
            <ParticipantsList game={game} />
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-8">
          <JoinGame game={game} joinStatus={joinStatus} setJoinStatus={setJoinStatus} />
          <OrganizerProfile organizer={game.organizer} />
        </div>
      </div>
    </div>
  )
}

