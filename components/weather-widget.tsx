"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, Snowflake } from "lucide-react"

interface WeatherWidgetProps {
  coordinates: [number, number]
}

interface WeatherData {
  temperature: number
  condition: "sunny" | "cloudy" | "rainy" | "snowy"
}

export default function WeatherWidget({ coordinates }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    // Simulated weather API call
    const fetchWeather = async () => {
      // In a real application, you would make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setWeather({
        temperature: Math.floor(Math.random() * 30) + 10, // Random temperature between 10 and 40
        condition: ["sunny", "cloudy", "rainy", "snowy"][Math.floor(Math.random() * 4)] as WeatherData["condition"],
      })
    }

    fetchWeather()
  }, [])

  if (!weather) {
    return null
  }

  const getWeatherIcon = (condition: WeatherData["condition"]) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-500" />
      case "snowy":
        return <Snowflake className="h-6 w-6 text-blue-300" />
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getWeatherIcon(weather.condition)}
            <span className="ml-2 capitalize">{weather.condition}</span>
          </div>
          <span className="text-2xl font-bold">{weather.temperature}°C</span>
        </div>
      </CardContent>
    </Card>
  )
}

