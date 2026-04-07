import { define } from '@directive'
import { paint } from '@dom'
import Echo from '@echo'
import { Align, Hidden } from '@mixin'
import component from './component'
import style from './style'

@define('nm-title')
@paint(component, style)
class Title extends Align(Echo(Hidden(HTMLElement))) {
  #internals

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open', delegatesFocus: true })
  }
}

export default Title
