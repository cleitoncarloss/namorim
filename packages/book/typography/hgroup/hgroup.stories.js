import '@book/typography/heading'
import '@book/typography/text'
import './hgroup'

export default {
  title: 'Typography/Hgroup',
  tags: ['autodocs'],
  parameters: {
    controls: {
      disable: true,
    },
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alinhamento dos elementos filhos no eixo vertical',
      table: { defaultValue: { summary: 'start' } },
    },
    hidden: {
      control: 'boolean',
      description: 'Oculta o elemento (mixin Hidden)',
      table: { defaultValue: { summary: 'false' } },
    },
    width: {
      control: 'text',
      description:
        'Largura do hgroup (hug=auto, fill=100%, ou valores em px/%)',
      table: { defaultValue: { summary: 'hug' } },
    },
  },
  render: (args) => {
    const element = document.createElement('nm-hgroup')
    if (args.align) element.setAttribute('align', args.align)
    if (args.width) element.setAttribute('width', args.width)
    if (args.hidden) element.setAttribute('hidden', '')

    const heading = document.createElement('nm-heading')
    heading.setAttribute('align', args.align || 'start')
    heading.setAttribute('color', 'master')
    heading.textContent = 'Que bom ter você aqui'

    const text = document.createElement('nm-text')
    text.setAttribute('align', args.align || 'start')
    text.setAttribute('color', 'master')
    text.textContent = 'Entre para conversar com a internet do seu jeito'

    element.appendChild(heading)
    element.appendChild(text)

    return element
  },
}

export const Default = {
  args: {
    align: 'center',
  },
}
