import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  onRetry: () => void
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-red-100 dark:bg-red-900 rounded-lg">
      <AlertTriangle className="w-16 h-16 text-red-500 dark:text-red-400 mb-4" />
      <p className="text-lg text-red-700 dark:text-red-300 mb-4">An error occurred while fetching data</p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  )
}

