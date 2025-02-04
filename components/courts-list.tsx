import type { Court } from "@/types/search"
import CourtCard from "@/components/court-card"
import EmptyState from "@/components/empty-state"
import { Skeleton } from "@/components/ui/skeleton"

interface CourtsListProps {
  courts: Court[] | undefined
}

export default function CourtsList({ courts }: CourtsListProps) {
  if (!courts) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] w-full" />
        ))}
      </div>
    )
  }

  if (courts.length === 0) {
    return <EmptyState message="No courts found" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courts.map((court) => (
        <CourtCard key={court.id} court={court} />
      ))}
    </div>
  )
}

