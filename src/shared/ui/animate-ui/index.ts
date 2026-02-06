// Export primitives (core components)
export * from './primitives'

// Export wrapper components from components/ directory
export {
  // From animate/
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type TooltipContentProps,
  type TooltipProps,
  type TooltipProviderProps,
  type TooltipTriggerProps,
} from './components/animate/tooltip'

// Note: dropdown-menu, sheet, sidebar components are available via primitives export
// to avoid duplicate exports
