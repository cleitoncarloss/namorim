import { connected, define } from '@directive'
import { paint } from '@dom'
import Echo from '@echo'
import { Align, Color, Hidden } from '@mixin'
import component from './component'
import { slottable } from './interface'
import style from './style'

@define('morph-helper')
@paint(component, style)
class Helper extends Align(Color(Echo(Hidden(HTMLElement)))) {
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
    this.setAttribute('slot', 'helper')
    return this
  }
}

export default Helper
