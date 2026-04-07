import './logo'

export default {
  title: 'Components/Logo',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
  argTypes: {
    value: {
      control: 'text',
      description:
        'Valor associado ao componente, despachado no evento clicked',
      table: { defaultValue: { summary: 'undefined' } },
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
    clicked: {
      description:
        'Evento disparado ao clicar no logo, com o valor como detalhe. Evento foi renomeado de "click" para "clicked".',
      table: { type: { summary: 'CustomEvent' } },
    },
  },
  render: (args) => {
    const element = document.createElement('morph-logo')
    if (args.value) element.setAttribute('value', args.value)
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)
    return element
  },
}

export const Default = {}
