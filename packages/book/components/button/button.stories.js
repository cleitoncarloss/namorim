import '@book/components/icon'
import '@book/typography/text'
import './button'

export default {
  title: 'Components/Button',
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
        'primary',
        'complete',
        'succeeded',
        'warning',
        'danger',
        'info',
      ],
      description: 'Cor do botão - usa tokens de @packages/pixel/tokens/color',
      table: { defaultValue: { summary: 'primary' } },
    },
    content: {
      control: 'text',
      description: 'Conteúdo do botão',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o botão (mixin Disabled)',
      table: { defaultValue: { summary: 'false' } },
    },
    hidden: {
      control: 'boolean',
      description: 'Oculta o elemento (mixin Hidden)',
      table: { defaultValue: { summary: 'false' } },
    },
    icononly: {
      control: 'boolean',
      description: 'Botão quadrado para conter apenas ícone (40px)',
      table: { defaultValue: { summary: 'false' } },
    },
    on: {
      control: 'text',
      description:
        'Binding de eventos no formato source/event:target/action (mixin Echo)',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'tonal', 'text'],
      description: 'Estilo visual do botão',
      table: { defaultValue: { summary: 'filled' } },
    },
    width: {
      control: 'text',
      description: 'Largura do botão (ex: 100%, 200px)',
      table: { defaultValue: { summary: '100%' } },
    },
  },
}

export const Primary = {
  render: () => `<nm-button color="primary">Primary</nm-button>`,
}

export const Complete = {
  render: () => `<nm-button color="complete">Complete</nm-button>`,
}

export const Succeeded = {
  render: () => `<nm-button color="succeeded">Succeeded</nm-button>`,
}

export const Warning = {
  render: () => `<nm-button color="warning">Warning</nm-button>`,
}

export const Danger = {
  render: () => `<nm-button color="danger">Danger</nm-button>`,
}

export const Info = {
  render: () => `<nm-button color="info">Info</nm-button>`,
}

export const Outlined = {
  render: () =>
    `<nm-button variant="outlined" color="primary">Outlined</nm-button>`,
}

export const Tonal = {
  render: () => `<nm-button variant="tonal" color="primary">Tonal</nm-button>`,
}

export const Text = {
  render: () => `<nm-button variant="text" color="primary">Text</nm-button>`,
}

export const Disabled = {
  render: () => `<nm-button disabled>Disabled</nm-button>`,
}

export const IconOnly = {
  render: () =>
    `<nm-button icononly><nm-icon>favorite</nm-icon></nm-button>`,
}
