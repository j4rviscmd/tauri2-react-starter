import * as React from 'react'

/**
 * Common props for controlled/uncontrolled component state.
 *
 * @template T - The state value type.
 *
 * @property value - Controlled value (when provided, component is controlled)
 * @property defaultValue - Initial uncontrolled value (used when value is undefined)
 */
interface CommonControlledStateProps<T> {
  value?: T
  defaultValue?: T
}

/**
 * Hook for managing controlled and uncontrolled component state.
 *
 * Supports both controlled (value prop) and uncontrolled (defaultValue prop)
 * modes. When value prop is provided, state is controlled externally.
 * Otherwise, state is managed internally and initialized from defaultValue.
 *
 * The returned setter function updates both internal state and calls the
 * optional onChange callback with any additional arguments.
 *
 * @template T - The state value type.
 * @template Rest - Additional argument types for onChange callback.
 * @param props - Component props containing value, defaultValue, and onChange.
 * @returns A tuple of [current state value, state setter function].
 *
 * @example
 * ```tsx
 * function MyComponent({ value, defaultValue, onChange }) {
 *   const [state, setState] = useControlledState({
 *     value,
 *     defaultValue,
 *     onChange,
 *   })
 *
 *   return <input value={state} onChange={(e) => setState(e.target.value)} />
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useControlledState<T, Rest extends any[] = []>(
  props: CommonControlledStateProps<T> & {
    onChange?: (value: T, ...args: Rest) => void
  },
): readonly [T, (next: T, ...args: Rest) => void] {
  const { value, defaultValue, onChange } = props

  const [state, setInternalState] = React.useState<T>(
    value !== undefined ? value : (defaultValue as T),
  )

  React.useEffect(() => {
    if (value !== undefined) setInternalState(value)
  }, [value])

  const setState = React.useCallback(
    (next: T, ...args: Rest) => {
      setInternalState(next)
      onChange?.(next, ...args)
    },
    [onChange],
  )

  return [state, setState] as const
}
