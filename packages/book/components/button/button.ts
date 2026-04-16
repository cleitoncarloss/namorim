import { define } from '@directive'
import attributeChanged, { booleanAttribute } from '@directive/attributeChanged'
import { paint, retouch } from '@dom'
import Echo from '@echo'
import on, { customEvent, stop } from '@event'
import { around } from '@middleware'
import { Disabled, Hidden, Width, Weight } from '@mixin'
import component from './component'
import { emitter } from './interface'
import style from './style'

@define('nm-button')
@paint(component, style)
class Button extends Disabled(Echo(Hidden(Width(Weight(HTMLElement))))) {
  #weight
  #color
  #internals
  #type
  #value
  #icononly

  get color() {
    return (this.#color ??= 'primary')
  }

  @attributeChanged('color')
  @retouch
  set color(value) {
    this.#color = value
  }

  get weight() {
    return (this.#weight ??= 'regular')
  }

  @attributeChanged('weight')
  @retouch
  set weight(value) {
    this.#weight = value
  }

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  get type() {
    return (this.#type ??= 'submit')
  }

  @attributeChanged('type')
  set type(value) {
    this.#type = value
  }

  get icononly() {
    return (this.#icononly ??= false)
  }

  @attributeChanged('icononly', booleanAttribute)
  @retouch
  set icononly(value) {
    this.#icononly = value
  }

  get value() {
    return this.#value
  }

  @attributeChanged('value')
  set value(value) {
    this.#value = value
  }

  static get formAssociated() {
    return true
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open', delegatesFocus: true })
  }

  @on.click('*', stop)
  @around(emitter)
  click() {
    if (super.disabled) return this
    this.dispatchEvent(customEvent('clicked', this.value))
    return this
  }

  [emitter]() {
    if (super.disabled) return this
    ;({
      reset: () => this.internals.form?.reset?.(),
      submit: () => this.internals.form?.requestSubmit?.(),
    })[this.type]?.()
    return this
  }
}

export default Button
