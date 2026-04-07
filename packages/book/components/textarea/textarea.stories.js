import '@book/typography/helper'
import '@book/typography/label'
import '@book/typography/validity'
import './textarea'

export default {
  title: 'Components/Textarea',
  tags: ['autodocs'],
  parameters: {
    controls: {
      disable: true,
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Desabilita o textarea (mixin Disabled)',
      table: { defaultValue: { summary: 'false' } },
    },
    helper: {
      control: 'text',
      description: 'Texto auxiliar exibido abaixo do textarea (morph-helper)',
    },
    hidden: {
      control: 'boolean',
      description: 'Oculta o elemento (mixin Hidden)',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Label associada ao textarea (morph-label)',
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
    value: {
      control: 'text',
      description: 'Valor atual do textarea',
    },
    width: {
      control: 'text',
      description: 'Largura do componente (token ou valor em px/%)',
      table: { defaultValue: { summary: 'fill' } },
    },
  },
  render: (args) => {
    const element = document.createElement('morph-textarea')
    if (args.name) element.setAttribute('name', args.name)
    if (args.placeholder) element.setAttribute('placeholder', args.placeholder)
    if (args.value) element.setAttribute('value', args.value)
    if (args.width) element.setAttribute('width', args.width)
    if (args.disabled) element.setAttribute('disabled', '')
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.readonly) element.setAttribute('readonly', '')
    if (args.required) element.setAttribute('required', '')
    if (args.onChange) element.addEventListener('change', args.onChange)
    if (args.label) {
      const label = document.createElement('morph-label')
      label.textContent = args.label
      element.appendChild(label)
    }
    if (args.helper) {
      const helper = document.createElement('morph-helper')
      helper.textContent = args.helper
      element.appendChild(helper)
    }
    if (args.required) {
      const validity = document.createElement('morph-validity')
      validity.setAttribute('state', 'valueMissing')
      validity.textContent = 'Campo obrigatorio'
      element.appendChild(validity)
    }
    return element
  },
}

export const Default = {
  args: {
    helper: 'Descreva suas preferencias e estilo de comunicacao',
    label: 'Como voce gostaria que o agente te auxiliasse?',
    name: 'prompt',
    placeholder: 'Digite sua mensagem...',
    required: true,
    width: 'fill',
  },
}
