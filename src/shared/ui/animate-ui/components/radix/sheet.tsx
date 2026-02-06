import { cn } from '@/shared/lib/utils'
import {
  SheetClose as SheetClosePrimitive,
  SheetContent as SheetContentPrimitive,
  SheetDescription as SheetDescriptionPrimitive,
  SheetFooter as SheetFooterPrimitive,
  SheetHeader as SheetHeaderPrimitive,
  SheetOverlay as SheetOverlayPrimitive,
  SheetPortal as SheetPortalPrimitive,
  Sheet as SheetPrimitive,
  SheetTitle as SheetTitlePrimitive,
  SheetTrigger as SheetTriggerPrimitive,
  type SheetCloseProps as SheetClosePrimitiveProps,
  type SheetContentProps as SheetContentPrimitiveProps,
  type SheetDescriptionProps as SheetDescriptionPrimitiveProps,
  type SheetFooterProps as SheetFooterPrimitiveProps,
  type SheetHeaderProps as SheetHeaderPrimitiveProps,
  type SheetOverlayProps as SheetOverlayPrimitiveProps,
  type SheetProps as SheetPrimitiveProps,
  type SheetTitleProps as SheetTitlePrimitiveProps,
  type SheetTriggerProps as SheetTriggerPrimitiveProps,
} from '@/shared/ui/animate-ui/primitives/radix/sheet'
import { XIcon } from 'lucide-react'

type SheetProps = SheetPrimitiveProps

function Sheet(props: SheetProps) {
  return <SheetPrimitive {...props} />
}

type SheetTriggerProps = SheetTriggerPrimitiveProps

function SheetTrigger(props: SheetTriggerProps) {
  return <SheetTriggerPrimitive {...props} />
}

type SheetOverlayProps = SheetOverlayPrimitiveProps

function SheetOverlay({ className, ...props }: SheetOverlayProps) {
  return (
    <SheetOverlayPrimitive
      className={cn('fixed inset-0 z-50 bg-black/50', className)}
      {...props}
    />
  )
}

type SheetCloseProps = SheetClosePrimitiveProps

function SheetClose(props: SheetCloseProps) {
  return <SheetClosePrimitive {...props} />
}

type SheetContentProps = SheetContentPrimitiveProps & {
  showCloseButton?: boolean
}

function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortalPrimitive>
      <SheetOverlay />
      <SheetContentPrimitive
        className={cn(
          'fixed z-50 flex flex-col gap-4 bg-background shadow-lg',
          side === 'right' && 'h-full w-[350px] border-l',
          side === 'left' && 'h-full w-[350px] border-r',
          side === 'top' && 'h-[350px] w-full border-b',
          side === 'bottom' && 'h-[350px] w-full border-t',
          className,
        )}
        side={side}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetClose className="rounded-xs focus:outline-hidden absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        )}
      </SheetContentPrimitive>
    </SheetPortalPrimitive>
  )
}

type SheetHeaderProps = SheetHeaderPrimitiveProps

function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <SheetHeaderPrimitive
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  )
}

type SheetFooterProps = SheetFooterPrimitiveProps

function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <SheetFooterPrimitive
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}

type SheetTitleProps = SheetTitlePrimitiveProps

function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <SheetTitlePrimitive
      className={cn('font-semibold text-foreground', className)}
      {...props}
    />
  )
}

type SheetDescriptionProps = SheetDescriptionPrimitiveProps

function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <SheetDescriptionPrimitive
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  type SheetCloseProps,
  type SheetContentProps,
  type SheetDescriptionProps,
  type SheetFooterProps,
  type SheetHeaderProps,
  type SheetProps,
  type SheetTitleProps,
  type SheetTriggerProps,
}
