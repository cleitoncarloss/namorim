import { attributeChanged, define } from '@directive'
import { paint, retouch } from '@dom'
import Echo from '@echo'
import { Height, Hidden, Width } from '@mixin'
import component from './component'
import style from './style'

@define('nm-card')
@paint(component, style)
class Card extends Echo(Height(Hidden(Width(HTMLElement)))) {
  #direction
  #internals

  get direction() {
    return (this.#direction ??= 'column')
  }

  @attributeChanged('direction')
  @retouch
  set direction(value) {
    this.#direction = value
  }

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open', delegatesFocus: true })
  }
}

export default Card
