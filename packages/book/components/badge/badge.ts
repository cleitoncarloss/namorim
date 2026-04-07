import { define } from '@directive'
import { paint } from '@dom'
import Echo from '@echo'
import { Color, Hidden } from '@mixin'
import component from './component'
import style from './style'

@define('morph-badge')
@paint(component, style)
class Badge extends Color(Echo(Hidden(HTMLElement))) {
  #internals

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open', delegatesFocus: true })
  }
}

export default Badge
