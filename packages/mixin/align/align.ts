import { attributeChanged } from '@directive'
import { retouch } from '@dom'

const Align = (Super) => {
  class C extends Super {
    #align

    get align() {
      return (this.#align ??= 'left')
    }

    @attributeChanged('align')
    @retouch
    set align(value) {
      this.#align = value
    }
  }

  return C
}

export default Align
