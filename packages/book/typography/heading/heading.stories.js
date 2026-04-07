import './heading'

export default {
  title: 'Typography/Heading',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Alinhamento do heading',
      table: { defaultValue: { summary: 'left' } },
    },
    color: {
      control: 'select',
      description: 'Cor do heading',
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
      description: 'Conteudo do heading',
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
    const element = document.createElement('morph-heading')
    element.setAttribute('color', args.color)
    element.setAttribute('align', args.align)
    element.textContent = args.content
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)
    return element
  },
}

export const Default = {
  args: {
    content: 'Heading de exemplo',
  },
}
