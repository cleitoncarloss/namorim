import './redirect'

export default {
  title: 'Directives/Redirect',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
O componente \`nm-redirect\` e uma diretiva headless para navegacao programatica.

## Uso

\`\`\`html
<nm-redirect href="/dashboard"></nm-redirect>
\`\`\`

## Metodos

- **go()**: Executa a navegacao para o href configurado usando \`history.pushState\`

## Exemplo com Event Binding

\`\`\`html
<nm-button value="dashboard">Ir para Dashboard</nm-button>
<nm-redirect href="/dashboard">
  <nm-on value="button/clicked:method/go"></nm-on>
</nm-redirect>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    href: {
      control: 'text',
      description: 'URL de destino para navegacao',
    },
  },
}

export const Default = {
  render: () => {
    const container = document.createElement('div')
    container.style.fontFamily = 'monospace'
    container.style.padding = '16px'
    container.style.backgroundColor = '#f5f5f5'
    container.style.borderRadius = '8px'

    container.innerHTML = `
      <p style="margin: 0 0 8px 0; font-weight: bold;">Exemplo de uso:</p>
      <code style="display: block; padding: 8px; background: #e0e0e0; border-radius: 4px;">
        &lt;nm-redirect href="/dashboard"&gt;&lt;/nm-redirect&gt;
      </code>
      <p style="margin: 16px 0 8px 0; font-size: 12px; color: #666;">
        Componente headless - nao renderiza elementos visuais.
        Use o metodo <strong>go()</strong> para navegar.
      </p>
    `

    return container
  },
}
