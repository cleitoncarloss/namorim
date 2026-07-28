import { define } from "@t2e1/kuba/directive"
import { paint } from "@t2e1/kuba/dom"
import router from "@router"
import renderer from "@t2e1/kuba/renderer"
import component from "./component"
import style from "./style"
import on, { detail } from "@event"

@define("nm-identity")
@paint(component, style)
class Identity extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static {
    router('/auth/identity', function Identity() {
      renderer('<nm-identity></nm-identity>')
    })
  }
}

export default Identity 
