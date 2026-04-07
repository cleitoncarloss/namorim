import attributeChanged, { booleanAttribute } from '@directive/attributeChanged'
import { around } from '@middleware'
import { disableable } from './interfaces'

const Disabled = (Super) => {
  class C extends Super {
    #disabled

    get disabled() {
      return (this.#disabled ??= false)
    }

    @attributeChanged('disabled', booleanAttribute)
    @around(disableable)
    set disabled(value) {
      this.#disabled = value
    }

    [disableable]() {
      this.disabled
        ? this.internals.states.add('disabled')
        : this.internals.states.delete('disabled')
      return this
    }
  }

  return C
}

export default Disabled
