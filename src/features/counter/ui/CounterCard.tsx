import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch } from '@/app/store/store'
import {
  increment,
  selectCounterValue,
} from '@/features/counter/model/counterSlice'
import { AnimatedGradientText } from '@/shared/ui/animated-gradient-text'
import { Button } from '@/shared/ui/button'

type Props = {
  title: string
}

/**
 * Counter card component demonstrating Redux shared state.
 *
 * Displays the current counter value and an increment button.
 * Multiple instances share the same Redux state, demonstrating
 * state co-location and global state management.
 *
 * @param title - Descriptive title for the counter.
 */
export function CounterCard({ title }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const value = useSelector(selectCounterValue)

  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center space-y-1">
        <div className="flex items-center gap-3">
          <div>{title}</div>
          <div>:</div>
          <div>{value}</div>
          <Button
            type="button"
            variant="outline"
            onClick={() => dispatch(increment())}
          >
            <AnimatedGradientText speed={1.2}>Count up</AnimatedGradientText>
          </Button>
        </div>
      </div>
    </div>
  )
}
