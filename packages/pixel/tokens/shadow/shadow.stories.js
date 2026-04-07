import '@pixel'

export default {
  title: 'Design Tokens/Shadow',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
Sistema de sombras para criar profundidade e hierarquia visual através de elevação.

## Níveis de Elevação

### Level 1
Sombra sutil (\`0px 4px 8px -1px rgba(0, 0, 0, 0.1)\`). Ideal para elementos de baixa elevação, como cards, inputs ou botões em estado default.

### Level 2
Sombra média (\`0px 8px 24px -1px rgba(0, 0, 0, 0.12)\`). Recomendada para componentes flutuantes como dropdowns, menus ou tooltips.

### Level 3
Sombra mais intensa (\`0px 16px 32px -1px rgba(0, 0, 0, 0.12)\`). Indicada para modais, side panels ou elementos de destaque visual.

### Level 4
Sombra profunda (\`0px 16px 48px -1px rgba(0, 0, 0, 0.16)\`). Usada para conteúdos com prioridade máxima, como modais principais, banners ou áreas sobrepostas.
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

    const shadows = [
      {
        token: '--shadow-level-1',
        label: 'Level 1',
        usage: 'Cards, botões e elementos com leve elevação',
        description: 'Sombra sutil ideal para elementos de baixa elevação',
      },
      {
        token: '--shadow-level-2',
        label: 'Level 2',
        usage: 'Menus suspensos, tooltips ou componentes interativos',
        description: 'Sombra média para componentes flutuantes',
      },
      {
        token: '--shadow-level-3',
        label: 'Level 3',
        usage: 'Modais ou painéis flutuantes com destaque',
        description: 'Sombra intensa para destaque visual',
      },
      {
        token: '--shadow-level-4',
        label: 'Level 4',
        usage: 'Elementos com máxima hierarquia e impacto visual',
        description: 'Sombra profunda para prioridade máxima',
      },
    ]

    const title = document.createElement('h3')
    title.style.margin = '0 0 24px 0'
    title.style.fontSize = '18px'
    title.style.fontWeight = '600'
    title.textContent = 'Shadow Levels'
    container.appendChild(title)

    for (const item of shadows) {
      const row = document.createElement('div')
      row.style.display = 'flex'
      row.style.alignItems = 'center'
      row.style.gap = '24px'
      row.style.marginBottom = '24px'
      row.style.padding = '16px'
      row.style.border = '1px solid #e0e0e0'
      row.style.borderRadius = '8px'
      row.style.backgroundColor = '#fafafa'

      const visual = document.createElement('div')
      visual.style.width = '120px'
      visual.style.height = '120px'
      visual.style.backgroundColor = '#ffffff'
      visual.style.borderRadius = '12px'
      visual.style.boxShadow = `var(${item.token})`
      visual.style.flexShrink = '0'
      visual.style.display = 'flex'
      visual.style.alignItems = 'center'
      visual.style.justifyContent = 'center'
      visual.style.fontSize = '14px'
      visual.style.fontWeight = '600'
      visual.style.color = '#6d5cae'
      visual.textContent = item.label
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
      details.textContent = item.usage
      info.appendChild(details)

      row.appendChild(info)
      container.appendChild(row)
    }

    return container
  },
}
