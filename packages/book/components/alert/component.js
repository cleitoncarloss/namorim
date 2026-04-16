import { html } from '@dom'
import { icons } from './icons'

const component = (alert) => {
  return html`
    <div class="alert-container">
      <nm-icon use="${icons[alert.type]}"></nm-icon>
      <div class="alert-content">
        <slot></slot>
      </div>
    </div>
  `
}

export default component
