import { css } from '@dom'

export const style = (icon) =>
  css`
    :host {
      box-sizing: border-box;
      color: ${icon.color};
      direction: ltr;
      display: flex;
      font-family: 'Material Symbols Outlined';
      font-style: normal;
      font-size: var(--font-size-sm);
      font-weight: normal;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      white-space: nowrap;
      word-wrap: normal;
      -moz-font-feature-settings: 'liga';
      -moz-osx-font-smoothing: grayscale;
    }
  `
