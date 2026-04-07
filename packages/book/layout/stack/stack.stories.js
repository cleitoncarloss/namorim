import '@book/components/button'
import '@book/typography/text'
import './stack'

export default {
  title: 'Layout/Stack',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
  argTypes: {
    align: {
      control: 'select',
      description: 'Alinhamento dos itens no eixo transversal',
      options: ['start', 'center', 'end', 'stretch'],
      table: { defaultValue: { summary: 'start' } },
    },
    direction: {
      control: 'select',
      description: 'Direcao do flex (row ou column)',
      options: ['row', 'column'],
      table: { defaultValue: { summary: 'row' } },
    },

    height: {
      control: 'text',
      description: 'Altura do stack (hug=auto, fill=100%, ou valores em px/%)',
      table: { defaultValue: { summary: 'hug' } },
    },
    hidden: {
      control: 'boolean',
      description: 'Oculta o elemento (mixin Hidden)',
      table: { defaultValue: { summary: 'false' } },
    },
    justify: {
      control: 'select',
      description: 'Justificacao do conteudo no eixo principal',
      options: [
        'flex-start',
        'center',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      table: { defaultValue: { summary: 'flex-start' } },
    },
    on: {
      control: 'text',
      description:
        'Binding de eventos no formato source/event:target/action (mixin Echo)',
    },
    width: {
      control: 'text',
      description: 'Largura do stack (hug=auto, fill=100%, ou valores em px/%)',
      table: { defaultValue: { summary: 'hug' } },
    },
  },
  render: (args) => {
    const element = document.createElement('morph-stack')
    if (args.align) element.setAttribute('align', args.align)
    if (args.direction) element.setAttribute('direction', args.direction)

    if (args.height) element.setAttribute('height', args.height)
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.justify) element.setAttribute('justify', args.justify)
    if (args.on) element.setAttribute('on', args.on)
    if (args.width) element.setAttribute('width', args.width)

    for (let i = 1; i <= 3; i++) {
      const button = document.createElement('morph-button')
      button.setAttribute('color', 'primary')
      button.textContent = `Item ${i}`
      element.appendChild(button)
    }

    return element
  },
}

export const Default = {
  args: {},
}
