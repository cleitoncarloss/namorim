import '@pixel'

export default {
  title: 'Design Tokens/Border Width',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
Sistema de espessura de bordas para criar contornos e separações visuais.

## Variações

- **none (0)**: Sem borda, para elementos que não precisam de contorno visível
- **hairline (1px)**: Borda ultrafina (1px), ideal para divisores sutis e contornos leves
- **thin (2px)**: Borda fina (2px), usada em inputs, botões e elementos interativos
- **thick (4px)**: Borda espessa (4px), aplicada em componentes destacados ou estados ativos
- **heavy (8px)**: Borda muito espessa (8px), para realce máximo e elementos de forte impacto visual
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

    const widths = [
      {
        token: '--border-width-none',
        value: '0',
        usage: 'Elementos que não precisam de contorno visível',
      },
      {
        token: '--border-width-hairline',
        value: '1px',
        usage: 'Divisores sutis e contornos leves',
      },
      {
        token: '--border-width-thin',
        value: '2px',
        usage: 'Inputs, botões e elementos interativos',
      },
      {
        token: '--border-width-thick',
        value: '4px',
        usage: 'Componentes destacados ou estados ativos',
      },
      {
        token: '--border-width-heavy',
        value: '8px',
        usage: 'Realce máximo e elementos de forte impacto visual',
      },
    ]

    const title = document.createElement('h3')
    title.style.margin = '0 0 24px 0'
    title.style.fontSize = '18px'
    title.style.fontWeight = '600'
    title.textContent = 'Border Width'
    container.appendChild(title)

    for (const item of widths) {
      const row = document.createElement('div')
      row.style.display = 'flex'
      row.style.alignItems = 'center'
      row.style.gap = '24px'
      row.style.marginBottom = '16px'
      row.style.padding = '16px'
      row.style.border = '1px solid #e0e0e0'
      row.style.borderRadius = '8px'

      const visual = document.createElement('div')
      visual.style.width = '100px'
      visual.style.height = '100px'
      visual.style.border = `var(${item.token}) solid #6d5cae`
      visual.style.borderRadius = '8px'
      visual.style.flexShrink = '0'
      row.appendChild(visual)

      const info = document.createElement('div')
      info.style.flex = '1'

      const tokenName = document.createElement('code')
      tokenName.style.fontSize = '14px'
      tokenName.style.fontWeight = '600'
      tokenName.style.display = 'block'
      tokenName.style.marginBottom = '4px'
      tokenName.textContent = item.token
      info.appendChild(tokenName)

      const details = document.createElement('div')
      details.style.fontSize = '12px'
      details.style.color = '#666'
      details.innerHTML = `<strong>${item.value}</strong> · ${item.usage}`
      info.appendChild(details)

      row.appendChild(info)
      container.appendChild(row)
    }

    return container
  },
}
