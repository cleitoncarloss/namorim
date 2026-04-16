import './inset'

export default {
  title: 'Layout/Inset',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
  argTypes: {
    direction: {
      control: 'select',
      description: 'Direção do flex layout (padrão: column)',
      options: ['column', 'row'],
      table: { defaultValue: { summary: 'column' } },
    },
    height: {
      control: 'text',
      description: 'Altura do inset (hug=auto, fill=100%, ou valores em px/%)',
      table: { defaultValue: { summary: 'hug' } },
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
    side: {
      control: 'select',
      description:
        'Lado do inset onde aplicar margem negativa sm (padrão: all)',
      options: ['all', 'top', 'right', 'bottom', 'left', 'x', 'y'],
      table: { defaultValue: { summary: 'all' } },
    },
    width: {
      control: 'text',
      description: 'Largura do inset (hug=auto, fill=100%, ou valores em px/%)',
      table: { defaultValue: { summary: 'fill' } },
    },
  },
  render: (args) => {
    const card = document.createElement('div')
    card.style.backgroundColor = '#f5f5f5'
    card.style.padding = '16px'
    card.style.borderRadius = '8px'
    card.style.maxWidth = '600px'

    const inset = document.createElement('nm-inset')
    if (args.direction) inset.setAttribute('direction', args.direction)
    if (args.height) inset.setAttribute('height', args.height)
    if (args.hidden) inset.setAttribute('hidden', '')
    if (args.on) inset.setAttribute('on', args.on)
    if (args.side) inset.setAttribute('side', args.side)
    if (args.width) inset.setAttribute('width', args.width)

    const image = document.createElement('img')
    image.src =
      'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?w=600&h=300&fit=crop'
    image.alt = 'Typography sample'
    image.style.width = '100%'
    image.style.height = 'auto'
    image.style.display = 'block'
    inset.appendChild(image)

    card.appendChild(inset)

    return card
  },
}

export const Default = {}
