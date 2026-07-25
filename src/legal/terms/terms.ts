import { define } from "@t2e1/kuba/directive"
import { paint } from "@t2e1/kuba/dom"
import router from "@router"
import renderer from "@t2e1/kuba/renderer"
import component from "./component"
import style from "./style"

@define("nm-terms")
@paint(component, style)
class Terms extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static {
    router('/terms', function terms() {
      renderer('<nm-terms></nm-terms>')
    })
  }
}

export default Terms
