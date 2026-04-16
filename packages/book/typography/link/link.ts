import { attributeChanged, define } from '@directive'
import { paint } from '@dom'
import Echo from '@echo'
import on, { prevent } from '@event'
import { Hidden } from '@mixin'
import component from './component'
import style from './style'

@define('nm-link')
@paint(component, style)
class Link extends Echo(Hidden(HTMLElement)) {
  #href
  #internals

  get href() {
    return (this.#href ??= '#')
  }

  @attributeChanged('href')
  set href(value) {
    this.#href = value
  }

  get internals() {
    return (this.#internals ??= this.attachInternals())
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open', delegatesFocus: true })
  }

  @on.clicked('*', prevent)
  clicked() {
    history.pushState({}, '', this.href)
    return this
  }
}

export default Link
