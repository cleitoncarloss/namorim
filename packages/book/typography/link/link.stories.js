import './link'

export default {
  title: 'Typography/Link',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Alinhamento do texto',
      table: { defaultValue: { summary: 'left' } },
    },
    color: {
      control: 'select',
      description: 'Cor do texto',
      options: [
        'master',
        'primary',
        'complete',
        'succeeded',
        'warning',
        'danger',
      ],
      table: { defaultValue: { summary: 'primary' } },
    },
    content: {
      control: 'text',
      description: 'Conteudo do link',
    },
    hidden: {
      control: 'boolean',
      description: 'Oculta o elemento (mixin Hidden)',
      table: { defaultValue: { summary: 'false' } },
    },
    href: {
      control: 'text',
      description: 'URL de destino',
    },
    on: {
      control: 'text',
      description:
        'Binding de eventos no formato source/event:target/action (mixin Echo)',
    },
    size: {
      control: 'select',
      options: [
        'xxxs',
        'xxs',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'xxl',
        'xxxl',
        'display',
        'giant',
      ],
      description: 'Tamanho do texto',
      table: { defaultValue: { summary: 'xxs' } },
    },
  },
  render: (args) => {
    const element = document.createElement('morph-link')
    if (args.align) element.setAttribute('align', args.align)
    if (args.color) element.setAttribute('color', args.color)
    element.setAttribute('size', args.size)
    element.setAttribute('href', args.href)
    element.textContent = args.content
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)
    return element
  },
}

export const Default = {
  args: {
    content: 'Clique aqui',
    href: '#',
    size: 'xxs',
  },
}
