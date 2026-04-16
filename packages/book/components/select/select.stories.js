import '@book/typography/helper'
import '@book/typography/label'
import '@book/typography/validity'
import './select'

export default {
  title: 'Components/Select',
  tags: ['autodocs'],
  parameters: {
    controls: {
      disable: true,
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Desabilita o select (mixin Disabled)',
      table: { defaultValue: { summary: 'false' } },
    },
    helper: {
      control: 'text',
      description: 'Texto auxiliar exibido abaixo do select (nm-helper)',
    },
    hidden: {
      control: 'boolean',
      description: 'Oculta o elemento (mixin Hidden)',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Label associada ao select (nm-label)',
    },
    name: {
      control: 'text',
      description: 'Nome do campo para envio em formularios',
    },
    onChanged: {
      action: 'changed',
      description:
        'Evento disparado ao selecionar uma opcao (detail contem o value)',
      table: { category: 'Events' },
    },
    required: {
      control: 'boolean',
      description: 'Torna a selecao obrigatoria com validacao nativa',
      table: { defaultValue: { summary: 'false' } },
    },
    value: {
      control: 'text',
      description: 'Valor atualmente selecionado',
    },
    width: {
      control: 'text',
      description: 'Largura do componente (token ou valor em px/%)',
      table: { defaultValue: { summary: 'fill' } },
    },
  },
  render: (args) => {
    const element = document.createElement('nm-select')
    if (args.name) element.setAttribute('name', args.name)
    if (args.value) element.setAttribute('value', args.value)
    if (args.width) element.setAttribute('width', args.width)
    if (args.disabled) element.setAttribute('disabled', '')
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.required) element.setAttribute('required', '')
    if (args.onChanged) element.addEventListener('changed', args.onChanged)
    if (args.label) {
      const label = document.createElement('nm-label')
      label.textContent = args.label
      element.appendChild(label)
    }
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4']
    options.forEach((text, index) => {
      const option = document.createElement('option')
      option.value = `option${index + 1}`
      option.textContent = text
      element.appendChild(option)
    })
    if (args.helper) {
      const helper = document.createElement('nm-helper')
      helper.textContent = args.helper
      element.appendChild(helper)
    }
    if (args.required) {
      const validity = document.createElement('nm-validity')
      validity.setAttribute('state', 'valueMissing')
      validity.textContent = 'Selecione uma opcao'
      element.appendChild(validity)
    }
    return element
  },
}

export const Default = {
  args: {
    helper: 'Escolha uma das opcoes disponiveis',
    label: 'Selecione uma opcao',
    name: 'select',
    required: true,
    width: 'fill',
  },
}
