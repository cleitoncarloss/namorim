import { connected, define, disconnected } from '@directive'
import attributeChanged from '@directive/attributeChanged'
import { paint, repaint, retouch } from '@dom'
import Echo from '@echo'
import { customEvent } from '@event'
import { Hidden } from '@mixin'
import component from './component'
import style from './style'

@define('morph-alert')
@paint(component, style)
class Alert extends Echo(Hidden(HTMLElement)) {
  #type
  #duration
  #internals
  #timeoutId

  get type() {
    return (this.#type ??= 'info')
  }

  @attributeChanged('type')
  @retouch
  set type(value) {
    this.#type = value
  }

  get duration() {
    return (this.#duration ??= 5000)
  }

  @attributeChanged('duration')
  set duration(value) {
    this.#duration = value ? parseInt(value, 10) : 5000
  }

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open', delegatesFocus: true })
  }

  @connected
  scheduleAutoDismiss() {
    this.clearTimer()
    if (this.duration > 0) {
      this.#timeoutId = setTimeout(() => {
        this.hidden = true
        this.dispatchEvent(customEvent('dismissed', this))
      }, this.duration)
    }
    return this
  }

  @disconnected
  clearTimer() {
    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId)
      this.#timeoutId = null
    }
    return this
  }

  @repaint
  show() {
    this.removeAttribute('hidden')
    this.dispatchEvent(customEvent('show', this))
    if (this.duration > 0) {
      this.scheduleAutoDismiss()
    }
    return this
  }

  @repaint
  hide() {
    this.clearTimer()
    this.setAttribute('hidden', '')
    this.dispatchEvent(customEvent('hide', this))
    return this
  }
}

export default Alert
