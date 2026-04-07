import { attributeChanged, define } from '@directive'
import { paint, repaint, retouch } from '@dom'
import Echo from '@echo'
import on, { customEvent, stop } from '@event'
import { Hidden } from '@mixin'
import { component } from './component'
import { style } from './style'

@define('nm-icon')
@paint(component, style)
class Icon extends Echo(Hidden(HTMLElement)) {
  #color
  #internals
  #use
  #value

  get color() {
    return this.#color ? `var(--color-${this.#color}-light)` : 'currentcolor'
  }

  @attributeChanged('color')
  @retouch
  set color(value) {
    this.#color = value
  }

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  get use() {
    return (this.#use ??= '')
  }

  @attributeChanged('use')
  @repaint
  set use(value) {
    this.#use = value
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
    this.attachShadow({ mode: 'open' })
  }

  @on.click('*', stop)
  click() {
    this.dispatchEvent(customEvent('clicked', this.value))
    return this
  }
}

export default Icon
