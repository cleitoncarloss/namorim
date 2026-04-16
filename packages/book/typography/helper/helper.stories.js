import './helper'

export default {
  title: 'Typography/Helper',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
  argTypes: {
    align: {
      control: 'select',
      description: 'Alinhamento do texto',
      options: ['left', 'center', 'right'],
      table: { defaultValue: { summary: 'left' } },
    },
    color: {
      control: 'select',
      description: 'Cor do texto de ajuda',
      options: [
        'master',
        'primary',
        'complete',
        'succeeded',
        'warning',
        'danger',
      ],
      table: { defaultValue: { summary: 'master' } },
    },
    content: {
      control: 'text',
      description: 'Conteudo do texto de ajuda',
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
    const element = document.createElement('nm-helper')
    if (args.align) element.setAttribute('align', args.align)
    if (args.color) element.setAttribute('color', args.color)
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)
    element.textContent = args.content
    return element
  },
}

export const Default = {
  args: {
    content: 'Texto de ajuda',
  },
}
