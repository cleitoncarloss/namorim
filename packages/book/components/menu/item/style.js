import { css } from '@dom'

const style = () => {
  return css`
    :host {
      align-items: center;
      border-radius: var(--border-radius-sm);
      box-sizing: border-box;
      color: var(--color-master-dark);
      cursor: pointer;
      display: flex;
      font-family: var(--font-family-base);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-regular);
      gap: var(--spacing_inset-nano);
      height: 40px;
      overflow: hidden;
      padding: 0 var(--spacing_inset-xs);
      position: relative;
      text-align: left;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :host(:hover) {
      background-color: var(--color-master-lighter);
    }

    :host(:state(hidden)) {
      display: none;
    }

    ::slotted(*) {
      pointer-events: none;
    }
  `
}

export default style
