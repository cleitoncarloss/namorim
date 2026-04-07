import { define } from '@directive'
import { paint } from '@dom'
import Echo from '@echo'
import on, { stop } from '@event'
import { Hidden } from '@mixin'
import component from './component'
import style from './style'

@define('morph-menu')
@paint(component, style)
class Menu extends Echo(Hidden(HTMLElement)) {
  #internals

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  @on.mouseleave('*', stop)
  hide() {
    this.internals.states.delete('opened')
    return this
  }

  show() {
    this.internals.states.add('opened')
    return this
  }
}

export default Menu
