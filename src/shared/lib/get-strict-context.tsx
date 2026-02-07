import * as React from 'react'

/**
 * Factory function that creates a strictly typed React Context with Provider and hook.
 *
 * Generates a Context, Provider component, and custom hook that enforces:
 * - Type safety through generics
 * - Mandatory Provider usage (throws error if hook used outside Provider)
 * - Customizable error messages for better DX
 *
 * This pattern eliminates the common issue of `undefined` context values
 * by throwing a descriptive error when the hook is used without a Provider.
 *
 * @template T - The context value type.
 * @param name - Optional context name for error messages (e.g., "ThemeContext").
 * @returns A tuple of [Provider component, context hook].
 *
 * @example
 * ```tsx
 * // Create context
 * const [ThemeContextProvider, useThemeContext] = getStrictContext<string>('ThemeContext')
 *
 * // Use in parent component
 * function App() {
 *   return (
 *     <ThemeContextProvider value="dark">
 *       <Child />
 *     </ThemeContextProvider>
 *   )
 * }
 *
 * // Use in child component
 * function Child() {
 *   const theme = useThemeContext() // Type: string
 *   return <div>{theme}</div>
 * }
 *
 * // This would throw: "useContext must be used within ThemeContext"
 * function Orphan() {
 *   const theme = useThemeContext()
 * }
 * ```
 */
function getStrictContext<T>(
  name?: string,
): readonly [
  ({
    value,
    children,
  }: {
    value: T
    children?: React.ReactNode
  }) => React.JSX.Element,
  () => T,
] {
  const Context = React.createContext<T | undefined>(undefined)

  const Provider = ({
    value,
    children,
  }: {
    value: T
    children?: React.ReactNode
  }) => <Context.Provider value={value}>{children}</Context.Provider>

  const useSafeContext = () => {
    const ctx = React.useContext(Context)
    if (ctx === undefined) {
      throw new Error(`useContext must be used within ${name ?? 'a Provider'}`)
    }
    return ctx
  }

  return [Provider, useSafeContext] as const
}

export { getStrictContext }
