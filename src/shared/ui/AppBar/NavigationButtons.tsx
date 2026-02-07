import { Button } from '@/shared/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useReducer, useRef } from 'react'
import { type Location, useLocation, useNavigate } from 'react-router'

/**
 * State for tracking navigation history stack.
 *
 * @property history - Array of visited locations in chronological order
 * @property currentIndex - Index of current location in history array
 */
interface HistoryState {
  history: Location[]
  currentIndex: number
}

/**
 * Actions for modifying navigation history state.
 *
 * - `INIT`: Initialize history with the first location
 * - `PUSH`: Add a new location to history (truncating forward history)
 * - `NAVIGATE`: Move to an existing location in history
 */
type HistoryAction =
  | { type: 'PUSH'; location: Location }
  | { type: 'NAVIGATE'; index: number }
  | { type: 'INIT'; location: Location }

/**
 * Navigation buttons component for back/forward history navigation.
 *
 * **Why manual history tracking?**
 * React Router v7's `useNavigate()` doesn't expose the history stack directly.
 * This component manually tracks navigation history to enable proper back/forward
 * button state (disabled when at history boundaries).
 *
 * **Features:**
 * - Tracks visited locations in a history array
 * - Maintains current position in history
 * - Handles PUSH navigation (new location) vs POP navigation (back/forward)
 * - Prevents duplicate entries for the same location
 * - Detects navigation type via location state to avoid corrupting history
 *
 * **Implementation Details:**
 * - Uses `useReducer` for history state management
 * - Ignores initial render and duplicate location updates
 * - Uses refs to track previous location and avoid dependency warnings
 * - Sets `navigationType: 'POP'` in state when navigating within history
 *
 * @returns A component with back/forward navigation buttons
 *
 * @example
 * ```tsx
 * // In AppBar component
 * <NavigationButtons />
 * ```
 */
export function NavigationButtons() {
  const navigate = useNavigate()
  const location = useLocation()

  const [state, dispatch] = useReducer(
    (state: HistoryState, action: HistoryAction) => {
      switch (action.type) {
        case 'INIT':
          return { history: [action.location], currentIndex: 0 }
        case 'PUSH': {
          const newHistory = state.history.slice(0, state.currentIndex + 1)
          newHistory.push(action.location)
          return { history: newHistory, currentIndex: newHistory.length - 1 }
        }
        case 'NAVIGATE':
          return { ...state, currentIndex: action.index }
        default:
          return state
      }
    },
    { history: [], currentIndex: -1 },
  )

  const initialLocationRef = useRef<Location | null>(null)
  const prevLocationRef = useRef(location)

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only track location changes
  useEffect(() => {
    // Initialize history on first render
    if (!initialLocationRef.current) {
      initialLocationRef.current = location
      dispatch({ type: 'INIT', location })
      prevLocationRef.current = location
      return
    }

    // Ignore duplicate location updates (React Router may emit same location)
    if (location === prevLocationRef.current) return

    // Ignore updates that return us to the initial location (on mount)
    const initial = initialLocationRef.current
    if (
      location.pathname === initial.pathname &&
      location.key === initial.key
    ) {
      prevLocationRef.current = location
      return
    }

    // Only push to history if this is not a POP navigation (back/forward)
    // POP navigations are handled by the NAVIGATE action in handleNavigate
    if (location.state?.navigationType !== 'POP') {
      dispatch({ type: 'PUSH', location })
    }
    prevLocationRef.current = location
  }, [location])

  const { history, currentIndex } = state
  const canGoBack = currentIndex > 0
  const canGoForward = currentIndex < history.length - 1

  /**
   * Handles back/forward navigation within the history stack.
   *
   * Updates the current index and navigates to the target location.
   * Sets `navigationType: 'POP'` in location state to signal this is
   * a history navigation (not a new PUSH), preventing history corruption.
   *
   * @param direction - Direction to navigate (`1` for forward, `-1` for back)
   */
  const handleNavigate = (direction: 1 | -1) => {
    const newIndex = currentIndex + direction
    if (newIndex < 0 || newIndex >= history.length) return

    dispatch({ type: 'NAVIGATE', index: newIndex })
    navigate(history[newIndex].pathname, {
      state: { navigationType: 'POP' },
    })
  }

  return (
    <div className="flex items-center gap-0.5">
      <Button
        variant="ghost"
        size="icon"
        className="size-7"
        disabled={!canGoBack}
        onClick={() => handleNavigate(-1)}
        aria-label="Go back"
      >
        <ChevronLeft size={18} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-7"
        disabled={!canGoForward}
        onClick={() => handleNavigate(1)}
        aria-label="Go forward"
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  )
}
