import * as React from 'react'

/** Width breakpoint in pixels below which the viewport is considered mobile. */
const MOBILE_BREAKPOINT = 768

/**
 * Hook to detect whether the current viewport is mobile-sized.
 *
 * Uses MediaQuery to listen for viewport changes and returns a boolean
 * indicating if the screen width is below the mobile breakpoint (768px).
 *
 * @returns `true` if the viewport width is less than 768px, `false` otherwise
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMobile = useIsMobile()
 *
 *   return (
 *     <div>
 *       {isMobile ? <MobileLayout /> : <DesktopLayout />}
 *     </div>
 *   )
 * }
 * ```
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const updateState = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    mql.addEventListener('change', updateState)
    updateState() // Initial value

    return () => {
      mql.removeEventListener('change', updateState)
    }
  }, [])

  return isMobile
}
