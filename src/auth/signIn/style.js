import { css } from '@t2e1/kuba/dom'

const style = () =>
  css`
    :host {
      box-sizing: border-box;
      margin: 0;
      padding: 0;

      kb-main {
        aling-items: center;
        justify-content: center;
        min-height: 100svh;
        padding: 0 var(--spacing-xxs);

        figure {
          margin: 0;
        }

        a {
          color: var(--color-primary);
        }
      }
    }
  `

export default style
