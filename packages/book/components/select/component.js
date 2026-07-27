import { html } from '@dom'

const component = (select) => html`
  <label for="${select.id}">
    <slot name="label"></slot>
  </label>
  <div class="wrapper">
    <button type="button" class="trigger" aria-haspopup="listbox">
      <span class="value">${select.placeholder ?? ''}</span>
    </button>
    <select
      ${select.id ? `id="${select.id}"` : ''}
      ${select.name ? `name="${select.name}"` : ''}
      ${select.value ? `value="${select.value}"` : ''}
      ${select.disabled ? 'disabled' : ''}
      ${select.required ? 'required' : ''}
      tabindex="-1"
      aria-hidden="true"
    >
      <option value="">${select.placeholder ?? ''}</option>
      <slot></slot>
    </select>
    <ul class="listbox" role="listbox"></ul>
    <nm-icon use="keyboard_arrow_down"></nm-icon>
  </div>
  <slot name="helper"></slot>
  <slot name="validity"></slot>
`

export default component
