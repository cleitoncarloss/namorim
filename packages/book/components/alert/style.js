import { css } from '@dom'

const style = () =>
  css`
    :host {
      box-sizing: border-box;
      display: block;
      font-family: var(--font-family-base);
      font-size: var(--font-size-xxs);
      line-height: var(--line-height-sm);
      position: fixed;
      top: var(--spacing_inset-sm);
      right: var(--spacing_inset-sm);
      z-index: 9999;
      max-width: 400px;
    }

    :host(:state(hidden)) {
      display: none;
    }

    .alert-container {
      align-items: center;
      background-color: var(--color-pure-white);
      border: var(--border-width-hairline) solid var(--color-master-light);
      border-radius: var(--border-radius-md);
      display: flex;
      gap: var(--spacing-xxxs);
      padding: var(--spacing-nano);
    }

    .alert-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-nano);
    }

    .alert-content ::slotted(*) {
      margin: 0;
    }

    .alert-content ::slotted(strong) {
      color: currentcolor;
      font-weight: var(--font-weight-semibold);
    }

    .alert-content ::slotted(p) {
      color: currentcolor;
      opacity: 0.8;
    }

    /* Info style */
    :host([type="info"]) .alert-container {
      color: var(--color-info-dark);
    }

    :host([type="info"]) morph-icon {
      color: var(--color-info);
    }

    /* Error style */
    :host([type="error"]) .alert-container {
      color: var(--color-danger-dark);
    }

    :host([type="error"]) morph-icon {
      color: var(--color-danger);
    }

    /* Warning style */
    :host([type="warning"]) .alert-container {
      color: var(--color-warning-dark);
    }

    :host([type="warning"]) morph-icon {
      color: var(--color-warning);
    }

    /* Success style */
    :host([type="success"]) .alert-container {
      color: var(--color-succeeded-dark);
    }

    :host([type="success"]) morph-icon {
      color: var(--color-succeeded);
    }
  `

export default style
