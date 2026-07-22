import { define } from "@t2e1/kuba/directive"
import { paint } from "@t2e1/kuba/dom"
import router from "@t2e1/kuba/router"
import renderer from "@t2e1/kuba/renderer"
import component from "./component"
import style from "./style"

@define("nm-sign-in")
@paint(component, style)
class SignIn extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static {
    router('/auth/sign-in', function signIn() {
      renderer('<nm-sign-in></nm-sign-in>')
    })
  }
}

export default SignIn
