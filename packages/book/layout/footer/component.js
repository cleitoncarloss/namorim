import { html } from '@dom'

const component = () => {
  return html`
    <nav>
      <slot></slot>
    </nav>
  `
}

export default component
