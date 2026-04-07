import { css } from '@dom'

const style = (label) =>
  css`
    :host {
      box-sizing: border-box;
      color: var(--color-neutral-dark);
      display: inline-flex;
      font-family: var(--font-family-base);
      font-size: var(--font-size-xxs);
      font-weight: var(--font-weight-medium);
      line-height: var(--line-height-default);
      text-align: ${label.align};
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
