import { Button } from '@/shared/ui/button'
import { ScrollArea } from '@/shared/ui/scroll-area'
import { ThemeToggle } from '@/shared/ui/ThemeToggle'
import { Settings } from 'lucide-react'
import { Link, Outlet } from 'react-router'

/**
 * アプリケーションシェル。
 * ヘッダー（アプリ名 + テーマトグル）とメインコンテンツエリアを構成する。
 * コンテンツエリアのみがスクロール可能で、ヘッダーは固定される。
 */
export function AppLayout() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b bg-background px-6 py-3">
        <h1 className="text-lg font-bold tracking-tight">
          <Link to="/">App</Link>
        </h1>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </header>
      <ScrollArea className="flex-1">
        <main className="px-6 py-6">
          <Outlet />
        </main>
      </ScrollArea>
    </div>
  )
}
