import { useNavigate } from "react-router"

import { CounterCard } from "@/features/counter/ui/CounterCard"
import { useGetAppInfoQuery } from "@/features/appInfo/api/appInfoApi"
import { AnimatedGradientText } from "@/shared/ui/animated-gradient-text"
import { Button } from "@/shared/ui/button"
import { ThemeToggle } from "@/shared/ui/ThemeToggle"
import { useTheme } from "@/app/providers/ThemeProvider"

export function SettingsPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetAppInfoQuery()
  const { theme } = useTheme()

  return (
    <div className="flex min-h-screen gap-4 flex-col items-center justify-center">
      <div className="text-3xl">Tauri 2 + React Starter</div>
      <div className="text-xl">Settings Page</div>

      <div>
        <Button type="button" variant="outline" onClick={() => navigate("/")}>
          <AnimatedGradientText speed={1.2}>Back to Home</AnimatedGradientText>
        </Button>
      </div>

      <CounterCard title="Counter (Redux shared state)" />

      <div className="flex items-center gap-3">
        <h2>Theme</h2>
        <ThemeToggle />
      </div>

      {isLoading && <p>now loading...</p>}
      {isError && <p>failed to load</p>}

      {data && (
        <table className="border-primary/50 border">
          <tbody>
            <tr className="border-primary/50 border">
              <th className="p-1">name</th>
              <td className="p-1 border border-primary/50">{data.name}</td>
            </tr>
            <tr className="border-primary/50 border">
              <th className="p-1">version</th>
              <td className="p-1 border border-primary/50">{data.version}</td>
            </tr>
            <tr className="border-primary/50 border">
              <th className="p-1">theme</th>
              <td className="p-1 border border-primary/50">{theme}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}
