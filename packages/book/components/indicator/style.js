import { css } from '@dom'

const style = () =>
  css`
    :host {
      box-sizing: border-box;
      display: inline-flex;

      span {
        align-items: center;
        color: var(--color-master-dark);
        display: flex;
        font-family: var(--font-family-base);
        font-size: var(--font-size-xxs);
        font-weight: var(--font-weight-medium);
        gap: var(--spacing-nano);
        position: relative;

        &::after {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          background-color: var(--color-primary);
          border-radius: var(--border-radius-circular);
          content: "";
          height: 12px;
          left: 0;
          position: absolute;
          top: 0;
          width: 12px;
          z-index: 1;
        }

        &::before {
          background-color: var(--color-primary-dark);
          border-radius: var(--border-radius-circular);
          content: "";
          flex-shrink: 0;
          height: 12px;
          position: relative;
          width: 12px;
          z-index: 2;
        }
      }
    }

    :host(:state(hidden)) {
      display: none;
    }


    @keyframes ping {
      0% {
        opacity: 0.8;
        transform: scale(1);
      }

      100% {
        opacity: 0;
        transform: scale(2.5);
      }
    }
  `

export default style
