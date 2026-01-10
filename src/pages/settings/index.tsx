import { useNavigate } from 'react-router'

import { useTheme } from '@/app/providers/ThemeProvider'
import { useGetAppInfoQuery } from '@/features/appInfo/api/appInfoApi'
import { CounterCard } from '@/features/counter/ui/CounterCard'
import { AnimatedGradientText } from '@/shared/ui/animated-gradient-text'
import { Button } from '@/shared/ui/button'
import { ThemeToggle } from '@/shared/ui/ThemeToggle'

export function SettingsPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetAppInfoQuery()
  const { theme } = useTheme()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="text-3xl">Tauri 2 + React Starter</div>
      <div className="text-xl">Settings Page</div>

      <div>
        <Button type="button" variant="outline" onClick={() => navigate('/')}>
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
        <table className="border border-primary/50">
          <tbody>
            <tr className="border border-primary/50">
              <th className="p-1">name</th>
              <td className="border border-primary/50 p-1">{data.name}</td>
            </tr>
            <tr className="border border-primary/50">
              <th className="p-1">version</th>
              <td className="border border-primary/50 p-1">{data.version}</td>
            </tr>
            <tr className="border border-primary/50">
              <th className="p-1">theme</th>
              <td className="border border-primary/50 p-1">{theme}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}
