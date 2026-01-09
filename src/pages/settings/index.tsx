import { useGetAppInfoQuery } from '@/features/appInfo/api/appInfoApi'

export function SettingsPage() {
  const { data, isLoading, isError } = useGetAppInfoQuery()

  return (
    <main>
      <h1>Settings</h1>

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
