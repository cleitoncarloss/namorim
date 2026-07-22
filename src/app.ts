import { connected, define } from "@t2e1/kuba/directive"
import { paint } from "@t2e1/kuba/dom"
import router from "@t2e1/kuba/router"
import component from './component'
import { mountable } from './interfaces'

@define('nm-app')
@paint(component)
class App extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open', delegatesFocus: true })
  }

  @connected
  [mountable]() {
    requestAnimationFrame(() => router.handle())
    return this
  }
}

export default App
