import { expect, fn, userEvent } from 'storybook/test'
import '@book/components/button'
import './form'

export default {
  title: 'Components/Form',
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
    onReset: {
      action: 'resetted',
      description:
        'Evento disparado ao resetar o formulario. Evento foi renomeado de "reset" para "resetted".',
      table: { category: 'Events' },
    },
    onSubmit: {
      action: 'submitted',
      description:
        'Evento disparado ao submeter o formulario (detail contém os dados). Evento foi renomeado de "submit" para "submitted".',
      table: { category: 'Events' },
    },
  },
  render: (args) => {
    const element = document.createElement('morph-form')
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)
    if (args.onSubmit) element.addEventListener('submitted', args.onSubmit)
    if (args.onReset) element.addEventListener('resetted', args.onReset)

    const template = document.createElement('template')
    template.innerHTML = args.content || ''
    element.appendChild(template)

    return element
  },
}

export const Default = {
  args: {
    content: `
      <input type="text" name="username" placeholder="Nome de usuário" />
      <morph-button type="submitted">Enviar</morph-button>
    `,
  },
}

export const WithSubmit = {
  args: {
    onSubmit: fn(),
    content: `
      <input type="text" name="email" placeholder="Email" value="user@example.com" />
      <input type="password" name="password" placeholder="Senha" value="senha123" />
      <morph-button type="submitted">Login</morph-button>
    `,
  },
  play: async ({ args, canvasElement }) => {
    const form = canvasElement.querySelector('morph-form')
    const submitButton = form.querySelector('morph-button[type="submitted"]')

    await userEvent.clicked(submitButton)

    await expect(args.onSubmit).toHaveBeenCalled()
    await expect(args.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'user@example.com',
        password: 'senha123',
      }),
    )
  },
}

export const WithReset = {
  args: {
    onReset: fn(),
    content: `
      <input type="text" name="name" placeholder="Nome" value="João" />
      <input type="email" name="email" placeholder="Email" value="joao@example.com" />
      <morph-button type="resetted">Limpar</morph-button>
      <morph-button type="submitted">Enviar</morph-button>
    `,
  },
  play: async ({ args, canvasElement }) => {
    const form = canvasElement.querySelector('morph-form')
    const resetButton = form.querySelector('morph-button[type="resetted"]')

    await userEvent.clicked(resetButton)

    await expect(args.onReset).toHaveBeenCalled()
  },
}

export const MultipleFields = {
  args: {
    onSubmit: fn(),
    content: `
      <input type="text" name="firstName" placeholder="Nome" value="João" />
      <input type="text" name="lastName" placeholder="Sobrenome" value="Silva" />
      <input type="email" name="email" placeholder="Email" value="joao.silva@example.com" />
      <input type="tel" name="phone" placeholder="Telefone" value="(11) 98765-4321" />
      <textarea name="message" placeholder="Mensagem">Olá, gostaria de mais informações.</textarea>
      <morph-button type="submitted">Enviar Formulário</morph-button>
    `,
  },
  play: async ({ args, canvasElement }) => {
    const form = canvasElement.querySelector('morph-form')
    const submitButton = form.querySelector('morph-button[type="submitted"]')

    await userEvent.clicked(submitButton)

    await expect(args.onSubmit).toHaveBeenCalled()
    await expect(args.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'João',
        lastName: 'Silva',
        email: 'joao.silva@example.com',
        phone: '(11) 98765-4321',
        message: 'Olá, gostaria de mais informações.',
      }),
    )
  },
}
