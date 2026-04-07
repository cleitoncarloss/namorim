import { didPaint } from '@dom'
import { revealable } from './interfaces'

const Reveal = (Super) => {
  class C extends Super {
    @didPaint
    [revealable]() {
      requestAnimationFrame(() => {
        this.scrollIntoView({ behavior: 'smooth', block: 'end' })
      })
      return this
    }
  }

  return C
}

export default Reveal
