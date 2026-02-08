import { Download, Package, RefreshCw, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog'
import { Button } from '@/shared/ui/button'
import { Progress } from '@/shared/ui/progress'
import { ScrollArea } from '@/shared/ui/scroll-area'

import { dismissUpdate, downloadAndInstallUpdate } from '../api/updaterApi'
import {
  selectDownloadProgress,
  selectIsDialogOpen,
  selectUpdateInfo,
  selectUpdaterError,
  selectUpdaterStatus,
} from '../model/updaterSlice'

/**
 * Update notification dialog component.
 * Shows when an update is available and handles download/install.
 */
export function UpdateNotification() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectUpdaterStatus)
  const updateInfo = useAppSelector(selectUpdateInfo)
  const progress = useAppSelector(selectDownloadProgress)
  const error = useAppSelector(selectUpdaterError)
  const isOpen = useAppSelector(selectIsDialogOpen)

  const isDownloading = status === 'downloading'
  const isInstalling = status === 'installing'
  const isProcessing = isDownloading || isInstalling

  const handleUpdate = () => {
    void downloadAndInstallUpdate(dispatch)
  }

  const handleDismiss = () => {
    dismissUpdate(dispatch)
  }

  const handleRetry = () => {
    // Dismiss current error dialog
    dismissUpdate(dispatch)
    // Note: Update check will be automatically retried by UpdaterProvider
  }

  if (status === 'error' && error) {
    return (
      <AlertDialog open={isOpen} onOpenChange={() => handleDismiss()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>アップデートエラー</AlertDialogTitle>
            <AlertDialogDescription>{error.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDismiss}>
              閉じる
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleRetry}>
              <RefreshCw className="mr-2 h-4 w-4" />
              再試行
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  if (!updateInfo) {
    return null
  }

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={() => !isProcessing && handleDismiss()}
    >
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <AlertDialogTitle className="text-xl">
                アップデートが利用可能です
              </AlertDialogTitle>
              <div className="mt-1 flex items-center gap-2 text-sm">
                <span className="font-semibold text-primary">
                  v{updateInfo.version}
                </span>
                <span className="text-muted-foreground">→</span>
                <span className="text-muted-foreground">
                  現在: v{updateInfo.currentVersion}
                </span>
              </div>
            </div>
          </div>
          <AlertDialogDescription asChild>
            <div className="mt-4">
              {updateInfo.body ? (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">
                    リリースノート
                  </p>
                  <ScrollArea className="h-64 w-full rounded-md border bg-muted/50 p-4">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-lg font-semibold">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-base font-semibold">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-sm font-semibold">
                              {children}
                            </h3>
                          ),
                          ul: ({ children }) => (
                            <ul className="ml-4 list-disc">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="ml-4 list-decimal">{children}</ol>
                          ),
                          li: ({ children }) => (
                            <li className="my-1">{children}</li>
                          ),
                          p: ({ children }) => (
                            <p className="my-2 leading-relaxed">{children}</p>
                          ),
                          code: ({ children }) => (
                            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                              {children}
                            </code>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              className="text-primary underline underline-offset-4"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {updateInfo.body || ''}
                      </ReactMarkdown>
                    </div>
                  </ScrollArea>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  リリースノートはありません
                </p>
              )}
              {isDownloading && progress && (
                <div className="space-y-2 pt-2">
                  <Progress value={progress.percent} />
                  <p className="text-center text-xs text-muted-foreground">
                    ダウンロード中... {progress.percent}%
                  </p>
                </div>
              )}
              {isInstalling && (
                <div className="flex items-center justify-center gap-2 pt-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                  <p className="text-center text-sm">インストール中...</p>
                </div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel
            onClick={handleDismiss}
            disabled={isProcessing}
            className="flex-1 sm:flex-none"
          >
            <X className="mr-2 h-4 w-4" />
            後で
          </AlertDialogCancel>
          <Button
            onClick={handleUpdate}
            disabled={isProcessing}
            className="flex-1 sm:flex-none"
          >
            <Download className="mr-2 h-4 w-4" />
            {isProcessing ? '処理中...' : '今すぐアップデート'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
