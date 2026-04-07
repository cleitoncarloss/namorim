import '@book/components/button'
import '@book/components/logo'
import '@book/typography/text'
import './header'

export default {
  title: 'Layout/Header',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
  argTypes: {
    hidden: {
      control: 'boolean',
      description: 'Oculta o elemento (mixin Hidden)',
      table: { defaultValue: { summary: 'false' } },
    },
    on: {
      control: 'text',
      description:
        'Binding de eventos no formato source/event:target/action (mixin Echo)',
    },
  },
  render: (args) => {
    const element = document.createElement('morph-header')
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)

    const title = document.createElement('morph-text')
    title.setAttribute('size', 'lg')
    title.setAttribute('weight', 'bold')
    title.textContent = 'Titulo'
    element.appendChild(title)

    const actions = document.createElement('div')
    actions.setAttribute('slot', 'actions')
    const button = document.createElement('morph-button')
    button.setAttribute('color', 'primary')
    button.textContent = 'Acao'
    actions.appendChild(button)
    element.appendChild(actions)

    return element
  },
}

export const Default = {}
