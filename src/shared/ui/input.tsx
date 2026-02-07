import * as React from 'react'

import { cn } from '@/shared/lib/utils'

/**
 * Styled input component with consistent theming.
 *
 * A wrapper around the native `<input>` element with pre-configured styling
 * for focus rings, disabled states, file inputs, and responsive text sizing.
 *
 * @example
 * ```tsx
 * // Text input
 * <Input placeholder="Enter your name" />
 *
 * // With type
 * <Input type="email" placeholder="Email" />
 * <Input type="password" placeholder="Password" />
 *
 * // Controlled input
 * <Input value={value} onChange={(e) => setValue(e.target.value)} />
 *
 * // Disabled
 * <Input disabled placeholder="Disabled" />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
