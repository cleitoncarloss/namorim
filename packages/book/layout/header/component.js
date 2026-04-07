import { html } from '@dom'

const component = () => {
  return html`
    <heading>
      <slot></slot>
    </heading>
    <actions>
      <slot name="actions"></slot>
    </actions>
  `
}

export default component
