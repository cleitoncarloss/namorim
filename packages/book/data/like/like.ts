import { attributeChanged, define } from '@directive'
import Echo from '@echo'
import { customEvent } from '@event'
import { around } from '@middleware'
import { Headless } from '@mixin'
import { dispatch } from './interfaces'

@define('morph-like')
class Like extends Echo(Headless(HTMLElement)) {
  #key
  #value

  get key() {
    return this.#key
  }

  @attributeChanged('key')
  set key(value) {
    this.#key = value
  }

  get value() {
    return (this.#value ??= '')
  }

  @attributeChanged('value')
  @around(dispatch)
  set value(value) {
    this.#value = value
  }

  async [dispatch]() {
    await customElements.whenDefined(this.parentElement?.localName)
    const detail = this.parentElement.value.filter(({ [this.key]: value }) =>
      value.toLowerCase().includes(this.value.toLowerCase()),
    )
    this.parentElement.dispatchEvent(customEvent('liked', detail))
    return this
  }
}

export default Like
