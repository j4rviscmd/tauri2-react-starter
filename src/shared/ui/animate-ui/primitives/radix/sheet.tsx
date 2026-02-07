'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react'
import * as React from 'react'

import { useControlledState } from '@/shared/hooks/use-controlled-state'
import { getStrictContext } from '@/shared/lib/get-strict-context'

type SheetContextType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const [SheetProvider, useSheet] =
  getStrictContext<SheetContextType>('SheetContext')

type SheetProps = React.ComponentProps<typeof Dialog.Root>

function Sheet(props: SheetProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props.open,
    defaultValue: props.defaultOpen,
    onChange: props.onOpenChange,
  })

  return (
    <SheetProvider value={{ isOpen, setIsOpen }}>
      <Dialog.Root data-slot="sheet" {...props} onOpenChange={setIsOpen} />
    </SheetProvider>
  )
}

type SheetTriggerProps = React.ComponentProps<typeof Dialog.Trigger>

function SheetTrigger(props: SheetTriggerProps) {
  return <Dialog.Trigger data-slot="sheet-trigger" {...props} />
}

type SheetCloseProps = React.ComponentProps<typeof Dialog.Close>

function SheetClose(props: SheetCloseProps) {
  return <Dialog.Close data-slot="sheet-close" {...props} />
}

type SheetPortalProps = React.ComponentProps<typeof Dialog.Portal>

function SheetPortal(props: SheetPortalProps) {
  const { isOpen } = useSheet()

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Portal forceMount data-slot="sheet-portal" {...props} />
      )}
    </AnimatePresence>
  )
}

type SheetOverlayProps = Omit<
  React.ComponentProps<typeof Dialog.Overlay>,
  'asChild' | 'forceMount'
> &
  HTMLMotionProps<'div'>

function SheetOverlay({
  transition = { duration: 0.2, ease: 'easeInOut' },
  ...props
}: SheetOverlayProps) {
  return (
    <Dialog.Overlay asChild forceMount>
      <motion.div
        key="sheet-overlay"
        data-slot="sheet-overlay"
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(4px)' }}
        transition={transition}
        {...props}
      />
    </Dialog.Overlay>
  )
}

type Side = 'top' | 'bottom' | 'left' | 'right'

type SheetContentProps = React.ComponentProps<typeof Dialog.Content> &
  HTMLMotionProps<'div'> & {
    side?: Side
  }

function SheetContent({
  side = 'right',
  transition = { type: 'spring', stiffness: 150, damping: 22 },
  style,
  children,
  ...props
}: SheetContentProps) {
  const sideValue: Side = side
  const axis = side === 'left' || side === 'right' ? 'x' : 'y'

  const offscreen: Record<Side, { x?: string; y?: string; opacity: number }> = {
    right: { x: '100%', opacity: 0 },
    left: { x: '-100%', opacity: 0 },
    top: { y: '-100%', opacity: 0 },
    bottom: { y: '100%', opacity: 0 },
  }

  const positionStyle: Record<Side, React.CSSProperties> = {
    right: { insetBlock: 0, right: 0 },
    left: { insetBlock: 0, left: 0 },
    top: { insetInline: 0, top: 0 },
    bottom: { insetInline: 0, bottom: 0 },
  }

  return (
    <Dialog.Content asChild forceMount {...props}>
      <motion.div
        key="sheet-content"
        data-slot="sheet-content"
        data-side={side}
        initial={offscreen[sideValue]}
        animate={{ [axis]: 0, opacity: 1 }}
        exit={offscreen[sideValue]}
        style={{
          position: 'fixed',
          ...positionStyle[sideValue],
          ...style,
        }}
        transition={transition}
      >
        {children}
      </motion.div>
    </Dialog.Content>
  )
}

type SheetHeaderProps = React.ComponentProps<'div'>

function SheetHeader(props: SheetHeaderProps) {
  return <div data-slot="sheet-header" {...props} />
}

type SheetFooterProps = React.ComponentProps<'div'>

function SheetFooter(props: SheetFooterProps) {
  return <div data-slot="sheet-footer" {...props} />
}

type SheetTitleProps = React.ComponentProps<typeof Dialog.Title>

function SheetTitle(props: SheetTitleProps) {
  return <Dialog.Title data-slot="sheet-title" {...props} />
}

type SheetDescriptionProps = React.ComponentProps<typeof Dialog.Description>

function SheetDescription(props: SheetDescriptionProps) {
  return <Dialog.Description data-slot="sheet-description" {...props} />
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  useSheet,
  type SheetCloseProps,
  type SheetContentProps,
  type SheetDescriptionProps,
  type SheetFooterProps,
  type SheetHeaderProps,
  type SheetOverlayProps,
  type SheetPortalProps,
  type SheetProps,
  type SheetTitleProps,
  type SheetTriggerProps,
}
