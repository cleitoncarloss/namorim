import { css } from '@dom'

const style = (caption) =>
  css`
    :host {
      box-sizing: border-box;
      color: var(--color-${caption.color});
      display: inline-flex;
      font-family: var(--font-family-base);
      font-size: var(--font-size-xxs);
      font-style: italic;
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-lg);
      text-align: ${caption.align};
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
