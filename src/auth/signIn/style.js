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
      justify-content: center;
      min-height: 100svh;
    }

    nm-stack {
      max-width: 430px;
      margin: 0 auto;
    }
  `

export default style
