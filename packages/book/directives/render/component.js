import { html } from '@dom'

const component = (render) => html`${render.textContent}`

export default component
