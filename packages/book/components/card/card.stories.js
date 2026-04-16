import '@book/components/button'
import '@book/typography/heading'
import '@book/typography/text'
import './card'

export default {
  title: 'Components/Card',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
  argTypes: {
    direction: {
      control: 'select',
      description: 'Direção do flexbox (padrão: column)',
      options: ['column', 'row', 'column-reverse', 'row-reverse'],
      table: { defaultValue: { summary: 'column' } },
    },
    height: {
      control: 'text',
      description: 'Altura do card (hug=auto, fill=100%, ou valores em px/%)',
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

    variant: {
      control: 'select',
      description: 'Variante de estilo do card',
      options: ['filled', 'outlined'],
      table: { defaultValue: { summary: 'filled' } },
    },
    width: {
      control: 'text',
      description: 'Largura do card (hug=auto, fill=100%, ou valores em px/%)',
      table: { defaultValue: { summary: 'hug' } },
    },
  },
  render: (args) => {
    const element = document.createElement('nm-card')
    if (args.direction) element.setAttribute('direction', args.direction)
    if (args.height) element.setAttribute('height', args.height)
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)
    if (args.variant && args.variant !== 'default')
      element.setAttribute('variant', args.variant)
    if (args.width) element.setAttribute('width', args.width)

    const title = document.createElement('nm-heading')
    title.setAttribute('size', 'sm')
    title.textContent = 'Titulo do Card'
    element.appendChild(title)

    const text = document.createElement('nm-text')
    text.setAttribute('size', 'sm')
    text.textContent = 'Conteudo do card com texto descritivo.'
    element.appendChild(text)

    return element
  },
}

export const Default = {
  args: {
    width: '300px',
    variant: 'outlined',
  },
}
