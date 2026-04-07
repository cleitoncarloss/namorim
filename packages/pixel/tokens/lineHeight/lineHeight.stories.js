import '@pixel'

export default {
  title: 'Design Tokens/Line Height',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
Sistema de altura de linha para otimizar legibilidade em diferentes contextos de texto.

## Variações

- **default (100%)**: Uso padrão, alinhado ao tamanho da fonte sem espaçamento extra
- **xs (115%)**: Textos compactos com mínima altura de linha, ideal para botões e labels
- **sm (120%)**: Textos curtos ou títulos menores, garantindo boa legibilidade sem excesso de espaço
- **md (133%)**: Padrão para parágrafos regulares, proporcionando leitura confortável
- **lg (150%)**: Textos longos, como descrições detalhadas ou artigos, melhorando o fluxo da leitura
- **xl (170%)**: Conteúdos extensos, garantindo espaçamento adequado em textos densos
- **xxl (200%)**: Títulos grandes ou textos hero com espaçamento amplo para impacto visual
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
    container.style.gap = '24px'

    const lineHeights = [
      {
        token: '--line-height-default',
        value: '100%',
        usage: 'Alinhado ao tamanho da fonte sem espaçamento extra',
      },
      {
        token: '--line-height-xs',
        value: '115%',
        usage: 'Textos compactos, ideal para botões e labels',
      },
      {
        token: '--line-height-sm',
        value: '120%',
        usage: 'Textos curtos ou títulos menores',
      },
      {
        token: '--line-height-md',
        value: '133%',
        usage: 'Parágrafos regulares, leitura confortável',
      },
      {
        token: '--line-height-lg',
        value: '150%',
        usage: 'Textos longos, descrições detalhadas ou artigos',
      },
      {
        token: '--line-height-xl',
        value: '170%',
        usage: 'Conteúdos extensos, textos densos',
      },
      {
        token: '--line-height-xxl',
        value: '200%',
        usage: 'Títulos grandes ou textos hero com impacto visual',
      },
    ]

    const title = document.createElement('h3')
    title.style.margin = '0 0 24px 0'
    title.style.fontSize = '18px'
    title.style.fontWeight = '600'
    title.textContent = 'Line Height'
    container.appendChild(title)

    for (const item of lineHeights) {
      const row = document.createElement('div')
      row.style.marginBottom = '24px'
      row.style.padding = '16px'
      row.style.border = '1px solid #e0e0e0'
      row.style.borderRadius = '8px'

      const sample = document.createElement('div')
      sample.style.fontSize = '16px'
      sample.style.lineHeight = `var(${item.token})`
      sample.style.marginBottom = '12px'
      sample.style.backgroundColor = '#f9f9f9'
      sample.style.padding = '12px'
      sample.style.borderRadius = '4px'
      sample.innerHTML = `
        <div style="border-bottom: 1px solid #e0e0e0; margin-bottom: 4px;">Line one of sample text</div>
        <div style="border-bottom: 1px solid #e0e0e0; margin-bottom: 4px;">Line two of sample text</div>
        <div>Line three of sample text</div>
      `
      row.appendChild(sample)

      const info = document.createElement('div')
      info.style.fontSize = '12px'
      info.style.color = '#666'
      info.style.display = 'flex'
      info.style.gap = '16px'

      const tokenEl = document.createElement('code')
      tokenEl.style.fontWeight = '600'
      tokenEl.textContent = item.token
      info.appendChild(tokenEl)

      const valueEl = document.createElement('strong')
      valueEl.textContent = item.value
      info.appendChild(valueEl)

      const usageEl = document.createElement('span')
      usageEl.textContent = item.usage
      info.appendChild(usageEl)

      row.appendChild(info)
      container.appendChild(row)
    }

    return container
  },
}
