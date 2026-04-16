import { css } from '@dom'

const style = (text) =>
  css`
    :host {
      box-sizing: border-box;
      color: var(--color-${text.color});
      font-family: var(--font-family-base);
      font-size: var(--font-size-xxs);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-lg);
      text-align: ${text.align};
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
