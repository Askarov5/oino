import HeroSection from "@/components/hero-section"
import TrendingCourts from "@/components/trending-courts"
import TodayGames from "@/components/today-games"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <TrendingCourts />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <TodayGames />
      </div>
    </div>
  )
}
