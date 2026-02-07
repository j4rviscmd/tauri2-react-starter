import { Slot } from '@radix-ui/react-slot'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

/**
 * Breadcrumb root component - navigation container for hierarchical navigation.
 *
 * Provides accessible navigation structure for showing the user's location
 * within a site hierarchy.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem><BreadcrumbPage>Current Page</BreadcrumbPage></BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = 'Breadcrumb'

/**
 * BreadcrumbList component - ordered list container for breadcrumb items.
 *
 * Renders the breadcrumb items in a horizontal flex layout with responsive gaps.
 */
const BreadcrumbList = React.forwardRef<
  HTMLOlistElement,
  React.ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
      className,
    )}
    {...props}
  />
))
BreadcrumbList.displayName = 'BreadcrumbList'

/**
 * BreadcrumbItem component - list item for a single breadcrumb entry.
 *
 * Wraps breadcrumb links, pages, and separators with proper flex alignment.
 */
const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
))
BreadcrumbItem.displayName = 'BreadcrumbItem'

/**
 * BreadcrumbLink component - clickable navigation link for a breadcrumb level.
 *
 * Can render as an anchor tag or as a custom component via asChild (useful
 * for React Router Link integration).
 *
 * @example
 * ```tsx
 * <BreadcrumbLink href="/parent">Parent</BreadcrumbLink>
 *
 * // With React Router
 * <BreadcrumbLink asChild>
 *   <Link to="/parent">Parent</Link>
 * </BreadcrumbLink>
 * ```
 */
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      ref={ref}
      className={cn('transition-colors hover:text-foreground', className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = 'BreadcrumbLink'

/**
 * BreadcrumbPage component - non-interactive label for the current page.
 *
 * Used for the last item in the breadcrumb trail to indicate the current page.
 * Rendered as a span with aria-current="page" for accessibility.
 */
const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('font-normal text-foreground', className)}
    {...props}
  />
))
BreadcrumbPage.displayName = 'BreadcrumbPage'

/**
 * BreadcrumbSeparator component - visual separator between breadcrumb items.
 *
 * Renders a chevron icon by default. Can be customized with children prop.
 * Marked as presentation-only for screen readers.
 *
 * @example
 * ```tsx
 * <BreadcrumbSeparator />
 *
 * // Custom separator
 * <BreadcrumbSeparator>/</BreadcrumbSeparator>
 * ```
 */
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:h-3.5 [&>svg]:w-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

/**
 * BreadcrumbEllipsis component - collapsed items indicator.
 *
 * Used in breadcrumb trails to represent omitted intermediate levels.
 * Displays a horizontal ellipsis icon with screen reader text.
 */
const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis'

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
