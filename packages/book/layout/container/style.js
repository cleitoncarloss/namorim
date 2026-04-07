import { css } from '@dom'

const style = (container) =>
  css`
    :host {
      box-sizing: border-box;
      display: flex;
      margin: 0 auto;
      max-width: 1444px;
      padding: 0 var(--spacing_inset-xs);
      width: 100%;
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
