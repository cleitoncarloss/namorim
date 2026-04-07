import { css } from '@dom'

const style = (heading) =>
  css`
    :host {
      box-sizing: border-box;
      color: var(--color-${heading.color}-darker);
      display: inline-flex;
      font-family: var(--font-family-highlight);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-md);
      text-align: ${heading.align};
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
