import { Suspense } from "react"
import { notFound } from "next/navigation"
import GameDetailsPage from "@/components/game-details-page"
import { Skeleton } from "@/components/ui/skeleton"
import { getGameById } from "@/lib/api"

export default async function GamePage({ params }: { params: { id: string } }) {
  const game = await getGameById(params.id)

  if (!game) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <GameDetailsPage game={game} />
      </Suspense>
    </div>
  )
}

