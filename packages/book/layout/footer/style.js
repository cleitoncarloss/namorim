import { css } from '@dom'

const style = () =>
  css`
    :host {
      align-items: center;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      min-height: 72px;
      padding: var(--spacing_inset-xs);

      nav {
        display: flex;
        gap: var(--spacing_inset-xs);
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
