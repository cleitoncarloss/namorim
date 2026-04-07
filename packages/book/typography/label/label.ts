import { connected, define } from '@directive'
import { paint } from '@dom'
import Echo from '@echo'
import { Align, Hidden } from '@mixin'
import component from './component'
import { slottable } from './interface'
import style from './style'

@define('nm-label')
@paint(component, style)
class Label extends Align(Echo(Hidden(HTMLElement))) {
  #internals

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open', delegatesFocus: true })
  }

  @connected
  [slottable]() {
    this.setAttribute('slot', 'label')
    return this
  }
}

export default Label
