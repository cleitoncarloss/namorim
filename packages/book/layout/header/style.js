import { css } from '@dom'

const style = () =>
  css`
    :host {
      align-items: center;
      box-sizing: border-box;
      display: flex;
      height: 72px;
      padding: var(--spacing_inset-xs);
      width: 100%;
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
