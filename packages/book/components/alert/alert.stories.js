import './alert'

const renderAlert = (args) => {
  const alert = document.createElement('nm-alert')

  alert.setAttribute('type', args.type)
  if (args.duration !== undefined) alert.setAttribute('duration', args.duration)

  if (args.title || args.description) {
    if (args.title) {
      const strong = document.createElement('strong')
      strong.textContent = args.title
      alert.appendChild(strong)
    }
    if (args.description) {
      const p = document.createElement('p')
      p.textContent = args.description
      alert.appendChild(p)
    }
  } else if (args.message) {
    alert.textContent = args.message
  }

  return alert
}

export default {
  title: 'Components/Alert',
  tags: ['autodocs'],
  render: renderAlert,
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['info', 'error', 'warning', 'success'],
      description:
        'Visual type with corresponding icon (info, error, warning, check_circle)',
      table: { defaultValue: { summary: 'info' } },
    },
    duration: {
      control: { type: 'number', min: 0, step: 1000 },
      description: 'Auto-dismiss duration in milliseconds (0 = never dismiss)',
      table: { defaultValue: { summary: '5000' } },
    },
    title: {
      control: { type: 'text' },
      description: 'Alert title text (displayed in bold)',
    },
    description: {
      control: { type: 'text' },
      description: 'Alert description text (can contain multiple lines)',
    },
    message: {
      control: { type: 'text' },
      description: 'Simple alert message (alternative to title/description)',
    },
  },
  args: {
    type: 'info',
    duration: 5000,
    title: 'Hello',
    description: 'This is an alert description example',
  },
}

export const InfoAlert = {
  args: {
    type: 'info',
    duration: 5000,
    title: 'Information',
    description:
      'Please check your email for the verification link to activate your account.',
  },
}

export const ErrorAlert = {
  args: {
    type: 'error',
    duration: 0,
    title: 'Validation errors',
    description:
      'Please correct the following:\n• Email is required\n• Password must be at least 8 characters',
  },
}

export const WarningAlert = {
  args: {
    type: 'warning',
    duration: 5000,
    title: 'Storage almost full',
    description:
      "You're using 90% of your available storage. Consider upgrading your plan.",
  },
}

export const SuccessAlert = {
  args: {
    type: 'success',
    duration: 3000,
    title: 'Success!',
    description: 'Your changes have been saved successfully.',
  },
}

export const SimpleMessage = {
  args: {
    type: 'info',
    duration: 5000,
    message: 'Simple notification without title or description',
  },
}

export const PersistentError = {
  args: {
    type: 'error',
    duration: 0,
    title: 'Critical Error',
    description: 'An unexpected error occurred. Please contact support.',
  },
}
