import { css } from '@dom'

const style = (link) =>
  css`
    :host {
      box-sizing: border-box;
      display: inline-flex;

      a {
        color: var(--color-primary);
        cursor: pointer;
        display: inline-flex;
        font-family: var(--font-family-base);
        font-size: var(--font-size-xxs);
        font-weight: var(--font-weight-medium);
        line-height: var(--line-height-lg);
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
