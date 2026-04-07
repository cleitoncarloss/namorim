import { html } from '@dom'

const component = (checkbox) => html`
  <input
    type="checkbox"
    ${checkbox.id ? `id="${checkbox.id}"` : ''}
    ${checkbox.name ? `name="${checkbox.name}"` : ''}
    ${checkbox.checked ? 'checked' : ''}
    ${checkbox.disabled ? 'disabled' : ''}
    ${checkbox.required ? 'required' : ''}
  />
  <label ${checkbox.id ? `for="${checkbox.id}"` : ''}>
    <slot name="label"></slot>
  </label>
  <slot name="helper"></slot>
`

export default component
