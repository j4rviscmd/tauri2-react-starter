import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

/** Provider for tooltip state - must wrap all tooltip components. */
const TooltipProvider = TooltipPrimitive.Provider

/** Root tooltip component - wraps trigger and content. */
const Tooltip = TooltipPrimitive.Root

/** Element that triggers the tooltip on hover/focus. */
const TooltipTrigger = TooltipPrimitive.Trigger

/**
 * Content popup that appears on hover/focus.
 *
 * Renders in a Portal with animated entrance/exit. Automatically positions
 * relative to the trigger with configurable offset.
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>
 *       <p>Tooltip content here</p>
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 origin-[--radix-tooltip-content-transform-origin] overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
