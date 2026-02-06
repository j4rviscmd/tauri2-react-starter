import { CounterCard } from '@/features/counter/ui/CounterCard'

/**
 * Home page component.
 *
 * Displays the application title and a counter example.
 */
export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="text-3xl">Tauri 2 + React Starter</div>
      <CounterCard title="Counter" />
    </div>
  )
}
