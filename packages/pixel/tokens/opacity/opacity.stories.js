import '@pixel'

export default {
  title: 'Design Tokens/Opacity',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
Sistema de níveis de opacidade para criar camadas, sobreposições e hierarquia de transparência.

## Níveis

- **semiopaque (0.72 / 72%)**: Alta visibilidade com leve transparência (72%). Ideal para sobreposições suaves como modais, menus ou tooltips com fundo parcialmente visível
- **intense (0.64 / 64%)**: Transparência moderada (64%) para elementos interativos em foco, como botões com hover ou componentes flutuantes
- **medium (0.32 / 32%)**: Transparência média (32%), recomendada para textos desabilitados, placeholders ou elementos em segundo plano
- **light (0.16 / 16%)**: Transparência leve (16%) para detalhes sutis como bordas, ícones decorativos ou fundos de apoio
- **semitransparent (0.08 / 8%)**: Baixíssima opacidade (8%), usada em microdetalhes, brilhos ou realces visuais quase imperceptíveis
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

    const opacities = [
      {
        token: '--opacity-level-semiopaque',
        value: '0.72',
        percent: '72%',
        usage: 'Sobreposições suaves, modais ou tooltips',
      },
      {
        token: '--opacity-level-intense',
        value: '0.64',
        percent: '64%',
        usage: 'Hover/focus states com presença visual',
      },
      {
        token: '--opacity-level-medium',
        value: '0.32',
        percent: '32%',
        usage: 'Textos desabilitados ou conteúdos secundários',
      },
      {
        token: '--opacity-level-light',
        value: '0.16',
        percent: '16%',
        usage: 'Detalhes sutis e efeitos decorativos',
      },
      {
        token: '--opacity-level-semitransparent',
        value: '0.08',
        percent: '8%',
        usage: 'Realces quase invisíveis ou camadas profundas',
      },
    ]

    const title = document.createElement('h3')
    title.style.margin = '0 0 24px 0'
    title.style.fontSize = '18px'
    title.style.fontWeight = '600'
    title.textContent = 'Opacity Levels'
    container.appendChild(title)

    for (const item of opacities) {
      const row = document.createElement('div')
      row.style.display = 'flex'
      row.style.alignItems = 'center'
      row.style.gap = '24px'
      row.style.marginBottom = '16px'
      row.style.padding = '16px'
      row.style.border = '1px solid #e0e0e0'
      row.style.borderRadius = '8px'
      row.style.backgroundColor = '#f5f5f5'

      const visual = document.createElement('div')
      visual.style.width = '100px'
      visual.style.height = '100px'
      visual.style.backgroundColor = '#6d5cae'
      visual.style.opacity = `var(${item.token})`
      visual.style.borderRadius = '8px'
      visual.style.flexShrink = '0'
      visual.style.position = 'relative'

      const label = document.createElement('div')
      label.style.position = 'absolute'
      label.style.top = '50%'
      label.style.left = '50%'
      label.style.transform = 'translate(-50%, -50%)'
      label.style.fontSize = '14px'
      label.style.fontWeight = '600'
      label.style.color = '#ffffff'
      label.style.opacity = '1'
      label.textContent = item.percent
      visual.appendChild(label)

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
