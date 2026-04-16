import { html } from '@dom'

const component = (select) => html`
  <label for="${select.id}">
    <slot name="label"></slot>
  </label>
  <div class="wrapper">
    <select
      ${select.id ? `id="${select.id}"` : ''}
      ${select.name ? `name="${select.name}"` : ''}
      ${select.value ? `value="${select.value}"` : ''}
      ${select.disabled ? 'disabled' : ''}
      ${select.required ? 'required' : ''}
    >
      <option value=""></option>
      <slot></slot>
    </select>
    <nm-icon use="keyboard_arrow_down"></nm-icon>
  </div>
  <slot name="helper"></slot>
  <slot name="validity"></slot>
`

export default component
