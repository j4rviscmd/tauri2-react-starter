import { useTheme } from '@/app/providers/ThemeProvider'
import { useGetAppInfoQuery } from '@/features/appInfo/api/appInfoApi'
import { CounterCard } from '@/features/counter/ui/CounterCard'

/**
 * Settings page component.
 *
 * Displays application information (name, version) and counter example.
 */
export function SettingsPage() {
  const { data, isLoading, isError } = useGetAppInfoQuery()
  const { theme } = useTheme()

  return (
    <div className="flex flex-col items-center justify-center  gap-4">
      <div className="text-3xl">Tauri 2 + React Starter</div>

      <CounterCard title="Counter" />

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
