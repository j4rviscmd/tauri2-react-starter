import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines clsx and tailwind-merge for optimal Tailwind CSS class handling.
 *
 * clsx conditionally constructs className strings, while tailwind-merge
 * intelligently merges Tailwind classes without style conflicts.
 *
 * @param inputs - Class values to combine (strings, objects, arrays).
 * @returns The merged className string.
 *
 * @example
 * ```typescript
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4'
 * cn({ active: isActive }, 'base-class') // 'base-class active' (if true)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
