import { css } from '@dom'

const style = (badge) =>
  css`
    :host {
      align-items: center;
      background-color: var(--color-${badge.color}-lighter);
      border-radius: var(--border-radius-pill);
      box-sizing: border-box;
      color: var(--color-${badge.color}-darker);
      display: inline-flex;
      font-family: var(--font-family-base);
      font-size: var(--font-size-xxxs);
      font-weight: var(--font-weight-regular);
      gap: var(--spacing_inset-xs);
      height: 20px;
      justify-content: center;
      line-height: var(--line-height-default);
      padding: 0 var(--spacing-nano);
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
