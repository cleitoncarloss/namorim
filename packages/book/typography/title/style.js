import { css } from '@dom'

const style = (title) =>
  css`
    :host {
      box-sizing: border-box;
      color: var(--color-neutral-darker);
      display: inline-flex;
      font-family: var(--font-family-highlight);
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-md);
      text-align: ${title.align};
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
