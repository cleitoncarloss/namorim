import { css } from '@dom'

const style = () =>
  css`
    :host {
      align-items: center;
      box-sizing: border-box;
      color: var(--color-master-dark);
      display: flex;
      gap: var(--spacing_inset-xs);
      height: 72px;
      justify-content: space-between;
      padding: var(--spacing_inset-xs);
      width: 100%;

      heading {
        align-items: center;
        display: flex;
        gap: var(--spacing_inset-xs);
      }

      actions {
        align-items: center;
        display: flex;
        gap: var(--spacing_inset-xs);
        justify-content: end;
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `

export default style
