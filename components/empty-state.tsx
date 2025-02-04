import { FileQuestion } from "lucide-react"

interface EmptyStateProps {
  message: string
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <FileQuestion className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
      <p className="text-lg text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  )
}

