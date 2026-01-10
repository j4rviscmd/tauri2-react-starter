import { useTheme } from '@/app/providers/ThemeProvider'
import { AnimatedGradientText } from '@/shared/ui/animated-gradient-text'
import { Button } from '@/shared/ui/button'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button type="button" variant="outline" onClick={() => void toggleTheme()}>
      <AnimatedGradientText speed={1.2}>
        {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
      </AnimatedGradientText>
    </Button>
  )
}
