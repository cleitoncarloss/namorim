import { css } from '@dom'

const style = (hgroup) =>
  css`
    :host {
      align-items: ${hgroup.align};
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--spacing_inset-quarck);
      width: ${hgroup.width};
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
