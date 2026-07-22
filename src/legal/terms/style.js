import { css } from '@t2e1/kuba/dom'

const style = () =>
  css`
    :host {
      box-sizing: border-box;
      margin: 0;
      padding: 0;

      kb-main {
        justify-content: flex-start;
        min-height: 100svh;
        padding: var(--spacing-xxs);

        a {
          color: var(--color-primary);
        }
      }
    }
  `

export default style
