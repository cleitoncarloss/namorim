import { define } from "@t2e1/kuba/directive"
import { paint } from "@t2e1/kuba/dom"
import router from "@t2e1/kuba/router"
import renderer from "@t2e1/kuba/renderer"
import component from "./component"
import style from "./style"

@define("nm-privacy-policy")
@paint(component, style)
class PrivacyPolicy extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static {
    router('/privacy-policy', function privacyPolicy() {
      renderer('<nm-privacy-policy></nm-privacy-policy>')
    })
  }
}

export default PrivacyPolicy
