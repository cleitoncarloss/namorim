import { css } from '@dom'

const style = (stack) =>
  css`
    :host {
      align-items: ${stack.align};
      box-sizing: border-box;
      display: flex;
      flex-direction: ${stack.direction};
      gap: ${stack.gap};
      height: ${stack.height};
      justify-content: ${stack.justify};
      width: ${stack.width};
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
