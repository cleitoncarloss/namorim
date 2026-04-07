import './like'

export default {
  title: 'Data/Like',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
O componente \`morph-like\` é uma diretiva headless que filtra dados de um dataset baseado em uma busca parcial (like/contains).

## Características

- **Headless**: Não possui renderização visual
- **Case Insensitive**: Busca não diferencia maiúsculas de minúsculas
- **Filtro Parcial**: Busca valores que contenham o texto digitado
- **Filho de Dataset**: Deve ser filho direto de \`morph-dataset\`
- **Eventos**: Dispara \`liked\` com os resultados filtrados
- **Dataflow**: Integração via barramento de eventos com \`morph-on\`

## Sintaxe

\`\`\`html
<morph-dataset name="users" upsert="id">
  <morph-like key="name"></morph-like>
</morph-dataset>
\`\`\`

## Atributos

- **key**: Nome da propriedade a ser buscada no dataset (ex: \`name\`, \`email\`, \`title\`)
- **value**: Valor a ser buscado (geralmente definido via \`morph-on\`)

## Comportamento

O componente filtra os valores armazenados no dataset pai, retornando todos os itens onde
o valor da propriedade especificada em \`key\` contém o texto especificado em \`value\`.

## Eventos

### liked
Disparado após a busca. O \`event.detail\` contém um array com os itens encontrados.

**Nota**: O nome do evento é \`liked\`. Anteriormente era \`linke\`.

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com \`morph-on\`.

### Busca em Campo de Texto

\`\`\`html
<!-- Input de busca -->
<morph-input name="search">
  <morph-label>Buscar por nome</morph-label>
</morph-input>

<!-- Dataset com morph-like interno -->
<morph-dataset name="users" upsert="id">
  <morph-like key="name">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>
</morph-dataset>

<!-- Exibe quantidade de resultados -->
<morph-text value="0 resultados">
  <morph-on value="users/liked:attribute/value|len"></morph-on>
</morph-text>
\`\`\`

### Busca com Renderização de Resultados

\`\`\`html
<morph-input name="search">
  <morph-label>Buscar usuários</morph-label>
</morph-input>

<morph-dataset name="users" upsert="id">
  <morph-like key="name">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>
</morph-dataset>

<!-- Renderiza apenas os resultados filtrados -->
<morph-render>
  <template>
    <morph-text>{name} - {email}</morph-text>
  </template>
  <morph-on value="users/liked:method/render"></morph-on>
</morph-render>
\`\`\`

## Exemplos de Fluxos Completos

### Busca em Lista de Produtos

\`\`\`html
<!-- Campo de busca -->
<morph-input name="search">
  <morph-label>Buscar produto</morph-label>
</morph-input>

<!-- Botões para adicionar produtos -->
<morph-button value='{"id":1,"name":"Notebook","price":3000}'>
  Adicionar Notebook
</morph-button>
<morph-button value='{"id":2,"name":"Mouse","price":50}'>
  Adicionar Mouse
</morph-button>
<morph-button value='{"id":3,"name":"Teclado","price":200}'>
  Adicionar Teclado
</morph-button>

<!-- Dataset com filtro -->
<morph-dataset name="products" upsert="id">
  <morph-like key="name">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</morph-dataset>

<!-- Renderiza resultados filtrados -->
<morph-render>
  <template>
    <morph-stack>
      <morph-text>{name}</morph-text>
      <morph-text>R$ {price}</morph-text>
    </morph-stack>
  </template>
  <morph-on value="products/liked:method/render"></morph-on>
</morph-render>

<!-- Contador de resultados -->
<morph-text value="0 encontrados">
  <morph-on value="products/liked:attribute/value|len"></morph-on>
</morph-text>
\`\`\`

### Busca com Debounce

\`\`\`html
<!-- Input com delay -->
<morph-input name="search" debounce="300">
  <morph-label>Digite para buscar</morph-label>
</morph-input>

<morph-dataset name="users" upsert="id">
  <morph-like key="email">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>
</morph-dataset>

<morph-text value="Digite algo...">
  <morph-on value="users/liked:attribute/value|len"></morph-on>
</morph-text>
\`\`\`

### Busca em Múltiplas Propriedades

Para buscar em múltiplas propriedades, use múltiplos \`morph-like\`:

\`\`\`html
<morph-input name="search">
  <morph-label>Buscar</morph-label>
</morph-input>

<morph-dataset name="users" upsert="id">
  <!-- Busca por nome -->
  <morph-like key="name">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>

  <!-- Busca por email -->
  <morph-like key="email">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>
</morph-dataset>
\`\`\`

## Diferença entre Like e Found

- **morph-like**: Filtra múltiplos resultados com busca parcial (contains)
- **morph-found**: Busca um único resultado com match exato

\`\`\`html
<!-- Like: retorna array com todos que contêm "Jo" -->
<morph-like key="name" value="Jo"></morph-like>
<!-- Resultado: [{name:"João"}, {name:"Jorge"}] -->

<!-- Found: retorna objeto com match exato -->
<morph-found key="name" value="João"></morph-found>
<!-- Resultado: {name:"João"} -->
\`\`\`

## Integração com morph-render

O resultado de \`liked\` pode ser usado diretamente com \`morph-render\`:

\`\`\`html
<morph-dataset name="users" upsert="id">
  <morph-like key="name">
    <morph-on value="search/changed:attribute/value"></morph-on>
  </morph-like>
</morph-dataset>

<!-- Renderiza automaticamente os resultados filtrados -->
<morph-render>
  <template>
    <morph-card>
      <morph-text>{name}</morph-text>
    </morph-card>
  </template>
  <morph-on value="users/liked:method/render"></morph-on>
</morph-render>
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
      description: 'Valor a ser buscado (geralmente via morph-on)',
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
          <morph-button value='{"id":1,"name":"Notebook Dell","price":3500}'>
            + Notebook Dell
          </morph-button>
          <morph-button value='{"id":2,"name":"Mouse Logitech","price":150}'>
            + Mouse Logitech
          </morph-button>
          <morph-button value='{"id":3,"name":"Teclado Mecânico","price":450}'>
            + Teclado Mecânico
          </morph-button>
          <morph-button value='{"id":4,"name":"Webcam Logitech","price":350}'>
            + Webcam Logitech
          </morph-button>
          <morph-button value='{"id":5,"name":"Headset Gamer","price":280}'>
            + Headset Gamer
          </morph-button>
        </div>

        <morph-input name="search">
          <morph-label>🔍 Buscar produtos</morph-label>
        </morph-input>

        <morph-dataset name="products" upsert="id">
          <morph-like key="name">
            <morph-on value="search/changed:attribute/value"></morph-on>
          </morph-like>
          <morph-on value="morph-button/clicked:method/pushed"></morph-on>
        </morph-dataset>

        <div>
          <div class="results-header">
            Resultados encontrados:
            <morph-text value="0">
              <morph-on value="products/liked:attribute/value|len"></morph-on>
            </morph-text>
          </div>
        </div>

        <morph-render>
          <template>
            <morph-stack>
              <morph-text style="flex: 1;">{name}</morph-text>
              <morph-text style="font-weight: 600; color: #1976d2;">R$ {price}</morph-text>
            </morph-stack>
          </template>
          <morph-on value="products/liked:method/render"></morph-on>
        </morph-render>
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

        <morph-button value='{"id":1,"name":"João Silva","email":"joao@example.com"}'>
          Adicionar João Silva
        </morph-button>
        <morph-button value='{"id":2,"name":"Maria Santos","email":"maria@example.com"}'>
          Adicionar Maria Santos
        </morph-button>
        <morph-button value='{"id":3,"name":"José Oliveira","email":"jose@example.com"}'>
          Adicionar José Oliveira
        </morph-button>

        <morph-input name="search">
          <morph-label>Buscar por nome</morph-label>
        </morph-input>

        <morph-dataset name="users" upsert="id">
          <morph-like key="name">
            <morph-on value="search/changed:attribute/value"></morph-on>
          </morph-like>
          <morph-on value="morph-button/clicked:method/pushed"></morph-on>
        </morph-dataset>

        <div style="background: #f5f5f5; padding: 12px; border-radius: 8px;">
          <strong>Encontrados:</strong>
          <morph-text value="0">
            <morph-on value="users/liked:attribute/value|len"></morph-on>
          </morph-text>
        </div>

        <morph-render>
          <template>
            <morph-stack direction="column">
              <morph-text style="font-weight: 600;">{name}</morph-text>
              <morph-text style="color: #666; font-size: 14px;">{email}</morph-text>
            </morph-stack>
          </template>
          <morph-on value="users/liked:method/render"></morph-on>
        </morph-render>
      </div>
    `
    return container
  },
}
