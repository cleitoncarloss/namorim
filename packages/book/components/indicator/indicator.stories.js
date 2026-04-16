import './indicator'

export default {
  title: 'Components/Indicator',
  tags: ['autodocs'],
  parameters: {
    controls: {
      disable: true,
    },
  },
  argTypes: {
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
    const element = document.createElement('nm-indicator')
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)
    element.textContent = 'Thinking...'
    return element
  },
}

export const Default = {
  args: {},
}
