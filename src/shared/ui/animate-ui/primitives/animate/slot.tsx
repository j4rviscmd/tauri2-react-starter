'use client'

import { cn } from '@/shared/lib/utils'
import { isMotionComponent, motion, type HTMLMotionProps } from 'motion/react'
import * as React from 'react'

/**
 * Generic props type for any object with string keys.
 */
type AnyProps = Record<string, unknown>

/**
 * Motion-compatible DOM props with conflicting event handlers resolved.
 *
 * Omits conflicting event handler types between React and Framer Motion,
 * and replaces them with React-compatible types.
 *
 * @template T - The HTMLElement type this ref targets.
 */
type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<
  HTMLMotionProps<keyof HTMLElementTagNameMap>,
  | 'ref'
  | 'onAnimationStart'
  | 'onAnimationComplete'
  | 'onDragStart'
  | 'onDrag'
  | 'onDragEnd'
> & {
  ref?: React.Ref<T>
  // Use React event handler types instead of Motion types
  onAnimationStart?: React.AnimationEventHandler<any>
  onAnimationComplete?: () => void
  onDragStart?: (event: any, info: any) => void
  onDrag?: (event: any, info: any) => void
  onDragEnd?: (event: any, info: any) => void
}

/**
 * Discriminating union for the `asChild` prop pattern.
 *
 * When `asChild` is true, children must be a single React element.
 * When `asChild` is false or undefined, children can be any renderable content.
 *
 * @template Base - The base props type to extend.
 */
type WithAsChild<Base extends object> =
  | (Base & { asChild: true; children: React.ReactElement })
  | (Base & { asChild?: false | undefined })

/**
 * Props for the Slot component.
 *
 * @template T - The HTMLElement type this ref targets.
 */
type SlotProps<T extends HTMLElement = HTMLElement> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
} & DOMMotionProps<T>

/**
 * Merges multiple React refs into a single callback ref.
 *
 * Iterates through all provided refs and calls each with the node.
 * Supports both callback refs and ref objects.
 *
 * @param refs - Array of refs to merge (can include undefined).
 * @returns A callback ref that updates all provided refs.
 *
 * @example
 * ```tsx
 * const mergedRef = mergeRefs(ref1, ref2, ref3)
 * <div ref={mergedRef} />
 * ```
 */
function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return
      if (typeof ref === 'function') {
        ref(node)
      } else {
        ;(ref as React.RefObject<T | null>).current = node
      }
    })
  }
}

/**
 * Merges child props with slot props, combining className and style intelligently.
 *
 * - Props from slotProps override childProps
 * - className values are merged using tailwind-merge via cn()
 * - style objects are shallow merged
 *
 * @param childProps - Props from the child element.
 * @param slotProps - Props from the Slot component.
 * @returns Merged props object.
 *
 * @example
 * ```tsx
 * const merged = mergeProps(
 *   { className: 'px-2', style: { color: 'red' } },
 *   { className: 'py-1', style: { fontSize: '14px' } }
 * )
 * // { className: 'px-2 py-1', style: { color: 'red', fontSize: '14px' } }
 * ```
 */
function mergeProps<T extends HTMLElement>(
  childProps: AnyProps,
  slotProps: DOMMotionProps<T>,
): AnyProps {
  const merged: AnyProps = { ...childProps, ...slotProps }

  if (childProps.className || slotProps.className) {
    merged.className = cn(
      childProps.className as string,
      slotProps.className as string,
    )
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style as React.CSSProperties),
      ...(slotProps.style as React.CSSProperties),
    }
  }

  return merged
}

/**
 * Slot component for composing Motion animation props onto child elements.
 *
 * Wraps a single child element with Motion animation capabilities.
 * If the child is already a Motion component, it uses that directly.
 * Otherwise, it creates a Motion component from the child's type.
 *
 * Props are merged such that Slot props take precedence over child props,
 * with className and style merged intelligently to avoid conflicts.
 *
 * @template T - The HTMLElement type this ref targets.
 * @param children - The child element to animate (must be a valid React element).
 * @param ref - Optional ref to attach to the Motion component.
 * @param props - Motion animation props (variants, transition, animate, etc.).
 * @returns The child element wrapped with Motion animation capabilities.
 *
 * @example
 * ```tsx
 * <Slot
 *   initial={{ opacity: 0 }}
 *   animate={{ opacity: 1 }}
 *   transition={{ duration: 0.3 }}
 * >
 *   <button>Click me</button>
 * </Slot>
 * ```
 */
function Slot<T extends HTMLElement = HTMLElement>({
  children,
  ref,
  ...props
}: SlotProps<T>) {
  const isAlreadyMotion =
    typeof children.type === 'object' &&
    children.type !== null &&
    isMotionComponent(children.type)

  const Base = React.useMemo(
    () =>
      isAlreadyMotion
        ? (children.type as React.ElementType)
        : motion.create(children.type as React.ElementType),
    [isAlreadyMotion, children.type],
  )

  if (!React.isValidElement(children)) return null

  const { ref: childRef, ...childProps } = children.props as AnyProps

  const mergedProps = mergeProps(childProps, props)

  return (
    <Base {...mergedProps} ref={mergeRefs(childRef as React.Ref<T>, ref)} />
  )
}

export {
  Slot,
  type AnyProps,
  type DOMMotionProps,
  type SlotProps,
  type WithAsChild,
}
