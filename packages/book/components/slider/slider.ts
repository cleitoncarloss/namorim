import { define } from '@directive'
import attributeChanged from '@directive/attributeChanged'
import { paint, retouch } from '@dom'
import Echo from '@echo'
import on, { customEvent } from '@event'
import { Disabled, Hidden, Width } from '@mixin'
import component from './component'
import style from './style'

@define('morph-slider')
@paint(component, style)
class Slider extends Disabled(Echo(Hidden(Width(HTMLElement)))) {
  #internals
  #max
  #min
  #name
  #step
  #value

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  get max() {
    return Number((this.#max ??= '100'))
  }

  @attributeChanged('max')
  @retouch
  set max(value) {
    this.#max = value
  }

  get min() {
    return Number((this.#min ??= '0'))
  }

  @attributeChanged('min')
  @retouch
  set min(value) {
    this.#min = value
  }

  get name() {
    return (this.#name ??= '')
  }

  @attributeChanged('name')
  set name(value) {
    this.#name = value
  }

  get step() {
    return (this.#step ??= '1')
  }

  @attributeChanged('step')
  @retouch
  set step(value) {
    this.#step = value
  }

  get value() {
    return Number((this.#value ??= '0'))
  }

  @attributeChanged('value')
  @retouch
  set value(value) {
    this.#value = value
    this.updateProgress()
  }

  get normalized() {
    const val = this.value
    const minVal = this.min
    const maxVal = this.max
    return (val - minVal) / (maxVal - minVal)
  }

  get progress() {
    return this.normalized * 100
  }

  static get formAssociated() {
    return true
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.updateProgress()
  }

  @on.input('input[type="range"]')
  change(event) {
    this.value = event.target.value
    this.internals.setFormValue(this.value)
    this.dispatchEvent(customEvent('change', this.value))
    return this
  }

  updateProgress() {
    this.style.setProperty('--slider-progress', `${this.progress}%`)
  }
}

export default Slider
