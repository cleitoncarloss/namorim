import { css } from '@dom'

const style = () =>
  css`
    :host {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      height: 100dvh;
    }

    main {
      align-items: center;
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: var(--spacing_inset-giant);
      justify-content: center;
    }

    div {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: var(--spacing-xxxl);
      width: 100%;
    }

    nav {
      display: flex;
      flex-direction: column;
      gap: var(--spacing_inset-xs);
      width: 100%;
    }
  `

export default style
