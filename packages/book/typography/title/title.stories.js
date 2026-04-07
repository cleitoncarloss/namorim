import './title'

export default {
  title: 'Typography/Title',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
  argTypes: {
    align: {
      control: 'select',
      description: 'Alinhamento do title',
      options: ['left', 'center', 'right'],
      table: { defaultValue: { summary: 'left' } },
    },
    content: {
      control: 'text',
      description: 'Conteudo do title',
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
    const element = document.createElement('morph-title')
    if (args.align) element.setAttribute('align', args.align)
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)
    element.textContent = args.content
    return element
  },
}

export const Default = {
  args: {
    content: 'Title de exemplo',
  },
}
