import { css } from '@dom'

const style = () => {
  return css`
    :host {
      align-items: center;
      border: var(--border-width-thin) solid var(--color-primary-light);
      border-radius: var(--border-radius-circular);
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      height: 40px;
      justify-content: center;
      position: relative;
      width: 40px;

      img {
        align-items: center;
        aspect-ratio: 1/1;
        background-color: var(--color-primary-lighter);
        border-radius: inherit;
        color: var(--color-primary-darker);
        display: flex;
        font-family: var(--font-family-base);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-bold);
        height: 100%;
        justify-content: center;
        object-fit: cover;
        text-align: center;
        text-transform: uppercase;
        width: 100%;
      }
    }

    :host(:state(hidden)) {
      display: none;
    }
  `
}

export default style
