import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface GameCardSkeletonProps {
  count?: number
}

export default function GameCardSkeleton({ count = 1 }: GameCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="flex flex-col">
          <CardContent className="flex-grow p-6 space-y-4">
            <div className="flex justify-between items-start">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
          <CardFooter className="p-6">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  )
}

