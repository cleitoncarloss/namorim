import { define } from '@directive'
import { paint } from '@dom'
import Echo from '@echo'
import { Align, Color, Hidden } from '@mixin'
import component from './component'
import style from './style'

@define('nm-heading')
@paint(component, style)
class Heading extends Align(Color(Echo(Hidden(HTMLElement)))) {
  #internals

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open', delegatesFocus: true })
  }
}

export default Heading
