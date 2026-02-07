import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

/**
 * Variant definitions for button styles using class-variance-authority.
 *
 * Combines visual variants (default, destructive, outline, secondary, ghost, link)
 * with size variants (default, sm, lg, icon) to generate Tailwind classes.
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** When true, renders as the child element instead of a button (useful for Link components). */
  asChild?: boolean
}

/**
 * Polymorphic button component with multiple style variants.
 *
 * A versatile button component supporting various visual styles and sizes.
 * Can render as a custom element via asChild for integrations with React Router Link
 * or other components.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With variant
 * <Button variant="destructive">Delete</Button>
 * <Button variant="outline">Cancel</Button>
 * <Button variant="ghost">Close</Button>
 *
 * // With size
 * <Button size="sm">Small</Button>
 * <Button size="lg">Large</Button>
 *
 * // Icon-only button
 * <Button size="icon"><SearchIcon /></Button>
 *
 * // As a link (React Router)
 * <Button asChild>
 *   <Link to="/dashboard">Dashboard</Link>
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button }
