import { css } from '@dom'

const style = (helper) =>
  css`
    :host {
      box-sizing: border-box;
      color: var(--color-${helper.color});
      display: inline;
      font-family: var(--font-family-base);
      font-size: var(--font-size-xxxs);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-lg);
      text-align: ${helper.align};
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
