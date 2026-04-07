import { attributeChanged, define } from '@directive'
import { paint, repaint } from '@dom'
import Echo from '@echo'
import on, { customEvent, stop } from '@event'
import { Hidden } from '@mixin'
import component from './component'
import style from './style'

@define('morph-avatar')
@paint(component, style)
class Avatar extends Echo(Hidden(HTMLElement)) {
  #alt
  #internals
  #src
  #value

  get alt() {
    return (this.#alt ??= '?').charAt(0).toLowerCase()
  }

  @attributeChanged('alt')
  @repaint
  set alt(value) {
    this.#alt = value
  }

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  get src() {
    return this.#src
  }

  @attributeChanged('src')
  @repaint
  set src(value) {
    this.#src = value
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

  @on.click('img', stop)
  click() {
    this.dispatchEvent(customEvent('clicked', this.value))
    return this
  }
}

export default Avatar
