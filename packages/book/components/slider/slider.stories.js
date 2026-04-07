import '@book/typography/helper'
import '@book/typography/label'
import './slider'

export default {
  title: 'Components/Slider',
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Desabilita o slider (mixin Disabled)',
      table: { defaultValue: { summary: 'false' } },
    },
    helper: {
      control: 'text',
      description: 'Texto auxiliar exibido abaixo do slider (morph-helper)',
    },
    hidden: {
      control: 'boolean',
      description: 'Oculta o elemento (mixin Hidden)',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Label associada ao slider (morph-label)',
    },
    max: {
      control: 'number',
      description: 'Valor máximo permitido',
      table: { defaultValue: { summary: '100' } },
    },
    min: {
      control: 'number',
      description: 'Valor mínimo permitido',
      table: { defaultValue: { summary: '0' } },
    },
    name: {
      control: 'text',
      description: 'Nome do campo para envio em formulários',
    },
    onChange: {
      action: 'change',
      description:
        'Evento disparado ao alterar o valor (detail contém o value como string)',
      table: { category: 'Events' },
    },
    step: {
      control: 'number',
      description: 'Incremento para cada passo',
      table: { defaultValue: { summary: '1' } },
    },
    value: {
      control: 'number',
      description: 'Valor atual do slider',
      table: { defaultValue: { summary: '50' } },
    },
    width: {
      control: 'text',
      description: 'Largura do componente (token ou valor em px/%)',
      table: { defaultValue: { summary: 'fill' } },
    },
  },
  render: (args) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
      <morph-slider
        ${args.name ? `name="${args.name}"` : ''}
        ${args.min !== undefined ? `min="${args.min}"` : ''}
        ${args.max !== undefined ? `max="${args.max}"` : ''}
        ${args.step !== undefined ? `step="${args.step}"` : ''}
        ${args.value !== undefined ? `value="${args.value}"` : ''}
        ${args.width ? `width="${args.width}"` : ''}
        ${args.disabled ? 'disabled' : ''}
        ${args.hidden ? 'hidden' : ''}
      >
        ${args.label ? `<span slot="label">${args.label}</span>` : ''}
        ${args.helper ? `<span slot="helper">${args.helper}</span>` : ''}
      </morph-slider>
    `
    const element = wrapper.querySelector('morph-slider')
    if (args.onChange) element.addEventListener('change', args.onChange)
    return element
  },
}

export const Default = {
  args: {
    helper: 'Selecione um valor entre 0 e 100',
    label: 'Intensidade',
    max: 100,
    min: 0,
    name: 'intensity',
    step: 1,
    value: 50,
    width: 'fill',
  },
}
