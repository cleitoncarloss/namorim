import { css } from '@dom'

const style = () => {
  return css`
    :host {
      background-color: var(--color-master-lightest);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-level-2);
      display: none;
      flex-direction: column;
      gap: var(--spacing_inset-quarck);
      padding: var(--spacing_inset-nano);
      position: absolute;
      right: 0;
      top: 48px;
      width: 200px;
      z-index: 1000;
    }

    :host(:state(opened)) {
      display: flex;
    }
  `
}

export default style
