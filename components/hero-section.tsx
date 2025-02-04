"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { ShoppingBasket, Turtle, Club } from "lucide-react"

const formSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
  sportType: z.enum(["basketball", "tennis", "soccer"]),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  priceRange: z.array(z.number()).length(2),
})

export default function HeroSection() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: undefined,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      sportType: "basketball",
      dateRange: { from: new Date(), to: new Date() },
      priceRange: [0, 100],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Find Your Perfect Game Space
          </h1>
          <p className="mt-3 text-xl text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-2xl">
            Book courts, join games, and play your favorite sports.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city or zip code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sport Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="basketball">
                        <div className="flex items-center">
                          <ShoppingBasket className="mr-2 h-4 w-4" />
                          Basketball
                        </div>
                      </SelectItem>
                      <SelectItem value="tennis">
                        <div className="flex items-center">
                          <Turtle className="mr-2 h-4 w-4" />
                          Tennis
                        </div>
                      </SelectItem>
                      <SelectItem value="soccer">
                        <div className="flex items-center">
                          <Club className="mr-2 h-4 w-4" />
                          Soccer
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Range</FormLabel>
                  <DatePickerWithRange
                    date={dateRange}
                    setDate={(newDateRange) => {
                      setDateRange(newDateRange || { from: new Date(), to: undefined })
                      field.onChange({ from: newDateRange?.from, to: newDateRange?.to })
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priceRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Range ($/hour)</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={200}
                      step={10}
                      value={field.value}
                      onValueChange={field.onChange}
                      className="w-full"
                    />
                  </FormControl>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>${field.value[0]}</span>
                    <span>${field.value[1]}</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Search Courts
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

