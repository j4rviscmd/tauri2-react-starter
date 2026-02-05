import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/app/store/store'

/**
 * Counter feature state.
 */
type CounterState = {
  /** Current counter value. */
  value: number
}

const initialState: CounterState = {
  value: 0,
}

/**
 * Redux slice for counter functionality.
 *
 * Demonstrates basic Redux state management with a simple increment action.
 * Used as an example of shared Redux state across multiple components.
 */
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
})

export const { increment } = counterSlice.actions

/**
 * Selects the current counter value from the Redux store.
 */
export const selectCounterValue = (state: RootState) => state.counter.value

export const counterReducer = counterSlice.reducer
