import '@pixel'

export default {
  title: 'Design Tokens/Typography',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
Sistema tipográfico com escala modular para hierarquia de conteúdo.

## Font Size

Escala de **12px** (xxxs) até **96px** (giant), ideal para criar hierarquia visual clara.

- **xxxs (12px)**: Textos auxiliares mínimos, como labels em formulários ou notas de rodapé
- **xxs (14px)**: Textos informativos secundários, breadcrumbs, ou metadados
- **xs (16px)**: Corpo de texto padrão para parágrafos e conteúdos regulares
- **sm (20px)**: Textos com leve destaque, como descrições curtas ou botões de ação
- **md (24px)**: Subtítulos e conteúdos de destaque dentro de cards ou seções específicas
- **lg (32px)**: Cabeçalhos de seção e títulos de módulos dentro da aplicação
- **xl (40px)**: Títulos principais de páginas e chamadas de destaque
- **xxl (48px)**: Hero titles ou seções que exigem forte hierarquia visual
- **xxxl (64px)**: Headlines impactantes, slogans ou manchetes em páginas principais
- **display (80px)**: Uso em campanhas, landing pages ou conteúdos hero de grande destaque
- **giant (96px)**: Títulos imponentes em contextos especiais, como eventos ou apresentações

## Font Weight

- **Regular (400)**: Padrão para textos regulares, oferecendo legibilidade equilibrada
- **Medium (500)**: Textos intermediários, garantindo hierarquia sem excesso de peso
- **Bold (700)**: Uso em títulos e elementos que precisam de forte destaque visual
        `,
      },
    },
  },
}

export const Default = {
  render: () => {
    const container = document.createElement('div')
    container.style.padding = '16px'
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.style.gap = '48px'

    // Font Sizes
    const fontSizes = [
      {
        token: '--font-size-xxxs',
        value: '12px',
        usage: 'Textos auxiliares mínimos, labels ou notas de rodapé',
      },
      {
        token: '--font-size-xxs',
        value: '14px',
        usage: 'Textos informativos secundários, breadcrumbs ou metadados',
      },
      {
        token: '--font-size-xs',
        value: '16px',
        usage: 'Corpo de texto padrão para parágrafos',
      },
      {
        token: '--font-size-sm',
        value: '20px',
        usage: 'Textos com leve destaque, descrições ou botões',
      },
      {
        token: '--font-size-md',
        value: '24px',
        usage: 'Subtítulos e conteúdos de destaque em cards',
      },
      {
        token: '--font-size-lg',
        value: '32px',
        usage: 'Cabeçalhos de seção e títulos de módulos',
      },
      {
        token: '--font-size-xl',
        value: '40px',
        usage: 'Títulos principais de páginas e chamadas de destaque',
      },
      {
        token: '--font-size-xxl',
        value: '48px',
        usage: 'Hero titles ou seções com forte hierarquia visual',
      },
      {
        token: '--font-size-xxxl',
        value: '64px',
        usage: 'Headlines impactantes, slogans ou manchetes',
      },
      {
        token: '--font-size-display',
        value: '80px',
        usage: 'Campanhas, landing pages ou conteúdos hero',
      },
      {
        token: '--font-size-giant',
        value: '96px',
        usage: 'Títulos imponentes em eventos ou apresentações',
      },
    ]

    const sizeSection = document.createElement('div')
    const sizeTitle = document.createElement('h3')
    sizeTitle.style.margin = '0 0 24px 0'
    sizeTitle.style.fontSize = '18px'
    sizeTitle.style.fontWeight = '600'
    sizeTitle.textContent = 'Font Size'
    sizeSection.appendChild(sizeTitle)

    for (const item of fontSizes) {
      const row = document.createElement('div')
      row.style.marginBottom = '24px'
      row.style.padding = '16px'
      row.style.border = '1px solid #e0e0e0'
      row.style.borderRadius = '8px'

      const text = document.createElement('div')
      text.style.fontSize = `var(${item.token})`
      text.style.marginBottom = '8px'
      text.textContent = 'The quick brown fox'
      row.appendChild(text)

      const info = document.createElement('div')
      info.style.fontSize = '12px'
      info.style.color = '#666'
      info.style.display = 'flex'
      info.style.gap = '16px'

      const tokenEl = document.createElement('code')
      tokenEl.style.fontWeight = '600'
      tokenEl.textContent = item.token
      info.appendChild(tokenEl)

      const valueEl = document.createElement('span')
      valueEl.innerHTML = `<strong>${item.value}</strong>`
      info.appendChild(valueEl)

      const usageEl = document.createElement('span')
      usageEl.textContent = item.usage
      info.appendChild(usageEl)

      row.appendChild(info)
      sizeSection.appendChild(row)
    }

    container.appendChild(sizeSection)

    // Font Weights
    const weightSection = document.createElement('div')
    const weightTitle = document.createElement('h3')
    weightTitle.style.margin = '0 0 24px 0'
    weightTitle.style.fontSize = '18px'
    weightTitle.style.fontWeight = '600'
    weightTitle.textContent = 'Font Weight'
    weightSection.appendChild(weightTitle)

    const weights = [
      {
        token: '--font-weight-regular',
        value: '400',
        label: 'Regular',
        usage: 'Textos regulares, legibilidade equilibrada',
      },
      {
        token: '--font-weight-medium',
        value: '500',
        label: 'Medium',
        usage: 'Textos intermediários, hierarquia sem excesso de peso',
      },
      {
        token: '--font-weight-bold',
        value: '700',
        label: 'Bold',
        usage: 'Títulos e elementos com forte destaque visual',
      },
    ]

    for (const weight of weights) {
      const row = document.createElement('div')
      row.style.marginBottom = '16px'
      row.style.padding = '16px'
      row.style.border = '1px solid #e0e0e0'
      row.style.borderRadius = '8px'

      const text = document.createElement('div')
      text.style.fontSize = '24px'
      text.style.fontWeight = `var(${weight.token})`
      text.style.marginBottom = '8px'
      text.textContent = `${weight.label} - The quick brown fox`
      row.appendChild(text)

      const info = document.createElement('div')
      info.style.fontSize = '12px'
      info.style.color = '#666'
      info.innerHTML = `<code style="font-weight: 600;">${weight.token}</code> · <strong>${weight.value}</strong> · ${weight.usage}`
      row.appendChild(info)

      weightSection.appendChild(row)
    }

    container.appendChild(weightSection)

    return container
  },
}
