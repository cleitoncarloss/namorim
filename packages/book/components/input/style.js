import { css } from '@dom'

const style = (input) =>
  css`
		:host {
			align-items: start;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			gap: var(--spacing-nano);
			width: ${input.width};
			width: var(--width-${input.width}, ${input.width});

			input {
				appearance: none;
				background-color: var(--color-tertiary-lighter);
				border: var(--border-width-hairline) solid var(--color-neutral-lighter);
				border-radius: var(--border-radius-sm);
				box-sizing: border-box;
				color: var(--color-neutral-dark);
				font-family: var(--font-family-base);
				font-size: var(--font-size-xxs);
				font-weight: var(--font-weight-regular);
				height: 40px;
				line-height: var(--line-height-default);
				padding: var(--spacing_inset-nano) var(--spacing_inset-xs);
				transition: border-color 0.2s ease-in-out;
				width: 100%;

				&:active,
				&:hover {
					outline: 0;
				}

				&:focus {
					border-color: var(--color-primary);
					outline: 0;
				}

				&:disabled,
				&:read-only {
					background-color: var(--color-neutral-lighter);
					border-color: var(--color-neutral-light);
					box-shadow: none;
					color: var(--color-neutral-light);
				}

				&::placeholder {
					color: var(--color-neutral-light);
				}

				&:-webkit-autofill,
				&:-webkit-autofill:hover,
				&:-webkit-autofill:focus,
				&:-webkit-autofill:active {
					transition: background-color 9999999999s ease-in-out 0s;
				}
			}

			input[type='number']::-webkit-inner-spin-button,
			input[type='number']::-webkit-outer-spin-button {
				appearance: none;
				margin: 0;
			}
		}

		:host(:state(hidden)) {
			display: none;
		}

		:host(:state(invalid)) {
			input {
				border-color: var(--color-danger);
			}

			slot[name='helper'] {
				display: none;
			}
		}
	`

export default style
