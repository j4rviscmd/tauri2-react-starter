import { Download, RefreshCw, X } from 'lucide-react'

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

import {
  checkForUpdates,
  dismissUpdate,
  downloadAndInstallUpdate,
} from '../api/updaterApi'
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
    void checkForUpdates(dispatch)
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>アップデートが利用可能です</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-2">
              <p>
                新しいバージョン <strong>{updateInfo.version}</strong> が
                利用可能です。
              </p>
              <p className="text-xs text-muted-foreground">
                現在のバージョン: {updateInfo.currentVersion}
              </p>
              {updateInfo.body && (
                <div className="mt-4 max-h-32 overflow-y-auto rounded-md bg-muted p-3 text-sm">
                  <p className="font-medium">リリースノート:</p>
                  <p className="whitespace-pre-wrap">{updateInfo.body}</p>
                </div>
              )}
              {isDownloading && progress && (
                <div className="mt-4 space-y-2">
                  <Progress value={progress.percent} />
                  <p className="text-center text-xs text-muted-foreground">
                    ダウンロード中... {progress.percent}%
                  </p>
                </div>
              )}
              {isInstalling && (
                <p className="mt-4 text-center text-sm">インストール中...</p>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDismiss} disabled={isProcessing}>
            <X className="mr-2 h-4 w-4" />
            後で
          </AlertDialogCancel>
          <Button onClick={handleUpdate} disabled={isProcessing}>
            <Download className="mr-2 h-4 w-4" />
            {isProcessing ? '処理中...' : 'アップデート'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
