import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface CourtCardSkeletonProps {
  count?: number
}

export default function CourtCardSkeleton({ count = 1 }: CourtCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="flex flex-col">
          <CardContent className="p-0">
            <Skeleton className="h-48 w-full" />
            <div className="p-6 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 dark:bg-gray-800 p-6 mt-auto">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  )
}

