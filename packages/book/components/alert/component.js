import { html } from '@dom'
import { icons } from './icons'

const component = (alert) => {
  return html`
    <div class="alert-container">
      <morph-icon use="${icons[alert.type]}"></morph-icon>
      <div class="alert-content">
        <slot></slot>
      </div>
    </div>
  `
}

export default component
