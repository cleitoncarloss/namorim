import { define } from '@directive'
import { paint, renderer } from '@dom'
import router from '@router'
import component from './component'
import Navigate from './navigate'
import style from './style'

@define('nm-sign-in')
@paint(component, style)
class SignIn extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open', delegatesFocus: true })
  }

  static {
    router('/auth/sign-in', function signIn() {
      renderer('<nm-sign-in></nm-sign-in>')
    })
  }
}

export default SignIn
