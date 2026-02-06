import { useTheme } from '@/app/providers/ThemeProvider'
import { useGetAppInfoQuery } from '@/features/appInfo/api/appInfoApi'
import { CounterCard } from '@/features/counter/ui/CounterCard'

/**
 * Settings page component.
 *
 * Displays application information (name, version) retrieved from Tauri backend,
 * current theme state, and a counter example component.
 *
 * Features:
 * - Fetches app metadata via RTK Query (name, version from Tauri)
 * - Displays current active theme from ThemeProvider context
 * - Shows loading and error states for app info
 * - Includes counter card for demonstration purposes
 *
 * @returns A settings page component with app information table
 */
export function SettingsPage() {
  const { data, isLoading, isError } = useGetAppInfoQuery()
  const { theme } = useTheme()

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-3xl">Tauri 2 + React Starter</div>

      <CounterCard title="Counter" />

      {data ? (
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
      ) : isLoading ? (
        <p>now loading...</p>
      ) : isError ? (
        <p>failed to load</p>
      ) : null}
    </div>
  )
}
