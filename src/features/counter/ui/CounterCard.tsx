import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch } from "@/app/store/store"
import {
  increment,
  selectCounterValue,
} from "@/features/counter/model/counterSlice"
import { AnimatedGradientText } from "@/shared/ui/animated-gradient-text"
import { Button } from "@/shared/ui/button"

type Props = {
  title: string
}

export function CounterCard({ title }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const value = useSelector(selectCounterValue)

  return (
    <div>
      <div className="flex flex-col space-y-1 items-center justify-center w-full">
        <div className="flex items-center">
          <div>{title}</div>
          <div className="px-1">:</div>
          <div>{value}</div>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch(increment())}
        >
          <AnimatedGradientText speed={1.2}>Count up</AnimatedGradientText>
        </Button>
      </div>
    </div>
  )
}
