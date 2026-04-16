import './like'

export default {
  title: 'Data/Like',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
O componente \`nm-like\` é uma diretiva headless que filtra dados de um dataset baseado em uma busca parcial (like/contains).

## Características

- **Headless**: Não possui renderização visual
- **Case Insensitive**: Busca não diferencia maiúsculas de minúsculas
- **Filtro Parcial**: Busca valores que contenham o texto digitado
- **Filho de Dataset**: Deve ser filho direto de \`nm-dataset\`
- **Eventos**: Dispara \`liked\` com os resultados filtrados
- **Dataflow**: Integração via barramento de eventos com \`nm-on\`

## Sintaxe

\`\`\`html
<nm-dataset name="users" upsert="id">
  <nm-like key="name"></nm-like>
</nm-dataset>
\`\`\`

## Atributos

- **key**: Nome da propriedade a ser buscada no dataset (ex: \`name\`, \`email\`, \`title\`)
- **value**: Valor a ser buscado (geralmente definido via \`nm-on\`)

## Comportamento

O componente filtra os valores armazenados no dataset pai, retornando todos os itens onde
o valor da propriedade especificada em \`key\` contém o texto especificado em \`value\`.

## Eventos

### liked
Disparado após a busca. O \`event.detail\` contém um array com os itens encontrados.

**Nota**: O nome do evento é \`liked\`. Anteriormente era \`linke\`.

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com \`nm-on\`.

### Busca em Campo de Texto

\`\`\`html
<!-- Input de busca -->
<nm-input name="search">
  <nm-label>Buscar por nome</nm-label>
</nm-input>

<!-- Dataset com nm-like interno -->
<nm-dataset name="users" upsert="id">
  <nm-like key="name">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>
</nm-dataset>

<!-- Exibe quantidade de resultados -->
<nm-text value="0 resultados">
  <nm-on value="users/liked:attribute/value|len"></nm-on>
</nm-text>
\`\`\`

### Busca com Renderização de Resultados

\`\`\`html
<nm-input name="search">
  <nm-label>Buscar usuários</nm-label>
</nm-input>

<nm-dataset name="users" upsert="id">
  <nm-like key="name">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>
</nm-dataset>

<!-- Renderiza apenas os resultados filtrados -->
<nm-render>
  <template>
    <nm-text>{name} - {email}</nm-text>
  </template>
  <nm-on value="users/liked:method/render"></nm-on>
</nm-render>
\`\`\`

## Exemplos de Fluxos Completos

### Busca em Lista de Produtos

\`\`\`html
<!-- Campo de busca -->
<nm-input name="search">
  <nm-label>Buscar produto</nm-label>
</nm-input>

<!-- Botões para adicionar produtos -->
<nm-button value='{"id":1,"name":"Notebook","price":3000}'>
  Adicionar Notebook
</nm-button>
<nm-button value='{"id":2,"name":"Mouse","price":50}'>
  Adicionar Mouse
</nm-button>
<nm-button value='{"id":3,"name":"Teclado","price":200}'>
  Adicionar Teclado
</nm-button>

<!-- Dataset com filtro -->
<nm-dataset name="products" upsert="id">
  <nm-like key="name">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</nm-dataset>

<!-- Renderiza resultados filtrados -->
<nm-render>
  <template>
    <nm-stack>
      <nm-text>{name}</nm-text>
      <nm-text>R$ {price}</nm-text>
    </nm-stack>
  </template>
  <nm-on value="products/liked:method/render"></nm-on>
</nm-render>

<!-- Contador de resultados -->
<nm-text value="0 encontrados">
  <nm-on value="products/liked:attribute/value|len"></nm-on>
</nm-text>
\`\`\`

### Busca com Debounce

\`\`\`html
<!-- Input com delay -->
<nm-input name="search" debounce="300">
  <nm-label>Digite para buscar</nm-label>
</nm-input>

<nm-dataset name="users" upsert="id">
  <nm-like key="email">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>
</nm-dataset>

<nm-text value="Digite algo...">
  <nm-on value="users/liked:attribute/value|len"></nm-on>
</nm-text>
\`\`\`

### Busca em Múltiplas Propriedades

Para buscar em múltiplas propriedades, use múltiplos \`nm-like\`:

\`\`\`html
<nm-input name="search">
  <nm-label>Buscar</nm-label>
</nm-input>

<nm-dataset name="users" upsert="id">
  <!-- Busca por nome -->
  <nm-like key="name">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>

  <!-- Busca por email -->
  <nm-like key="email">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>
</nm-dataset>
\`\`\`

## Diferença entre Like e Found

- **nm-like**: Filtra múltiplos resultados com busca parcial (contains)
- **nm-found**: Busca um único resultado com match exato

\`\`\`html
<!-- Like: retorna array com todos que contêm "Jo" -->
<nm-like key="name" value="Jo"></nm-like>
<!-- Resultado: [{name:"João"}, {name:"Jorge"}] -->

<!-- Found: retorna objeto com match exato -->
<nm-found key="name" value="João"></nm-found>
<!-- Resultado: {name:"João"} -->
\`\`\`

## Integração com nm-render

O resultado de \`liked\` pode ser usado diretamente com \`nm-render\`:

\`\`\`html
<nm-dataset name="users" upsert="id">
  <nm-like key="name">
    <nm-on value="search/changed:attribute/value"></nm-on>
  </nm-like>
</nm-dataset>

<!-- Renderiza automaticamente os resultados filtrados -->
<nm-render>
  <template>
    <nm-card>
      <nm-text>{name}</nm-text>
    </nm-card>
  </template>
  <nm-on value="users/liked:method/render"></nm-on>
</nm-render>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    key: {
      control: 'text',
      description: 'Nome da propriedade a ser buscada no dataset',
    },
    value: {
      control: 'text',
      description: 'Valor a ser buscado (geralmente via nm-on)',
    },
  },
}

export const ProductSearch = {
  name: 'Busca de Produtos',
  render: () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <style>
        .story-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
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
        }
        .add-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .results-header {
          font-weight: 600;
          margin-top: 8px;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Sistema de Busca de Produtos</div>
        <div class="story-description">
          Adicione produtos e use o campo de busca para filtrar por nome.
          A busca é case-insensitive e busca por texto parcial.
        </div>

        <div class="add-buttons">
          <nm-button value='{"id":1,"name":"Notebook Dell","price":3500}'>
            + Notebook Dell
          </nm-button>
          <nm-button value='{"id":2,"name":"Mouse Logitech","price":150}'>
            + Mouse Logitech
          </nm-button>
          <nm-button value='{"id":3,"name":"Teclado Mecânico","price":450}'>
            + Teclado Mecânico
          </nm-button>
          <nm-button value='{"id":4,"name":"Webcam Logitech","price":350}'>
            + Webcam Logitech
          </nm-button>
          <nm-button value='{"id":5,"name":"Headset Gamer","price":280}'>
            + Headset Gamer
          </nm-button>
        </div>

        <nm-input name="search">
          <nm-label>🔍 Buscar produtos</nm-label>
        </nm-input>

        <nm-dataset name="products" upsert="id">
          <nm-like key="name">
            <nm-on value="search/changed:attribute/value"></nm-on>
          </nm-like>
          <nm-on value="nm-button/clicked:method/pushed"></nm-on>
        </nm-dataset>

        <div>
          <div class="results-header">
            Resultados encontrados:
            <nm-text value="0">
              <nm-on value="products/liked:attribute/value|len"></nm-on>
            </nm-text>
          </div>
        </div>

        <nm-render>
          <template>
            <nm-stack>
              <nm-text style="flex: 1;">{name}</nm-text>
              <nm-text style="font-weight: 600; color: #1976d2;">R$ {price}</nm-text>
            </nm-stack>
          </template>
          <nm-on value="products/liked:method/render"></nm-on>
        </nm-render>
      </div>
    `
    return container
  },
}

export const UserSearch = {
  name: 'Busca de Usuários',
  render: () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <style>
        .story-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
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
        }
      </style>

      <div class="story-container">
        <div class="story-title">Busca de Usuários por Nome</div>
        <div class="story-description">
          Busca case-insensitive em lista de usuários.
        </div>

        <nm-button value='{"id":1,"name":"João Silva","email":"joao@example.com"}'>
          Adicionar João Silva
        </nm-button>
        <nm-button value='{"id":2,"name":"Maria Santos","email":"maria@example.com"}'>
          Adicionar Maria Santos
        </nm-button>
        <nm-button value='{"id":3,"name":"José Oliveira","email":"jose@example.com"}'>
          Adicionar José Oliveira
        </nm-button>

        <nm-input name="search">
          <nm-label>Buscar por nome</nm-label>
        </nm-input>

        <nm-dataset name="users" upsert="id">
          <nm-like key="name">
            <nm-on value="search/changed:attribute/value"></nm-on>
          </nm-like>
          <nm-on value="nm-button/clicked:method/pushed"></nm-on>
        </nm-dataset>

        <div style="background: #f5f5f5; padding: 12px; border-radius: 8px;">
          <strong>Encontrados:</strong>
          <nm-text value="0">
            <nm-on value="users/liked:attribute/value|len"></nm-on>
          </nm-text>
        </div>

        <nm-render>
          <template>
            <nm-stack direction="column">
              <nm-text style="font-weight: 600;">{name}</nm-text>
              <nm-text style="color: #666; font-size: 14px;">{email}</nm-text>
            </nm-stack>
          </template>
          <nm-on value="users/liked:method/render"></nm-on>
        </nm-render>
      </div>
    `
    return container
  },
}
