import type { ComponentPropsWithoutRef, CSSProperties } from 'react'

import { cn } from '@/shared/lib/utils'

/**
 * Props for the AnimatedGradientText component.
 */
export interface AnimatedGradientTextProps extends ComponentPropsWithoutRef<'div'> {
  /** Animation speed multiplier. Higher values make animation faster. @default 1 */
  speed?: number
  /** Starting gradient color (hex or CSS color). @default '#ffaa40' */
  colorFrom?: string
  /** Ending gradient color (hex or CSS color). @default '#9c40ff' */
  colorTo?: string
}

/**
 * Text component with an animated gradient background.
 *
 * Creates text with a continuously animating gradient background effect
 * using CSS custom properties and Tailwind's gradient utilities.
 *
 * @example
 * ```tsx
 * <AnimatedGradientText speed={1.5} colorFrom="#ff0000" colorTo="#0000ff">
 *   Hello World
 * </AnimatedGradientText>
 * ```
 */
export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  ...props
}: AnimatedGradientTextProps) {
  return (
    <span
      style={
        {
          '--bg-size': `${speed * 300}%`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
        } as CSSProperties
      }
      className={cn(
        `animate-gradient inline bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-[var(--color-from)] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
