import { attributeChanged, define } from '@directive'
import { around } from '@middleware'
import { Headless } from '@mixin'
import { match } from './interfaces'
import resize from './resize'

@define('morph-responsive')
class Responsive extends Headless(HTMLElement) {
  #media

  get media() {
    return (this.#media ??= '')
  }

  @attributeChanged('media')
  @around(match)
  set media(value) {
    this.#media = value
  }

  @resize
  [match]() {
    window.matchMedia(this.media).matches &&
      Array.from(this.attributes)
        .filter(({ name }) => !/^(on|is|class|style|media)$/.test(name))
        .forEach(({ name, value }) => {
          this.parentElement.setAttribute(name, value)
        })
    return this
  }
}

export default Responsive
