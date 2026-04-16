import { css } from '@dom'

const style = (button) => {
  const colorVar = `--color-${button.color}`
  const colorDark = `--color-${button.color}-dark`
  const colorDarker = `--color-${button.color}-darker`
  const colorLight = `--color-${button.color}-light`
  const colorLighter = `--color-${button.color}-lighter`

  return css`
    :host {
      --button-color: var(${colorVar});
      --button-color-dark: var(${colorDark});
      --button-color-darker: var(${colorDarker});
      --button-color-light: var(${colorLight});
      --button-color-lighter: var(${colorLighter});

      display: inline-flex;
      box-sizing: border-box;
      width: ${button.icononly ? '40px' : button.width};
    }

    button {
      align-items: center;
      background-color: var(--button-color);
      border: var(--border-width-hairline) solid var(--button-color);
      border-radius: var(--border-radius-sm);
      color: var(--color-pure-white);
      cursor: pointer;
      display: flex;
      font-family: var(--font-family-base);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-${button.weight});
      gap: var(--spacing-nano);
      height: 50px;
      justify-content: center;
      line-height: var(--line-height-default);
      padding: 0 var(--spacing_inset-xs);
      width: 100%;
      transition: all 0.2s ease-in-out;
    }

    button:hover:not(:disabled) {
      background-color: var(--button-color-dark);
      border-color: var(--button-color-dark);
    }

    button:active:not(:disabled) {
      background-color: var(--button-color-darker);
      border-color: var(--button-color-darker);
    }

    :host([variant="outlined"]) button {
      background-color: transparent;
      border-color: var(--button-color);
      color: var(--button-color);
    }

    :host([variant="outlined"]) button:hover:not(:disabled) {
      background-color: var(--button-color-light);
      color: var(--button-color-darker);
    }

    :host([variant="tonal"]) button {
      background-color: var(--button-color-lighter);
      border-color: var(--button-color-lighter);
      color: var(--button-color);
    }

    :host([variant="tonal"]) button:hover:not(:disabled) {
      background-color: var(--button-color-light);
      border-color: var(--button-color-light);
      color: var(--button-color-darker);
    }

    :host([variant="tonal-outlined"]) button {
      background-color: var(--button-color-lighter);
      border-color: var(--color-neutral-lighter);
      color: var(--color-secondary);
    }

    :host([variant="tonal-outlined"]) button:hover:not(:disabled) {
      background-color: var(--color-tertiary-dark);
      border-color: var(--color-tertiary-dark);
    }

    :host([variant="text"]) button {
      background-color: transparent;
      border-color: transparent;
      color: var(--button-color);
    }

    :host([variant="text"]) button:hover:not(:disabled) {
      background-color: var(--button-color-lighter);
    }

    :host(:state(disabled)) button {
      opacity: var(--opacity-level-medium);
      cursor: not-allowed;
    }

    :host(:state(hidden)) {
      display: none;
    }

    ::slotted(*) {
      pointer-events: none;
    }
  `
}

export default style
