import { html } from '@dom'

const component = (link) => html`<a href='${link.href}'><slot></slot></a>`

export default component
