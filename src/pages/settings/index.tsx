import { useNavigate } from "react-router"

import { useGetAppInfoQuery } from "@/features/appInfo/api/appInfoApi"
import { AnimatedGradientText } from "@/shared/ui/animated-gradient-text"
import { Button } from "@/shared/ui/button"
import { ThemeToggle } from "@/shared/ui/ThemeToggle"

export function SettingsPage() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetAppInfoQuery()

  return (
    <main>
      <h1>Settings</h1>

      <section>
        <Button type="button" variant="outline" onClick={() => navigate("/")}>
          <AnimatedGradientText speed={1.2}>Back to Home</AnimatedGradientText>
        </Button>
      </section>

      <section>
        <h2>Theme</h2>
        <p>magic-ui っぽい CTA ボタンでテーマを切り替えできます。</p>
        <ThemeToggle />
      </section>

      {isLoading && <p>読み込み中...</p>}
      {isError && <p>読み込みに失敗しました</p>}

      {data && (
        <dl>
          <dt>name</dt>
          <dd>{data.name}</dd>
          <dt>version</dt>
          <dd>{data.version}</dd>
        </dl>
      )}
    </main>
  )
}
