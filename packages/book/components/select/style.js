import { css } from '@dom'

const style = (select) =>
  css`
    :host {
      align-items: flex-start;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-nano);
      width: ${select.width};
			width: var(--width-${select.width}, ${select.width});
    }

    .wrapper {
      position: relative;
      width: 100%;
    }

    select {
      appearance: none;
			background-color: var(--color-tertiary);
			border: var(--border-width-hairline) solid var(--color-tertiary-dark);
      border-radius: var(--border-radius-sm);
			box-sizing: border-box;
      color: var(--color-neutral-dark);
      cursor: pointer;
      font-family: var(--font-family-base);
      font-size: var(--font-size-xxs);
      font-weight: var(--font-weight-regular);
      height: 46px;
      line-height: var(--line-height-default);
      padding: var(--spacing_inset-nano) var(--spacing_inset-xs);
      width: 100%;

      &:active,
      &:hover {
        outline: 0;
      }

      &:focus {
        border-color: var(--color-primary);
        outline: 0;
      }

      &:disabled {
        background-color: var(--color-master-lighter);
        border-color: var(--color-master-light);
        box-shadow: none;
        color: var(--color-master);
      }

      &:invalid {
        color: var(--color-secondary-light);
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        transition: background-color 9999999999s ease-in-out 0s;
      }
    }

    nm-icon {
      color: var(--color-secondary-light);
      pointer-events: none;
      position: absolute;
      right: var(--spacing-xxxs);
      top: 50%;
      transform: translateY(-50%);
    }

		:host(:state(hidden)) {
			display: none;
		}

		:host(:state(invalid)) {
			select {
				border-color: var(--color-danger);
			}

			slot[name='helper'] {
				display: none;
			}
		}
  `

export default style
