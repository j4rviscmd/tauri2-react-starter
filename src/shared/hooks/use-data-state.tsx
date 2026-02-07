'use client'

import * as React from 'react'

/**
 * Valid data attribute value types.
 *
 * Parsed from HTML data attributes where:
 * - Empty string or "true" becomes `true`
 * - "false" becomes `false`
 * - Any other non-null string is returned as-is
 * - `null` represents a missing attribute
 */
type DataStateValue = string | boolean | null

/**
 * Parses an HTML data attribute value into a typed value.
 *
 * Converts string values from dataset attributes to their semantic types:
 * - Empty string or "true" → `true`
 * - "false" → `false`
 * - Other strings → returned as-is
 * - null → `null`
 *
 * @param value - The raw attribute value from `getAttribute()`.
 * @returns The parsed boolean, string, or null value.
 *
 * @example
 * ```tsx
 * parseDatasetValue(null)   // => null
 * parseDatasetValue('')     // => true
 * parseDatasetValue('true') // => true
 * parseDatasetValue('false')// => false
 * parseDatasetValue('hello')// => 'hello'
 * ```
 */
function parseDatasetValue(value: string | null): DataStateValue {
  if (value === null) return null
  if (value === '' || value === 'true') return true
  if (value === 'false') return false
  return value
}

/**
 * Hook for synchronizing state with an HTML data attribute.
 *
 * Creates a reactive binding between a data attribute on a DOM element
 * and component state. Uses `MutationObserver` to detect attribute changes
 * and `useSyncExternalStore` for optimal synchronization with React rendering.
 *
 * This is useful for integrating with third-party libraries that communicate
 * via data attributes or for creating declarative wrappers around imperative APIs.
 *
 * @template T - The HTMLElement type to attach to.
 * @param key - The data attribute key (without "data-" prefix).
 * @param forwardedRef - Optional ref to forward to the element.
 * @param onChange - Callback invoked when the data attribute value changes.
 * @returns A tuple of [current value, ref object to attach to element].
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [isOpen, setIsOpen] = useState(false)
 *   const [value, ref] = useDataState('open', undefined, (v) => {
 *     if (typeof v === 'boolean') setIsOpen(v)
 *   })
 *
 *   return <div ref={ref} data-open={isOpen}>Content</div>
 * }
 * ```
 */
function useDataState<T extends HTMLElement = HTMLElement>(
  key: string,
  forwardedRef?: React.Ref<T | null>,
  onChange?: (value: DataStateValue) => void,
): [DataStateValue, React.RefObject<T | null>] {
  const localRef = React.useRef<T | null>(null)
  React.useImperativeHandle(forwardedRef, () => localRef.current as T)

  const getSnapshot = (): DataStateValue => {
    const el = localRef.current
    return el ? parseDatasetValue(el.getAttribute(`data-${key}`)) : null
  }

  const subscribe = (callback: () => void) => {
    const el = localRef.current
    if (!el) return () => {}
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.attributeName === `data-${key}`) {
          callback()
          break
        }
      }
    })
    observer.observe(el, {
      attributes: true,
      attributeFilter: [`data-${key}`],
    })
    return () => observer.disconnect()
  }

  const value = React.useSyncExternalStore(subscribe, getSnapshot)

  React.useEffect(() => {
    if (onChange) onChange(value)
  }, [value, onChange])

  return [value, localRef]
}

export { useDataState, type DataStateValue }
