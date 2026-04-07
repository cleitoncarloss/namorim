import attributeChanged, { booleanAttribute } from '@directive/attributeChanged'
import { paint, retouch } from '@dom'
import Echo from '@echo'
import on, { customEvent } from '@event'
import { around } from '@middleware'
import { Disabled, Hidden, Width } from '@mixin'
import component from './component'
import { changed, validatable } from './interface'
import style from './style'

// FIXME: Refatorar a implementacao deste component, pois esta fora do padrao @define('morph-checkbox')
@paint(component, style)
class Checkbox extends Disabled(Echo(Hidden(Width(HTMLElement)))) {
  #checked
  #disabled
  #id
  #internals
  #name
  #required

  get checked() {
    return (this.#checked ??= false)
  }

  @attributeChanged('checked', booleanAttribute)
  @retouch
  set checked(value) {
    this.#checked = value
  }

  get disabled() {
    return (this.#disabled ??= false)
  }

  @attributeChanged('disabled', booleanAttribute)
  @retouch
  set disabled(value) {
    this.#disabled = value
  }

  get id() {
    return (this.#id ??= '')
  }

  @attributeChanged('id')
  set id(value) {
    this.#id = value
  }

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  get name() {
    return (this.#name ??= '')
  }

  @attributeChanged('name')
  set name(value) {
    this.#name = value
  }

  get required() {
    return (this.#required ??= false)
  }

  @attributeChanged('required', booleanAttribute)
  @retouch
  set required(value) {
    this.#required = value
  }

  static get formAssociated() {
    return true
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  @on.change('input[type="checkbox"]')
  @around(changed)
  @around(validatable)
  change(event) {
    this.#checked = event.target.checked
    this.internals.setFormValue(this.#checked ? 'on' : null)
    this.dispatchEvent(customEvent('changed', this.#checked))
    return this
  }

  [changed]() {
    const checkbox = this.shadowRoot?.querySelector('input[type="checkbox"]')
    if (!checkbox) return this
    this.#checked = checkbox.checked
    return this
  }

  [validatable]() {
    const checkbox = this.shadowRoot?.querySelector('input[type="checkbox"]')
    if (!checkbox) return this

    if (this.required && !this.#checked) {
      this.internals.setValidity(
        { valueMissing: true },
        'Please check this box if you want to proceed',
        checkbox,
      )
    } else {
      this.internals.setValidity({})
    }
    return this
  }

  checkValidity() {
    return this.internals.checkValidity()
  }

  reportValidity() {
    return this.internals.reportValidity()
  }
}

export default Checkbox
