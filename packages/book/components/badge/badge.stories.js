import './badge'

export default {
  title: 'Components/Badge',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
  argTypes: {
    color: {
      control: 'select',
      description: 'Cor do badge',
      options: [
        'master',
        'primary',
        'complete',
        'succeeded',
        'warning',
        'danger',
      ],
      table: { defaultValue: { summary: 'primary' } },
    },
    content: {
      control: 'text',
      description: 'Conteúdo do badge',
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
    size: {
      control: 'select',
      description: 'Tamanho do badge',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    variant: {
      control: 'select',
      description: 'Variante do badge',
      options: ['default', 'pill'],
      table: { defaultValue: { summary: 'default' } },
    },
  },
  render: (args) => {
    const element = document.createElement('morph-badge')
    if (args.color) element.setAttribute('color', args.color)
    if (args.hidden) element.setAttribute('hidden', '')
    if (args.on) element.setAttribute('on', args.on)
    if (args.size && args.size !== 'md') element.setAttribute('size', args.size)
    if (args.variant && args.variant !== 'default')
      element.setAttribute('variant', args.variant)
    element.textContent = args.content
    return element
  },
}

export const Default = {
  args: {
    color: 'primary',
    content: 'Badge',
  },
}

export const Succeeded = {
  args: {
    color: 'succeeded',
    content: 'Success',
  },
}

export const Warning = {
  args: {
    color: 'warning',
    content: 'Warning',
  },
}

export const Danger = {
  args: {
    color: 'danger',
    content: 'Error',
  },
}

export const Small = {
  args: {
    color: 'primary',
    content: 'Small',
    size: 'sm',
  },
}

export const Large = {
  args: {
    color: 'primary',
    content: 'Large',
    size: 'lg',
  },
}

export const Pill = {
  args: {
    color: 'primary',
    content: 'Pill Badge',
    variant: 'pill',
  },
}

export const WithNumber = {
  args: {
    color: 'danger',
    content: '99+',
    size: 'sm',
    variant: 'pill',
  },
}

export const StatusInProgress = {
  args: {
    color: 'warning',
    content: 'In progress',
  },
}

export const StatusInReview = {
  args: {
    color: 'primary',
    content: 'In review',
  },
}

export const StatusComplete = {
  args: {
    color: 'complete',
    content: 'Complete',
  },
}

export const StatusGroup = {
  render: () => {
    const container = document.createElement('div')
    container.style.cssText =
      'display: flex; gap: var(--spacing-sm); background-color: var(--color-surface-dark); padding: var(--spacing-md); border-radius: var(--radius-sm);'

    const inProgress = document.createElement('morph-badge')
    inProgress.setAttribute('color', 'warning')
    inProgress.textContent = 'In progress'

    const inReview = document.createElement('morph-badge')
    inReview.setAttribute('color', 'primary')
    inReview.textContent = 'In review'

    const complete = document.createElement('morph-badge')
    complete.setAttribute('color', 'complete')
    complete.textContent = 'Complete'

    container.append(inProgress, inReview, complete)
    return container
  },
}
