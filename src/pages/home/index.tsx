import { useNavigate } from "react-router"

import { CounterCard } from "@/features/counter/ui/CounterCard"
import { AnimatedGradientText } from "@/shared/ui/animated-gradient-text"
import { Button } from "@/shared/ui/button"

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="text-3xl">Tauri 2 + React Starter</div>
      <div className="text-xl">Home Page</div>

      <CounterCard title="Counter (Redux shared state)" />

      <div>
        <Button type="button" onClick={() => navigate("/settings")}>
          <AnimatedGradientText speed={1.2}>Open Settings</AnimatedGradientText>
        </Button>
      </div>
    </div>
  )
}
