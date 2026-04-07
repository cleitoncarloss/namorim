import '@pixel'

export default {
  title: 'Design Tokens/Spacing',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
Sistema de espaçamento consistente para margins, paddings e gaps.

## Categorias

### Spacing (Margens e Gaps)
Valores para espaçamento externo entre elementos.

- **quarck (4px)**: Espaçamento ultra pequeno, ideal para microajustes em ícones e elementos compactos
- **nano (8px)**: Pequenos espaçamentos internos, usados em separação de elementos muito próximos
- **xxxs (16px)**: Margens e paddings sutis, úteis para pequenos agrupamentos de componentes
- **xxs (24px)**: Espaçamento padrão para separação entre elementos e seções menores
- **xs (32px)**: Espaço entre blocos de conteúdo, como cards e seções compactas
- **sm (40px)**: Margens de seções médias e espaçamentos internos mais pronunciados
- **md (48px)**: Espaçamento entre módulos e componentes de maior relevância visual
- **lg (56px)**: Separação entre blocos de conteúdo maiores, como seções de uma página
- **xl (64px)**: Margens e gaps grandes para conteúdos amplos e layouts arejados
- **xxl (80px)**: Uso em grandes seções, garantindo respiro visual significativo
- **xxxl (120px)**: Espaçamento extra grande para conteúdos que exigem hierarquia visual
- **huge (160px)**: Distâncias generosas entre seções para destacar blocos de informação
- **giant (200px)**: Máximo espaçamento, usado em seções hero ou conteúdos de grande impacto

### Spacing Inset (Preenchimentos Internos)
Valores para preenchimento interno de containers.

- **quarck (4px)**: Padding mínimo para pequenos botões ou chips
- **nano (8px)**: Preenchimento interno sutil, comum em badges e labels
- **xs (16px)**: Padding padrão para botões pequenos e cards compactos
- **sm (24px)**: Espaçamento interno para seções menores e cards médios
- **md (32px)**: Padding regular para caixas de conteúdo e containers padrões
- **lg (40px)**: Preenchimento interno mais amplo para seções destacadas
- **huge (48px)**: Padding generoso para grandes seções ou modais
- **giant (56px)**: Máximo preenchimento interno, usado em componentes hero e banners
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

    const spacings = [
      {
        token: '--spacing-quarck',
        value: '4px',
        usage: 'Microajustes em ícones e elementos compactos',
      },
      {
        token: '--spacing-nano',
        value: '8px',
        usage: 'Separação de elementos muito próximos',
      },
      {
        token: '--spacing-xxxs',
        value: '16px',
        usage: 'Pequenos agrupamentos de componentes',
      },
      {
        token: '--spacing-xxs',
        value: '24px',
        usage: 'Separação entre elementos e seções menores',
      },
      {
        token: '--spacing-xs',
        value: '32px',
        usage: 'Blocos de conteúdo, cards e seções compactas',
      },
      {
        token: '--spacing-sm',
        value: '40px',
        usage: 'Seções médias e espaçamentos pronunciados',
      },
      {
        token: '--spacing-md',
        value: '48px',
        usage: 'Módulos e componentes de maior relevância',
      },
      {
        token: '--spacing-lg',
        value: '56px',
        usage: 'Blocos de conteúdo maiores, seções de página',
      },
      {
        token: '--spacing-xl',
        value: '64px',
        usage: 'Conteúdos amplos e layouts arejados',
      },
      {
        token: '--spacing-xxl',
        value: '80px',
        usage: 'Grandes seções, respiro visual significativo',
      },
      {
        token: '--spacing-xxxl',
        value: '120px',
        usage: 'Conteúdos que exigem hierarquia visual',
      },
      {
        token: '--spacing-huge',
        value: '160px',
        usage: 'Destacar blocos de informação',
      },
      {
        token: '--spacing-giant',
        value: '200px',
        usage: 'Seções hero ou conteúdos de grande impacto',
      },
    ]

    const insets = [
      {
        token: '--spacing_inset-quarck',
        value: '4px',
        usage: 'Pequenos botões ou chips',
      },
      { token: '--spacing_inset-nano', value: '8px', usage: 'Badges e labels' },
      {
        token: '--spacing_inset-xs',
        value: '16px',
        usage: 'Botões pequenos e cards compactos',
      },
      {
        token: '--spacing_inset-sm',
        value: '24px',
        usage: 'Seções menores e cards médios',
      },
      {
        token: '--spacing_inset-md',
        value: '32px',
        usage: 'Caixas de conteúdo e containers padrões',
      },
      {
        token: '--spacing_inset-lg',
        value: '40px',
        usage: 'Seções destacadas',
      },
      {
        token: '--spacing_inset-huge',
        value: '48px',
        usage: 'Grandes seções ou modais',
      },
      {
        token: '--spacing_inset-giant',
        value: '56px',
        usage: 'Componentes hero e banners',
      },
    ]

    const sections = [
      { title: 'Spacing (Margins & Gaps)', items: spacings },
      { title: 'Spacing Inset (Paddings)', items: insets },
    ]

    for (const section of sections) {
      const sectionEl = document.createElement('div')

      const title = document.createElement('h3')
      title.style.margin = '0 0 24px 0'
      title.style.fontSize = '18px'
      title.style.fontWeight = '600'
      title.textContent = section.title
      sectionEl.appendChild(title)

      for (const item of section.items) {
        const row = document.createElement('div')
        row.style.display = 'flex'
        row.style.alignItems = 'center'
        row.style.gap = '16px'
        row.style.marginBottom = '12px'
        row.style.padding = '12px'
        row.style.border = '1px solid #e0e0e0'
        row.style.borderRadius = '8px'

        const visual = document.createElement('div')
        visual.style.backgroundColor = '#6d5cae'
        visual.style.height = '40px'
        visual.style.width = `var(${item.token})`
        visual.style.borderRadius = '4px'
        visual.style.minWidth = '4px'
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
        sectionEl.appendChild(row)
      }

      container.appendChild(sectionEl)
    }

    return container
  },
}
