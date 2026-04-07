import { attributeChanged } from '@directive'
import { retouch } from '@dom'

const Color = (Super) => {
  class C extends Super {
    #color

    get color() {
      return (this.#color ??= 'neutral')
    }

    @attributeChanged('color')
    @retouch
    set color(value) {
      this.#color = value
    }
  }

  return C
}

export default Color
