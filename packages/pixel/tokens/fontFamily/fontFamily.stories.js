import '@pixel'

export default {
  title: 'Design Tokens/Font Family',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
Sistema de famílias tipográficas para hierarquia e identidade visual.

## Variações

### Highlight (Roboto Condensed)
\`"Roboto Condensed", sans-serif\`

Fonte de destaque, utilizada em títulos, chamadas de atenção e elementos que precisam de impacto visual.

### Base (Roboto)
\`"Roboto", sans-serif\`

Fonte padrão para textos regulares, garantindo legibilidade e consistência na interface.
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
    container.style.gap = '32px'

    const families = [
      {
        token: '--font-family-highlight',
        name: 'Roboto Condensed',
        usage: 'Fonte de destaque para títulos e elementos impactantes',
      },
      {
        token: '--font-family-base',
        name: 'Roboto',
        usage: 'Fonte padrão para textos regulares, garantindo legibilidade',
      },
    ]

    const title = document.createElement('h3')
    title.style.margin = '0 0 24px 0'
    title.style.fontSize = '18px'
    title.style.fontWeight = '600'
    title.textContent = 'Font Families'
    container.appendChild(title)

    for (const item of families) {
      const row = document.createElement('div')
      row.style.marginBottom = '24px'
      row.style.padding = '24px'
      row.style.border = '1px solid #e0e0e0'
      row.style.borderRadius = '8px'

      const sample = document.createElement('div')
      sample.style.fontFamily = `var(${item.token})`
      sample.style.fontSize = '32px'
      sample.style.marginBottom = '16px'
      sample.style.lineHeight = '1.2'
      sample.textContent = 'The quick brown fox jumps over the lazy dog'
      row.appendChild(sample)

      const alphabet = document.createElement('div')
      alphabet.style.fontFamily = `var(${item.token})`
      alphabet.style.fontSize = '16px'
      alphabet.style.marginBottom = '16px'
      alphabet.style.color = '#666'
      alphabet.textContent =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789'
      row.appendChild(alphabet)

      const info = document.createElement('div')
      info.style.fontSize = '12px'
      info.style.color = '#666'
      info.style.display = 'flex'
      info.style.gap = '16px'

      const tokenEl = document.createElement('code')
      tokenEl.style.fontWeight = '600'
      tokenEl.textContent = item.token
      info.appendChild(tokenEl)

      const nameEl = document.createElement('strong')
      nameEl.textContent = item.name
      info.appendChild(nameEl)

      const usageEl = document.createElement('span')
      usageEl.textContent = item.usage
      info.appendChild(usageEl)

      row.appendChild(info)
      container.appendChild(row)
    }

    return container
  },
}
