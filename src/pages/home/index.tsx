import { useNavigate } from "react-router"

import { CounterCard } from "@/features/counter/ui/CounterCard"
import { AnimatedGradientText } from "@/shared/ui/animated-gradient-text"
import { Button } from "@/shared/ui/button"

export function HomePage() {
  const navigate = useNavigate()

  return (
    <main>
      <h1>Tauri 2 + React Starter</h1>

      <p>Home から Settings に遷移し、テーマ切り替えの動作確認ができます。</p>

      <section>
        <Button type="button" onClick={() => navigate("/settings")}>
          <AnimatedGradientText speed={1.2}>Open Settings</AnimatedGradientText>
        </Button>
      </section>

      <CounterCard title="Counter (Redux shared state)" />

      <section>
        <h2>Next steps</h2>
        <ul>
          <li>
            画面追加: src/pages 配下にページを追加し、src/app/routes/routes.tsx
            にルートを登録
          </li>
          <li>機能追加: src/features 配下に api/model/ui をまとめる</li>
          <li>
            共通部品: src/shared/ui, src/shared/lib に集約（相対 import ではなく
            alias を推奨）
          </li>
          <li>
            Tauri コマンド: src-tauri/src/lib.rs に command を追加し、invoke
            経由で呼び出す
          </li>
        </ul>
      </section>
    </main>
  )
}
