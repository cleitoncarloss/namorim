import { css } from '@dom'

const style = (stack) =>
  css`
    :host {
      align-items: ${stack.align};
      box-sizing: border-box;
      display: flex;
      flex-direction: ${stack.direction};
      gap: var(--spacing_inset-xs);
      height: ${stack.height};
      justify-content: ${stack.justify};
      width: ${stack.width};
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
