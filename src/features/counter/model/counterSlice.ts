import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/app/store/store'

type CounterState = {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

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

export const selectCounterValue = (state: RootState) => state.counter.value

export const counterReducer = counterSlice.reducer
