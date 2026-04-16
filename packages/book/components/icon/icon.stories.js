import './icon'

export default {
  title: 'Components/Icon',
  tags: ['autodocs'],
  parameters: {
    controls: {
      disable: true,
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'master',
        'primary',
        'complete',
        'succeeded',
        'warning',
        'danger',
        'info',
      ],
      description: 'Cor do ícone',
      table: { defaultValue: { summary: 'currentcolor' } },
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
    use: {
      control: 'text',
      description: 'Nome do ícone Material Symbols',
    },
  },
  render: (args) => {
    const element = document.createElement('nm-icon')
    element.setAttribute('use', args.use)
    if (args.color) element.setAttribute('color', args.color)
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)
    return element
  },
}

export const Default = {
  args: {
    use: 'home',
  },
}
