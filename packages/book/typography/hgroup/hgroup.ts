import { attributeChanged, define } from '@directive'
import { paint, retouch } from '@dom'
import Echo from '@echo'
import { Hidden, Width } from '@mixin'
import component from './component'
import style from './style'

@define('morph-hgroup')
@paint(component, style)
class Hgroup extends Echo(Hidden(Width(HTMLElement))) {
  #align
  #internals

  get align() {
    return (this.#align ??= 'start')
  }

  @attributeChanged('align')
  @retouch
  set align(value) {
    this.#align = value
  }

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
}

export default Hgroup
