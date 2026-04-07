import './avatar'

export default {
  argTypes: {
    alt: {
      control: 'text',
      description: 'Texto alternativo para a imagem',
      table: { defaultValue: { summary: 'Avatar' } },
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
    onClick: {
      action: 'clicked',
      description:
        'Evento disparado ao clicar no avatar (detail contém o value). Evento foi renomeado de "click" para "clicked".',
      table: { category: 'Events' },
    },
    src: {
      control: 'text',
      description: 'URL da imagem',
    },
    value: {
      control: 'text',
      description: 'Valor enviado no evento clicked',
    },
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (args) => {
    const element = document.createElement('morph-avatar')
    if (args.alt) element.setAttribute('alt', args.alt)
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)
    if (args.src) element.setAttribute('src', args.src)
    if (args.value) element.setAttribute('value', args.value)
    if (args.onClick) element.addEventListener('clicked', args.onClick)
    return element
  },
  tags: ['autodocs'],
  title: 'Components/Avatar',
}

export const Default = {
  args: {
    alt: 'User Avatar',
    src: 'https://i.pravatar.cc/150?img=1',
    value: 'user-123',
  },
}
