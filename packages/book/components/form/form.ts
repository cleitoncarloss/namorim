import { connected, define } from '@directive'
import { paint, repaint } from '@dom'
import Echo from '@echo'
import on, { customEvent, formData, prevent, stop } from '@event'
import { Hidden, Template } from '@mixin'
import Siphon, { drain } from '@siphon'
import component from './component'
import { render, resetted, submitted } from './interfaces'
import interpolate from './interpolate'
import style from './style'

@define('morph-form')
@paint(component, style)
class Form extends Echo(Hidden(Siphon(Template(HTMLElement)))) {
  #internals
  #textContent

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  get textContent() {
    return (this.#textContent ??= '')
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  @drain
  @connected
  @repaint
  [render](payload) {
    requestAnimationFrame(() => {
      this.#textContent = interpolate(super.template, payload)
    })
    return this
  }

  reset() {
    const form = this.shadowRoot.querySelector('form')
    form.dispatchEvent(new Event('reset', { bubbles: true, cancelable: true }))
    return this
  }

  @on.reset('form', stop)
  [resetted]() {
    this.dispatchEvent(customEvent('resetted', {}))
    return this
  }

  submit() {
    const form = this.shadowRoot.querySelector('form')
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    return this
  }

  @on.submit('form', prevent, stop, formData)
  [submitted](data) {
    this.dispatchEvent(customEvent('submitted', data))
    return this
  }
}

export default Form
