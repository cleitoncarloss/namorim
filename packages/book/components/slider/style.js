import { css } from '@dom'

const style = (slider) =>
  css`
    :host {
      --slider-progress: 0%;

      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-nano);
      width: ${slider.width};
    }

    label {
      color: var(--color-master-dark);
      display: block;
      font-family: var(--font-family-base);
      font-size: var(--font-size-xxs);
      font-weight: var(--font-weight-medium);
      line-height: var(--line-height-default);
      user-select: none;
    }

    input[type='range'] {
      appearance: none;
      background: linear-gradient(
        to right,
        var(--color-primary) 0%,
        var(--color-primary) var(--slider-progress),
        var(--color-master-light) var(--slider-progress),
        var(--color-master-light) 100%
      );
      border-radius: var(--border-radius-pill);
      cursor: pointer;
      height: 2px;
      width: 100%;
    }

    input[type='range']::-webkit-slider-thumb {
      appearance: none;
      background-color: var(--color-primary);
      border-radius: 50%;
      cursor: pointer;
      height: 20px;
      width: 20px;
    }

    input[type='range']::-moz-range-thumb {
      background-color: var(--color-primary);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      height: 20px;
      width: 20px;
    }

    input[type='range']:focus {
      outline: none;
    }

    input[type='range']:disabled {
      cursor: not-allowed;
      opacity: var(--opacity-level-medium);
    }

    :host(:state(hidden)) {
      display: none;
    }

    :host(:state(disabled)) input[type='range'],
    :host(:state(disabled)) label {
      opacity: var(--opacity-level-medium);
    }

    ::slotted([slot='helper']) {
      color: var(--color-master);
      display: block;
      font-family: var(--font-family-base);
      font-size: var(--font-size-xxxs);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-default);
      margin-top: var(--spacing-nano);
      width: 100%;
    }
  `

export default style
