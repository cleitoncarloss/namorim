import attributeChanged, { booleanAttribute } from '@directive/attributeChanged'
import { retouch } from '@dom'

const Weight = (Super) => {
  class C extends Super {
    #weight

    get weight() {
      return (this.#weight ??= 'regular')
    }

    @attributeChanged('weight', booleanAttribute)
    @retouch
    set weight(value) {
      this.#weight = value
    }
  }

  return C
}

export default Weight
