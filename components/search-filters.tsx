"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import type { Filters } from "@/types/search"

interface SearchFiltersProps {
  filters: Filters
  onFilterChange: (filters: Filters) => void
}

export default function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters)
  const [isLoading, setIsLoading] = useState(false)
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>({
    from: filters.dateRange[0],
    to: filters.dateRange[1],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSportTypeChange = (sportType: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      sportTypes: prev.sportTypes.includes(sportType)
        ? prev.sportTypes.filter((type) => type !== sportType)
        : [...prev.sportTypes, sportType],
    }))
  }

  const handleApplyFilters = () => {
    setIsLoading(true)
    onFilterChange({
      ...localFilters,
      dateRange: [dateRange.from, dateRange.to || dateRange.from],
    })
    setTimeout(() => setIsLoading(false), 1000) // Simulating API call
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
      <div>
        <Label htmlFor="city">Location</Label>
        <Input id="city" name="city" value={localFilters.city} onChange={handleInputChange} placeholder="Enter city" />
      </div>

      <div>
        <Label>Date Range</Label>
        <DatePickerWithRange
          date={dateRange}
          setDate={(newDateRange) => {
            setDateRange(
              newDateRange
                ? { from: newDateRange.from || new Date(), to: newDateRange.to }
                : { from: new Date(), to: undefined }
            )
          }}
        />
      </div>

      <div>
        <Label>Sport Types</Label>
        <div className="space-y-2">
          {["basketball", "tennis", "soccer"].map((sport) => (
            <div key={sport} className="flex items-center">
              <Checkbox
                id={sport}
                checked={localFilters.sportTypes.includes(sport)}
                onCheckedChange={() => handleSportTypeChange(sport)}
              />
              <label htmlFor={sport} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {sport.charAt(0).toUpperCase() + sport.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Price Range ($/hour)</Label>
        <Slider
          min={0}
          max={200}
          step={10}
          value={localFilters.priceRange || [0, 200]}
          onValueChange={(value) => setLocalFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))}
        />
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>${localFilters.priceRange?.[0] || 0}</span>
          <span>${localFilters.priceRange?.[1] || 200}</span>
        </div>
      </div>

      <Button onClick={handleApplyFilters} disabled={isLoading} className="w-full">
        {isLoading ? "Applying..." : "Apply Filters"}
      </Button>
    </div>
  )
}

