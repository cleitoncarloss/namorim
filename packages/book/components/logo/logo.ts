import { attributeChanged, define } from '@directive'
import { paint } from '@dom'
import Echo from '@echo'
import on, { customEvent, stop } from '@event'
import { Hidden } from '@mixin'

import component from './component'
import style from './style'

@define('morph-logo')
@paint(component, style)
class Logo extends Echo(Hidden(HTMLElement)) {
  #internals
  #value

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  get value() {
    return this.#value
  }

  @attributeChanged('value')
  set value(value) {
    this.#value = value
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open', delegatesFocus: true })
  }

  @on.click('*', stop)
  click() {
    this.dispatchEvent(customEvent('clicked', this.value))
    return this
  }
}

export default Logo
