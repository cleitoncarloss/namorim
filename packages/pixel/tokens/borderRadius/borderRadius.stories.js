import '@pixel'

export default {
  title: 'Design Tokens/Border Radius',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
Sistema de arredondamento de bordas para criar hierarquia visual e consistência.

## Variações

- **none (0)**: Sem arredondamento, para elementos com cantos retos
- **xs (4px)**: Bordas levemente arredondadas, ideais para inputs e pequenos componentes
- **sm (8px)**: Arredondamento suave para botões, cartões e seções modulares
- **md (16px)**: Cantos mais arredondados para modais, popovers e componentes visuais
- **lg (24px)**: Arredondamento acentuado para componentes destacados
- **pill (500px)**: Formato de pílula, ideal para botões alongados e etiquetas
- **circular (50%)**: Arredondamento total para avatares, ícones e elementos circulares
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

    const radii = [
      {
        token: '--border-radius-none',
        value: '0',
        usage: 'Elementos com cantos retos',
      },
      {
        token: '--border-radius-xs',
        value: '4px',
        usage: 'Inputs e pequenos componentes',
      },
      {
        token: '--border-radius-sm',
        value: '8px',
        usage: 'Botões, cartões e seções modulares',
      },
      {
        token: '--border-radius-md',
        value: '16px',
        usage: 'Modais, popovers e componentes visuais',
      },
      {
        token: '--border-radius-lg',
        value: '24px',
        usage: 'Componentes destacados',
      },
      {
        token: '--border-radius-pill',
        value: '500px',
        usage: 'Botões alongados e etiquetas',
      },
      {
        token: '--border-radius-circular',
        value: '50%',
        usage: 'Avatares, ícones e elementos circulares',
      },
    ]

    const title = document.createElement('h3')
    title.style.margin = '0 0 24px 0'
    title.style.fontSize = '18px'
    title.style.fontWeight = '600'
    title.textContent = 'Border Radius'
    container.appendChild(title)

    for (const item of radii) {
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
      visual.style.backgroundColor = '#6d5cae'
      visual.style.borderRadius = `var(${item.token})`
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
