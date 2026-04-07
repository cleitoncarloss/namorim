import { html } from '@dom'

const component = (avatar) =>
  html`
    <img src="${avatar.src}" alt="${avatar.alt}" loading="lazy" />
    <slot></slot>
  `

export default component
