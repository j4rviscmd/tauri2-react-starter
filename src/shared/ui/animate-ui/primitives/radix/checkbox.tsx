'use client'

import { Checkbox as CheckboxRoot, Indicator } from '@radix-ui/react-checkbox'
import { motion, type HTMLMotionProps, type SVGMotionProps } from 'motion/react'
import * as React from 'react'

import { useControlledState } from '@/shared/hooks/use-controlled-state'
import { getStrictContext } from '@/shared/lib/get-strict-context'

/**
 * Context type for checkbox state.
 *
 * @property isChecked - Current checked state (true, false, or 'indeterminate').
 * @property setIsChecked - Function to update the checked state.
 */
type CheckboxContextType = {
  isChecked: boolean | 'indeterminate'
  setIsChecked: (checked: boolean | 'indeterminate') => void
}

const [CheckboxProvider, useCheckbox] =
  getStrictContext<CheckboxContextType>('CheckboxContext')

/**
 * Props for the animated checkbox component.
 *
 * Combines Framer Motion button props with Radix UI checkbox props,
 * excluding the asChild prop which is handled internally.
 */
type CheckboxProps = HTMLMotionProps<'button'> &
  Omit<React.ComponentProps<typeof CheckboxRoot>, 'asChild'>

/**
 * Animated checkbox component with Framer Motion integration.
 *
 * Wraps Radix UI's Checkbox with Motion animations for tap and hover states.
 * Supports controlled and uncontrolled modes via useControlledState.
 * Provides checked state context to child components like CheckboxIndicator.
 *
 * @param defaultChecked - Initial checked state for uncontrolled mode.
 * @param checked - Controlled checked state.
 * @param onCheckedChange - Callback when checked state changes.
 * @param disabled - Whether the checkbox is disabled.
 * @param required - Whether the checkbox is required for form submission.
 * @param name - Form field name.
 * @param value - Form field value.
 * @param props - Additional Motion animation props.
 * @returns An animated checkbox button element.
 *
 * @example
 * ```tsx
 * <Checkbox checked={isChecked} onCheckedChange={setIsChecked}>
 *   <CheckboxIndicator />
 * </Checkbox>
 * ```
 */
function Checkbox({
  defaultChecked,
  checked,
  onCheckedChange,
  disabled,
  required,
  name,
  value,
  ...props
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useControlledState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  })

  return (
    <CheckboxProvider value={{ isChecked, setIsChecked }}>
      <CheckboxRoot
        defaultChecked={defaultChecked}
        checked={checked}
        onCheckedChange={setIsChecked}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        asChild
      >
        <motion.button
          data-slot="checkbox"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          {...props}
        />
      </CheckboxRoot>
    </CheckboxProvider>
  )
}

/**
 * Props for the checkbox indicator SVG.
 */
type CheckboxIndicatorProps = SVGMotionProps<SVGSVGElement>

/**
 * Visual indicator component for checkbox state.
 *
 * Renders an SVG checkmark or indeterminate dash with animated path drawing.
 * Uses Framer Motion to animate the path length for a drawing effect.
 * Automatically switches between checkmark and indeterminate states based on context.
 *
 * @param props - Additional Motion animation props for the SVG.
 * @returns An animated SVG indicator element.
 *
 * @example
 * ```tsx
 * <Checkbox>
 *   <CheckboxIndicator />
 * </Checkbox>
 * ```
 */
function CheckboxIndicator(props: CheckboxIndicatorProps) {
  const { isChecked } = useCheckbox()

  return (
    <Indicator forceMount asChild>
      <motion.svg
        data-slot="checkbox-indicator"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="3.5"
        stroke="currentColor"
        initial="unchecked"
        animate={isChecked ? 'checked' : 'unchecked'}
        {...props}
      >
        {isChecked === 'indeterminate' ? (
          <motion.line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.2 },
            }}
          />
        ) : (
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
            variants={{
              checked: {
                pathLength: 1,
                opacity: 1,
                transition: {
                  duration: 0.2,
                  delay: 0.2,
                },
              },
              unchecked: {
                pathLength: 0,
                opacity: 0,
                transition: {
                  duration: 0.2,
                },
              },
            }}
          />
        )}
      </motion.svg>
    </Indicator>
  )
}

export {
  Checkbox,
  CheckboxIndicator,
  useCheckbox,
  type CheckboxContextType,
  type CheckboxIndicatorProps,
  type CheckboxProps,
}
