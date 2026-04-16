import './responsive'

export default {
  title: 'Directives/Responsive',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
O componente \`nm-responsive\` é uma diretiva headless que aplica atributos ao elemento pai baseado em media queries.

## Uso

\`\`\`html
<div>
  <nm-responsive media="(max-width: 768px)" hidden></nm-responsive>
</div>
\`\`\`

## Atributo

- **media**: Media query CSS que será avaliada. Quando a query corresponde, todos os atributos (exceto on, is, class, style e media) são copiados para o elemento pai.

## Funcionamento

1. Escuta mudanças no atributo \`media\`
2. Avalia a media query usando \`window.matchMedia()\`
3. Se a query corresponde, copia todos os atributos permitidos para o elemento pai
4. Re-avalia automaticamente quando a janela é redimensionada (evento resize)

## Atributos Ignorados

Os seguintes atributos nunca são copiados para o elemento pai:
- \`on\` - Eventos
- \`is\` - Customized built-in elements
- \`class\` - Classes CSS
- \`style\` - Estilos inline
- \`media\` - A própria media query

## Exemplos de Media Queries

\`\`\`html
<!-- Mobile First: esconde em mobile -->
<nm-responsive media="(max-width: 768px)" hidden></nm-responsive>

<!-- Desktop Only: mostra apenas em desktop -->
<nm-responsive media="(min-width: 769px)" data-visible="true"></nm-responsive>

<!-- Tablet Range: aplica em tablets -->
<nm-responsive media="(min-width: 481px) and (max-width: 768px)" data-device="tablet"></nm-responsive>

<!-- Portrait Orientation -->
<nm-responsive media="(orientation: portrait)" data-layout="vertical"></nm-responsive>

<!-- High DPI Screens -->
<nm-responsive media="(min-resolution: 2dppx)" data-quality="high"></nm-responsive>
\`\`\`

## Combinação com Outros Componentes

\`\`\`html
<nm-button>
  Clique aqui
  <nm-responsive media="(max-width: 768px)" disabled></nm-responsive>
</nm-button>

<nm-text value="Desktop">
  <nm-responsive media="(max-width: 768px)" value="Mobile"></nm-responsive>
</nm-text>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    media: {
      control: 'text',
      description: 'Media query CSS para avaliação condicional',
    },
  },
}

export const Default = {
  name: 'Exemplo Básico',
  render: () => {
    const container = document.createElement('div')
    container.style.fontFamily = 'monospace'
    container.style.padding = '24px'
    container.style.backgroundColor = '#f5f5f5'
    container.style.borderRadius = '8px'

    container.innerHTML = `
      <p style="margin: 0 0 16px 0; font-weight: bold; font-size: 18px;">
        Exemplo de uso:
      </p>
      <code style="display: block; padding: 12px; background: #e0e0e0; border-radius: 4px; margin-bottom: 16px;">
        &lt;div&gt;<br>
        &nbsp;&nbsp;&lt;nm-responsive media="(max-width: 768px)" hidden&gt;&lt;/nm-responsive&gt;<br>
        &lt;/div&gt;
      </code>
      <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.6;">
        <strong>Componente headless</strong> - não renderiza elementos visuais.<br>
        Aplica atributos ao elemento pai quando a media query corresponde.<br>
        Monitora automaticamente o evento <strong>resize</strong> da janela.
      </p>
    `

    return container
  },
}

export const HideOnMobile = {
  name: 'Ocultar em Mobile',
  render: () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <style>
        .story-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .story-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .story-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .demo-box {
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
        }
        .info-box {
          padding: 16px;
          background: #e3f2fd;
          border-left: 4px solid #2196f3;
          border-radius: 4px;
          font-size: 14px;
          color: #1565c0;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Visibilidade Responsiva</div>
        <div class="story-description">
          Este elemento será ocultado automaticamente quando a largura da viewport for menor ou igual a 768px.
          <strong>Redimensione a janela</strong> para ver o efeito em ação.
        </div>

        <div class="demo-box">
          📱 Visível apenas em Desktop (> 768px)
          <nm-responsive media="(max-width: 768px)" hidden></nm-responsive>
        </div>

        <div class="info-box">
          💡 <strong>Dica:</strong> Abra as DevTools e use o modo responsivo para testar diferentes tamanhos de tela.
        </div>
      </div>
    `
    return container
  },
}

export const ShowOnMobile = {
  name: 'Mostrar apenas em Mobile',
  render: () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <style>
        .story-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .story-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .story-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .demo-box {
          padding: 20px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Mobile First</div>
        <div class="story-description">
          Este elemento começa oculto e só aparece quando a viewport é menor ou igual a 768px.
          <strong>Reduza a largura da janela</strong> para revelar o conteúdo mobile.
        </div>

        <div class="demo-box" hidden>
          📱 Visível apenas em Mobile (≤ 768px)
          <nm-responsive media="(max-width: 768px)" hidden="false"></nm-responsive>
        </div>
      </div>
    `
    return container
  },
}

export const TabletRange = {
  name: 'Range Específico (Tablet)',
  render: () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <style>
        .story-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .story-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .story-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .demo-box {
          padding: 20px;
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          color: #333;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Detecção de Tablet</div>
        <div class="story-description">
          Este elemento só aparece quando a viewport está entre 481px e 768px (típico de tablets).
          Teste diferentes tamanhos para ver quando ele aparece.
        </div>

        <div class="demo-box" hidden>
          💻 Modo Tablet Detectado (481px - 768px)
          <nm-responsive media="(min-width: 481px) and (max-width: 768px)" hidden="false"></nm-responsive>
        </div>
      </div>
    `
    return container
  },
}

export const MultipleBreakpoints = {
  name: 'Múltiplos Breakpoints',
  render: () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <style>
        .story-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .story-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .story-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .viewport-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .device-card {
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .device-card.mobile {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .device-card.tablet {
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          color: #333;
        }
        .device-card.desktop {
          background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
          color: white;
        }
        .device-card[hidden] {
          opacity: 0.3;
          transform: scale(0.95);
        }
      </style>

      <div class="story-container">
        <div class="story-title">Detecção Multi-Dispositivo</div>
        <div class="story-description">
          Cada card representa um dispositivo diferente. Observe como apenas um fica destacado
          por vez baseado no tamanho da viewport. <strong>Redimensione a janela</strong> para ver a transição.
        </div>

        <div class="viewport-info">
          <div class="device-card mobile">
            📱 Mobile<br>
            <small>≤ 480px</small>
            <nm-responsive media="(min-width: 481px)" hidden></nm-responsive>
          </div>

          <div class="device-card tablet" hidden>
            💻 Tablet<br>
            <small>481px - 768px</small>
            <nm-responsive media="(min-width: 481px) and (max-width: 768px)" hidden="false"></nm-responsive>
          </div>

          <div class="device-card desktop" hidden>
            🖥️ Desktop<br>
            <small>> 768px</small>
            <nm-responsive media="(min-width: 769px)" hidden="false"></nm-responsive>
          </div>
        </div>
      </div>
    `
    return container
  },
}

export const AttributeManipulation = {
  name: 'Manipulação de Atributos',
  render: () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <style>
        .story-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .story-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .story-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .demo-text {
          padding: 20px;
          background: #f5f5f5;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
        }
        .demo-text[data-device="mobile"] {
          background: #e3f2fd;
          color: #1565c0;
        }
        .demo-text[data-device="desktop"] {
          background: #f3e5f5;
          color: #6a1b9a;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Alteração Dinâmica de Atributos</div>
        <div class="story-description">
          O atributo <code>data-device</code> é alterado automaticamente baseado no tamanho da tela,
          o que muda a aparência do elemento via CSS. Útil para aplicar estilos condicionais.
        </div>

        <div class="demo-text" data-device="desktop">
          🖥️ Visualização: Desktop
          <nm-responsive media="(max-width: 768px)" data-device="mobile"></nm-responsive>
        </div>

        <div class="demo-text" data-device="desktop">
          Largura atual: Desktop (> 768px)
          <nm-responsive
            media="(max-width: 768px)"
            data-device="mobile"
          ></nm-responsive>
        </div>
      </div>
    `
    return container
  },
}

export const OrientationDetection = {
  name: 'Detecção de Orientação',
  render: () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <style>
        .story-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .story-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .story-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .orientation-box {
          padding: 40px 20px;
          border-radius: 12px;
          text-align: center;
          font-size: 18px;
          font-weight: 500;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        }
        .info-box {
          padding: 16px;
          background: #fff3e0;
          border-left: 4px solid #ff9800;
          border-radius: 4px;
          font-size: 14px;
          color: #e65100;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Orientação da Tela</div>
        <div class="story-description">
          Detecta se o dispositivo está em modo retrato (portrait) ou paisagem (landscape).
          Em dispositivos móveis, gire a tela para ver a mudança.
        </div>

        <div class="orientation-box" data-orientation="landscape">
          🖥️ Paisagem (Landscape)
          <nm-responsive media="(orientation: portrait)" data-orientation="portrait"></nm-responsive>
        </div>

        <div class="info-box">
          ⚠️ <strong>Nota:</strong> Em desktop, a orientação é baseada na proporção da janela (altura vs largura).
        </div>
      </div>
    `
    return container
  },
}
