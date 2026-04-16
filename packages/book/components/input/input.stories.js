import '@book/typography/helper'
import '@book/typography/label'
import '@book/typography/validity'
import './input'

export default {
  title: 'Components/Input',
  tags: ['autodocs'],
  parameters: {
    controls: {
      disable: true,
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Desabilita o input (mixin Disabled)',
      table: { defaultValue: { summary: 'false' } },
    },
    helper: {
      control: 'text',
      description: 'Texto auxiliar exibido abaixo do input (nm-helper)',
    },
    hidden: {
      control: 'boolean',
      description: 'Oculta o elemento (mixin Hidden)',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Label associada ao input (nm-label)',
    },
    max: {
      control: 'text',
      description: 'Valor maximo permitido (type number)',
    },
    min: {
      control: 'text',
      description: 'Valor minimo permitido (type number)',
    },
    name: {
      control: 'text',
      description: 'Nome do campo para envio em formularios',
    },
    onChange: {
      action: 'change',
      description:
        'Evento disparado ao alterar o valor (detail contem o value)',
      table: { category: 'Events' },
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder exibido quando vazio',
    },
    readonly: {
      control: 'boolean',
      description: 'Impede edicao do conteudo mantendo o campo acessivel',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Torna o campo obrigatorio com validacao nativa',
      table: { defaultValue: { summary: 'false' } },
    },
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'password', 'url', 'tel'],
      description: 'Tipo do campo de entrada',
      table: { defaultValue: { summary: 'text' } },
    },
    value: {
      control: 'text',
      description: 'Valor atual do input',
    },
    width: {
      control: 'text',
      description: 'Largura do componente (token ou valor em px/%)',
      table: { defaultValue: { summary: 'fill' } },
    },
  },
  render: (args) => {
    const element = document.createElement('nm-input')
    if (args.name) element.setAttribute('name', args.name)
    if (args.type) element.setAttribute('type', args.type)
    if (args.placeholder) element.setAttribute('placeholder', args.placeholder)
    if (args.value) element.setAttribute('value', args.value)
    if (args.width) element.setAttribute('width', args.width)
    if (args.min) element.setAttribute('min', args.min)
    if (args.max) element.setAttribute('max', args.max)
    if (args.disabled) element.setAttribute('disabled', '')
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.readonly) element.setAttribute('readonly', '')
    if (args.required) element.setAttribute('required', '')
    if (args.onChange) element.addEventListener('change', args.onChange)
    if (args.label) {
      const label = document.createElement('nm-label')
      label.textContent = args.label
      element.appendChild(label)
    }
    if (args.helper) {
      const helper = document.createElement('nm-helper')
      helper.textContent = args.helper
      element.appendChild(helper)
    }
    if (args.required) {
      const validity = document.createElement('nm-validity')
      validity.setAttribute('state', 'valueMissing')
      validity.textContent = 'Campo obrigatorio'
      element.appendChild(validity)
    }
    return element
  },
}

export const Default = {
  args: {
    helper: 'Ex: gpt-4o, gemini-1.5-pro',
    label: 'Nome do Modelo',
    name: 'modelName',
    placeholder: 'Digite o nome do modelo',
    required: true,
    type: 'text',
    width: 'fill',
  },
}
