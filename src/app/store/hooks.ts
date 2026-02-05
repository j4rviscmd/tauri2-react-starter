import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

/**
 * Typed hook for dispatching actions to the Redux store.
 *
 * Use this instead of the raw useDispatch hook to ensure type safety
 * when dispatching thunks and actions.
 *
 * @returns The typed dispatch function.
 *
 * @example
 * ```typescript
 * const dispatch = useAppDispatch()
 * dispatch(checkForUpdates())
 * ```
 */
export const useAppDispatch: () => AppDispatch = useDispatch

/**
 * Typed hook for selecting data from the Redux store.
 *
 * Use this instead of the raw useSelector hook to ensure type safety
 * when accessing store state.
 *
 * @example
 * ```typescript
 * const counterValue = useAppSelector(state => state.counter.value)
 * ```
 */
export const useAppSelector = useSelector.withTypes<RootState>()
