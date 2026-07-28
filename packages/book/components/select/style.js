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
      clip: rect(0 0 0 0);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    .trigger {
      align-items: center;
			background-color: var(--color-tertiary);
			border: var(--border-width-hairline) solid var(--color-tertiary-dark);
      border-radius: var(--border-radius-sm);
			box-sizing: border-box;
      color: var(--color-neutral-dark);
      cursor: pointer;
      display: flex;
      font-family: var(--font-family-base);
      font-size: var(--font-size-xxs);
      font-weight: var(--font-weight-regular);
      height: 46px;
      line-height: var(--line-height-default);
      padding: var(--spacing_inset-nano);
      text-align: left;
      width: 100%;

      .value {
        overflow: hidden;
        pointer-events: none;
        text-overflow: ellipsis;
        white-space: nowrap;

        &.placeholder {
          color: var(--color-secondary-light);
        }
      }

      &:focus,
      &:focus-visible {
        border-color: var(--color-primary);
        outline: 0;
      }
    }

    :host(:state(disabled)) .trigger {
      background-color: var(--color-master-lighter);
      border-color: var(--color-master-light);
      color: var(--color-master);
      cursor: not-allowed;
    }

    .listbox {
      background-color: var(--color-tertiary);
      border: var(--border-width-hairline) solid var(--color-tertiary-dark);
      border-radius: var(--border-radius-sm);
      box-sizing: border-box;
      display: none;
      list-style: none;
      margin: var(--spacing-nano) 0 0;
      max-height: 240px;
      overflow-y: auto;
      padding: var(--spacing_inset-nano) 0;
      position: absolute;
      top: 100%;
      width: 100%;
      z-index: 10;

      li {
        color: var(--color-neutral-dark);
        cursor: pointer;
        font-family: var(--font-family-base);
        font-size: var(--font-size-xxs);
        font-weight: var(--font-weight-regular);
        line-height: var(--line-height-default);
        padding: var(--spacing_inset-nano) var(--spacing_inset-xs);

        &:hover {
          background-color: var(--color-tertiary-dark);
        }

        &[aria-selected='true'] {
          background-color: var(--color-primary-lighter, var(--color-tertiary-dark));
          color: var(--color-primary);
          font-weight: var(--font-weight-medium);
        }
      }
    }

    nm-icon {
      color: var(--color-secondary-light);
      pointer-events: none;
      position: absolute;
      right: var(--spacing-nano);
      top: 50%;
      transform: translateY(-50%);
      transition: transform 0.15s ease;
    }

		:host(:state(hidden)) {
			display: none;
		}

    :host(:state(open)) {
      .listbox {
        display: block;
      }

      nm-icon {
        transform: translateY(-50%) rotate(180deg);
      }
    }

		:host(:state(invalid)) {
			.trigger {
				border-color: var(--color-danger);
			}

			slot[name='helper'] {
				display: none;
			}
		}
  `

export default style
