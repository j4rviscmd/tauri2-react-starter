import { cn } from '@/shared/lib/utils'

/**
 * Skeleton placeholder for loading content.
 *
 * Renders an animated placeholder to represent content that is loading.
 * Use in lists, cards, and forms to improve perceived performance.
 *
 * @example
 * ```tsx
 * // Text placeholder
 * <Skeleton className="h-4 w-[250px]" />
 *
 * // Avatar placeholder
 * <Skeleton className="h-12 w-12 rounded-full" />
 *
 * // Card placeholder
 * <div className="space-y-2">
 *   <Skeleton className="h-4 w-full" />
 *   <Skeleton className="h-4 w-2/3" />
 * </div>
 * ```
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...props}
    />
  )
}

export { Skeleton }
