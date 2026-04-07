import { attributeChanged, define } from '@directive'
import { paint, retouch } from '@dom'
import Echo from '@echo'
import { Height, Hidden, Width } from '@mixin'
import component from './component'
import style from './style'

@define('nm-stack')
@paint(component, style)
class Stack extends Echo(Height(Hidden(Width(HTMLElement)))) {
  #align
  #direction
  #internals
  #justify

  get align() {
    return (this.#align ??= 'start')
  }

  @attributeChanged('align')
  @retouch
  set align(value) {
    this.#align = value
  }

  get direction() {
    return (this.#direction ??= 'row')
  }

  @attributeChanged('direction')
  @retouch
  set direction(value) {
    this.#direction = value
  }

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  get justify() {
    return (this.#justify ??= 'flex-start')
  }

  @attributeChanged('justify')
  @retouch
  set justify(value) {
    this.#justify = value
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
}

export default Stack
