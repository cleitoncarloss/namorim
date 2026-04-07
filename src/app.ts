import { connected, define } from '@directive'
import { paint, renderer } from '@dom'
import router from '@router'
import component from './component'
import { mountable } from './interfaces'
import style from './style'

@define('nm-app')
@paint(component, style)
class App extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open', delegatesFocus: true })
  }

  @connected
  [mountable]() {
    renderer.bind(this.shadowRoot)
    router.handle()
    return this
  }
}

export default App
