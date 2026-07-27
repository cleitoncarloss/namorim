import '@book/components/icon'
import { define, disconnected, formAssociated, formReset } from '@directive'
import attributeChanged, { booleanAttribute } from '@directive/attributeChanged'
import { didPaint, paint } from '@dom'
import Echo from '@echo'
import on, { customEvent, prevent, value } from '@event'
import { around } from '@middleware'
import { Hidden, Template, Width } from '@mixin'
import Siphon, { drain } from '@siphon'
import component from './component'
import Element from './element'
import {
  change,
  closeOnEscape,
  disableable,
  dispatch,
  pick,
  reflectable,
  reportable,
  syncable,
  toggle,
  validatable,
} from './interfaces'
import interpolate from './interpolate'
import style from './style'

@define('nm-select')
@paint(component, style)
class Select extends Echo(Hidden(Siphon(Template(Width(HTMLElement))))) {
  #controller
  #element
  #internals

  get controller() {
    return (this.#controller ??= new AbortController())
  }

  get disabled() {
    return this.element.disabled
  }

  @attributeChanged('disabled', booleanAttribute)
  @around(disableable)
  set disabled(value) {
    this.element.disabled = value
  }

  get element() {
    return (this.#element ??= Element.from(this))
  }

  get form() {
    return this.internals.form
  }

  get id() {
    return this.element.id || this.name
  }

  @attributeChanged('id')
  set id(value) {
    this.element.id = value
  }

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  get name() {
    return this.element.name ?? ''
  }

  @attributeChanged('name')
  set name(value) {
    this.element.name = value
  }

  get placeholder() {
    return this.getAttribute('placeholder') ?? ''
  }

  @attributeChanged('placeholder')
  set placeholder(value) {
    this.element.placeholder = value
  }

  get required() {
    return this.element.required
  }

  @attributeChanged('required', booleanAttribute)
  @around(validatable)
  @around(reflectable)
  set required(value) {
    this.element.required = value
  }

  get validationMessage() {
    return this.internals.validationMessage
  }

  get validity() {
    return this.internals.validity
  }

  get value() {
    return this.element.value
  }

  @attributeChanged('value')
  @around(reflectable)
  @around(validatable)
  @around(dispatch)
  set value(value) {
    this.element.value = value
  }

  get willValidate() {
    return this.internals.willValidate
  }

  static get formAssociated() {
    return true
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open', delegatesFocus: true })
    window.addEventListener(
      'click',
      (event) => {
        if (!event.composedPath().includes(this)) this[closeOnEscape]()
      },
      { signal: this.controller.signal },
    )
  }

  @on.change('select', value)
  [change](val) {
    this.value = val
    this.#syncTrigger()
    return this
  }

  @on.click('.trigger')
  [toggle]() {
    if (this.disabled) return this
    this.internals.states.has('open')
      ? this.internals.states.delete('open')
      : this.internals.states.add('open')
    return this
  }

  @on.click('li[role="option"]', (event, next) => next(event.target))
  [pick](target) {
    const select = this.shadowRoot.querySelector('select')
    select.value = target.dataset.value
    select.dispatchEvent(new Event('change', { bubbles: true }))
    this.internals.states.delete('open')
    return this
  }

  @on.keydown('*', (event, next) => event.key === 'Escape' && next(event))
  [closeOnEscape]() {
    this.internals.states.delete('open')
    return this
  }

  #buildListbox() {
    const select = this.shadowRoot.querySelector('select')
    const listbox = this.shadowRoot.querySelector('.listbox')

    listbox.innerHTML = Array.from(select.options)
      .filter((option) => option.value !== '')
      .map(
        (option) =>
          `<li role="option" data-value="${option.value}" ${option.value === select.value ? 'aria-selected="true"' : ''}>${option.textContent}</li>`,
      )
      .join('')

    this.#syncTrigger()
  }

  #syncTrigger() {
    const select = this.shadowRoot.querySelector('select')
    const label = this.shadowRoot.querySelector('.trigger .value')
    const selected = select.selectedOptions[0]
    const isPlaceholder = !selected || selected.value === ''
    label.textContent = isPlaceholder ? this.placeholder : selected.textContent
    label.classList.toggle('placeholder', isPlaceholder)
  }

  checkValidity() {
    return this.internals.checkValidity()
  }

  [disableable]() {
    this.disabled
      ? this.internals.states.add('disabled')
      : this.internals.states.delete('disabled')
    return this
  }

  [dispatch]() {
    this.dispatchEvent(customEvent('change', this.value))
    return this
  }

  @drain
  render(payload) {
    requestAnimationFrame(() => {
      this.element.innerHTML = [{}]
        .concat(payload)
        .map((data) => interpolate(super.template, data))
        .join('')
      this.element.value = this.getAttribute('value')
    })
    return this
  }

  @disconnected
  remove() {
    super.remove()
    this.controller.abort()
    return this
  }

  reportValidity() {
    return this.internals.reportValidity()
  }

  @formReset
  @around(reflectable)
  reset() {
    this.element.value = ''
    this.removeAttribute('value')
    this.internals.states.delete('invalid')
    this.internals.states.delete('open')
    this.dispatchEvent(new Event('reset'))
    this.#syncTrigger()
    return this
  }

  @didPaint
  [syncable]() {
    this.element.append(...Array.from(this.querySelectorAll('option')))
    this.element.value = this.getAttribute('value') ?? ''
    this.#buildListbox()
    return this
  }

  @on.invalid('*', prevent)
  [validatable]() {
    this.validity.valid
      ? this.internals.states.delete('invalid')
      : this.internals.states.add('invalid')
    return this
  }

  @formAssociated
  [reportable](form) {
    const event = 'formdata'
    const listener = (event) =>
      !this.disabled && event.formData.set(this.name, this.value)
    const options = { signal: this.controller.signal }
    form?.addEventListener?.(event, listener, options)
    return this
  }

  @didPaint
  [reflectable]() {
    const { validationMessage, validity } = this.element
    this.internals.setValidity(validity, validationMessage)
    return this
  }
}

export default Select
