import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useReducer } from 'react'
import { type Location, useLocation, useNavigate } from 'react-router'

interface HistoryState {
  history: Location[]
  currentIndex: number
}

type HistoryAction =
  | { type: 'PUSH'; location: Location }
  | { type: 'POP'; newIndex: number; location: Location }

/**
 * Navigation buttons component for back/forward history navigation.
 *
 * Displays back and forward buttons similar to browser navigation.
 * Buttons are disabled when there is no history to navigate.
 *
 * Implements custom history tracking since React Router v7 doesn't provide
 * direct access to the history stack.
 *
 * @example
 * ```tsx
 * <NavigationButtons />
 * ```
 */
export function NavigationButtons() {
  const navigate = useNavigate()
  const location = useLocation()

  const [state, dispatch] = useReducer(
    (state: HistoryState, action: HistoryAction) => {
      switch (action.type) {
        case 'PUSH': {
          // Remove any forward history when navigating to a new location
          const newHistory = state.history.slice(0, state.currentIndex + 1)
          newHistory.push(action.location)
          return {
            history: newHistory,
            currentIndex: newHistory.length - 1,
          }
        }
        case 'POP': {
          const newHistory = [...state.history]
          newHistory[action.newIndex] = action.location
          return {
            history: newHistory,
            currentIndex: action.newIndex,
          }
        }
        default:
          return state
      }
    },
    { history: [location], currentIndex: 0 },
  )

  // Update history when location changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: Only track location changes
  useEffect(() => {
    // Check if navigation was caused by back/forward (POP action)
    const isPopNavigation = location.state?.navigationType === 'POP'

    if (!isPopNavigation) {
      // For PUSH/REPLACE navigation, add to history
      dispatch({ type: 'PUSH', location })
    }
    // Note: POP navigation is handled in handleBack/handleForward
  }, [location])

  const { history, currentIndex } = state
  const canGoBack = currentIndex > 0
  const canGoForward = currentIndex < history.length - 1

  const handleBack = () => {
    if (canGoBack) {
      const newIndex = currentIndex - 1
      dispatch({ type: 'POP', newIndex, location })
      navigate(history[newIndex].pathname, {
        state: { navigationType: 'POP' },
      })
    }
  }

  const handleForward = () => {
    if (canGoForward) {
      const newIndex = currentIndex + 1
      dispatch({ type: 'POP', newIndex, location })
      navigate(history[newIndex].pathname, {
        state: { navigationType: 'POP' },
      })
    }
  }

  return (
    <>
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          disabled={!canGoBack}
          onClick={handleBack}
          aria-label="Go back"
        >
          <ChevronLeft size={18} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          disabled={!canGoForward}
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
