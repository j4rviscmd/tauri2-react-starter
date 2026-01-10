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
    <section>
      <h2>{title}</h2>
      <p>Count: {value}</p>

      <Button
        type="button"
        variant="outline"
        onClick={() => dispatch(increment())}
      >
        <AnimatedGradientText speed={1.2}>Count up</AnimatedGradientText>
      </Button>
    </section>
  )
}
