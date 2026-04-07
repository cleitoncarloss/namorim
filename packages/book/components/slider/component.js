import { html } from '@dom'

const component = (slider) => html`
  <label>
    <slot name="label"></slot>
  </label>
  <input
    type="range"
    min="${slider.min}"
    max="${slider.max}"
    step="${slider.step}"
    value="${slider.value}"
    ${slider.name ? `name="${slider.name}"` : ''}
    ${slider.disabled ? 'disabled' : ''}
  />
  <slot name="helper"></slot>
`

export default component
