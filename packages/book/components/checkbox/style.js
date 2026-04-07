import { css } from '@dom'

const style = (checkbox) =>
  css`
    :host {
      align-items: flex-start;
      box-sizing: border-box;
      display: flex;
      gap: var(--spacing-xs);
      width: ${checkbox.width};
    }

    input[type="checkbox"] {
      appearance: none;
      background-color: var(--color-pure-white);
      border: var(--border-width-thin) solid var(--color-neutral);
      border-radius: var(--border-radius-xs);
      cursor: pointer;
      display: block;
      flex-shrink: 0;
      height: 16px;
      margin-top: var(--spacing-nano);
      position: relative;
      width: 16px;
    }

    input[type="checkbox"]:checked {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
    }

    input[type="checkbox"]:checked::after {
      border: solid var(--color-pure-white);
      border-width: 0 2px 2px 0;
      content: '';
      display: block;
      height: 8px;
      left: 4px;
      position: absolute;
      top: 2px;
      transform: rotate(45deg);
      width: 4px;
    }

    input[type="checkbox"]:hover {
      border-color: var(--color-neutral-dark);
    }

    input[type="checkbox"]:focus {
      border-color: var(--color-primary);
      outline: none;
    }

    input[type="checkbox"]:disabled {
      background-color: var(--color-neutral-lighter);
      cursor: not-allowed;
      opacity: var(--opacity-level-medium);
    }

    label {
      color: var(--color-neutral-dark);
      cursor: pointer;
      font-family: var(--font-family-base);
      font-size: var(--font-size-xxs);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-default);
      user-select: none;
    }

    :host(:state(hidden)) {
      display: none;
    }

    :host(:state(invalid)) {
      input[type="checkbox"] {
        border-color: var(--color-danger);
      }
    }

    ::slotted([slot="helper"]) {
      color: var(--color-neutral-dark);
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
