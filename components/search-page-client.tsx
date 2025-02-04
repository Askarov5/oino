"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import useSWR from "swr"
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SearchFilters from "@/components/search-filters"
import GamesList from "@/components/games-list"
import CourtsList from "@/components/courts-list"
import ErrorState from "@/components/error-state"
import type { Game, Court, Filters } from "@/types/search"

const searchSchema = z.object({
  city: z.string().min(1),
  dateRange: z
    .array(z.string())
    .length(2)
    .transform((arr) => arr.map((date) => new Date(date))),
  sportTypes: z.array(z.enum(["basketball", "tennis", "soccer"])),
  priceRange: z.tuple([z.number(), z.number()]).optional(),
})

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function SearchPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<"games" | "courts">("games")
  const [filters, setFilters] = useState<Filters>({
    city: "",
    dateRange: [new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)],
    sportTypes: [],
    priceRange: undefined,
  })

  useEffect(() => {
    const parsedFilters = searchSchema.safeParse({
      city: searchParams.get("city") || "",
      dateRange: [searchParams.get("startDate"), searchParams.get("endDate")],
      sportTypes: searchParams.getAll("sportTypes"),
      priceRange: searchParams.get("priceRange")?.split(",").map(Number),
    })

    if (parsedFilters.success) {
      setFilters({
        ...parsedFilters.data,
        dateRange: parsedFilters.data.dateRange as [Date, Date],
      })
    }
  }, [searchParams])

  const { data: gamesData, error: gamesError } = useSWR<Game[]>(
    `/api/games?${new URLSearchParams(filters as any).toString()}`,
    fetcher,
  )

  const { data: courtsData, error: courtsError } = useSWR<Court[]>(
    `/api/courts?${new URLSearchParams(filters as any).toString()}`,
    fetcher,
  )

  const handleFilterChange = (newFilters: Filters) => {
    const searchParams = new URLSearchParams()
    searchParams.set("city", newFilters.city)
    searchParams.set("startDate", newFilters.dateRange[0].toISOString())
    searchParams.set("endDate", newFilters.dateRange[1].toISOString())
    newFilters.sportTypes.forEach((sport) => searchParams.append("sportTypes", sport))
    if (newFilters.priceRange) {
      searchParams.set("priceRange", newFilters.priceRange.join(","))
    }
    router.push(`/search?${searchParams.toString()}`)
  }

  if (gamesError || courtsError) {
    return <ErrorState onRetry={() => router.refresh()} />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Search Results</h1>
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
            </div>
          </div>
          <div className="mt-8 lg:mt-0 lg:col-span-3">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "games" | "courts")}>
              <TabsList className="mb-8">
                <TabsTrigger value="games">Games</TabsTrigger>
                <TabsTrigger value="courts">Courts</TabsTrigger>
              </TabsList>
              <TabsContent value="games">
                <GamesList games={gamesData} />
              </TabsContent>
              <TabsContent value="courts">
                <CourtsList courts={courtsData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

