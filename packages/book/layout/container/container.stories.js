import './container'

export default {
  title: 'Layout/Container',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
  argTypes: {
    content: {
      control: 'text',
      description: 'Conteudo do container',
    },
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
    const element = document.createElement('morph-container')
    element.textContent = args.content
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)
    return element
  },
}

export const Default = {
  args: {
    content: 'Container content',
  },
}
