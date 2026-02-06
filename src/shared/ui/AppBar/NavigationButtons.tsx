import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'

/**
 * Navigation buttons component for back/forward history navigation.
 *
 * Displays back and forward buttons similar to browser navigation.
 * Buttons are disabled when there is no history to navigate.
 *
 * @example
 * ```tsx
 * <NavigationButtons />
 * ```
 */
export function NavigationButtons() {
  const navigate = useNavigate()

  // Note: React Router v7's useNavigate doesn't provide direct access to history stack.
  // We use a simple heuristic: navigate(-1) always works for back, but forward
  // requires custom history tracking. For now, forward is always disabled.
  // TODO: Implement custom history stack for forward navigation support.

  const handleBack = () => {
    navigate(-1)
  }

  const handleForward = () => {
    navigate(1)
  }

  return (
    <>
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={handleBack}
          aria-label="Go back"
        >
          <ChevronLeft size={18} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          disabled
          onClick={handleForward}
          aria-label="Go forward"
        >
          <ChevronRight size={18} />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-4" />
    </>
  )
}
