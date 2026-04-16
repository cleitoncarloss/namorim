import '@book/typography/helper'
import '@book/typography/label'
import '@book/typography/validity'
import './checkbox'

export default {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  parameters: {
    controls: {
      disable: true,
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Estado marcado do checkbox',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o checkbox (mixin Disabled)',
      table: { defaultValue: { summary: 'false' } },
    },
    helper: {
      control: 'text',
      description: 'Texto auxiliar exibido abaixo do checkbox (nm-helper)',
    },
    hidden: {
      control: 'boolean',
      description: 'Oculta o elemento (mixin Hidden)',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Label associada ao checkbox (nm-label)',
    },
    name: {
      control: 'text',
      description: 'Nome do campo para envio em formularios',
    },
    onChanged: {
      action: 'changed',
      description:
        'Evento disparado ao alterar o estado (detail contem boolean checked)',
      table: { category: 'Events' },
    },
    required: {
      control: 'boolean',
      description: 'Torna o campo obrigatorio com validacao nativa',
      table: { defaultValue: { summary: 'false' } },
    },
    width: {
      control: 'text',
      description: 'Largura do componente (token ou valor em px/%)',
      table: { defaultValue: { summary: 'auto' } },
    },
  },
  render: (args) => {
    const element = document.createElement('nm-checkbox')
    if (args.name) element.setAttribute('name', args.name)
    if (args.width) element.setAttribute('width', args.width)
    if (args.checked) element.setAttribute('checked', '')
    if (args.disabled) element.setAttribute('disabled', '')
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.required) element.setAttribute('required', '')
    if (args.onChanged) element.addEventListener('changed', args.onChanged)
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
      validity.textContent = 'Marque esta opcao para continuar'
      element.appendChild(validity)
    }
    return element
  },
}

export const Default = {
  args: {
    helper: 'Leia os termos antes de aceitar',
    label: 'Aceito os termos e condicoes',
    name: 'terms',
    required: true,
  },
}
