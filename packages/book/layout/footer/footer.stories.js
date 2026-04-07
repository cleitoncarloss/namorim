import '@book/typography/link'
import './footer'

export default {
  title: 'Layout/Footer',
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
    const element = document.createElement('morph-footer')
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)

    const link1 = document.createElement('morph-link')
    link1.setAttribute('href', '#')
    link1.textContent = 'Política de Privacidade'
    element.appendChild(link1)

    const link2 = document.createElement('morph-link')
    link2.setAttribute('href', '#')
    link2.textContent = 'Termos de Uso'
    element.appendChild(link2)

    return element
  },
}

export const Default = {}
