import './render.ts'

export default {
  title: 'Directives/Render',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
O componente \`nm-render\` é uma diretiva que renderiza dinamicamente conteúdo baseado em templates e dados.

## Características

- **Renderização Dinâmica**: Renderiza templates com interpolação de dados
- **Interpolação**: Suporta \`{propriedade}\` e \`{objeto.propriedade}\`
- **Layouts Responsivos**: Suporta layouts list e grid
- **Batch Rendering**: Aceita arrays de dados para renderização em lote
- **Template Interno**: Usa \`<template>\` interno ou referência externa via atributo
- **Dataflow**: Integração via barramento de eventos com \`nm-on\`

## Sintaxe

\`\`\`html
<nm-render layout="list">
  <template>
    <nm-text>{name}</nm-text>
  </template>
</nm-render>
\`\`\`

## Atributos

- **layout**: Define o layout de renderização (\`list\` ou \`grid\`). Padrão: \`list\`
- **template**: ID de um template externo (alternativa ao template interno)

## Métodos (Chamados via Dataflow)

### render(payload)
Renderiza o template com os dados fornecidos. Aceita um objeto único ou array de objetos.

\`\`\`javascript
// Objeto único
render({ name: "João", age: 25 })

// Array de objetos
render([
  { name: "João", age: 25 },
  { name: "Maria", age: 30 }
])
\`\`\`

## Interpolação

O sistema de interpolação suporta:

- **Propriedades simples**: \`{name}\`, \`{age}\`, \`{id}\`
- **Propriedades aninhadas**: \`{user.name}\`, \`{address.city}\`
- **Valor completo**: \`{}\` retorna o objeto inteiro

\`\`\`html
<template>
  <nm-text>{name} - {age} anos</nm-text>
  <nm-text>Cidade: {address.city}</nm-text>
</template>
\`\`\`

## Layouts

### List Layout (Padrão)

Layout vertical com flex column, ideal para listas e formulários.

\`\`\`html
<nm-render layout="list">
  <template>
    <nm-card>
      <nm-text>{title}</nm-text>
    </nm-card>
  </template>
</nm-render>
\`\`\`

### Grid Layout

Layout responsivo em grid que se adapta ao tamanho do container:
- < 480px: 1 coluna
- 480px+: 2 colunas
- 720px+: 3 colunas
- 960px+: 4 colunas
- 1200px+: 5 colunas
- 1440px+: 6 colunas

\`\`\`html
<nm-render layout="grid">
  <template>
    <nm-card>
      <nm-text>{name}</nm-text>
    </nm-card>
  </template>
</nm-render>
\`\`\`

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com \`nm-on\`.

**IMPORTANTE**: O \`nm-on\` deve ser **filho** do componente que ele manipula, pois ele opera no elemento pai.

### Renderizando Dados de um Dataset

\`\`\`html
<!-- Dataset com dados -->
<nm-dataset name="users" upsert="id"></nm-dataset>

<!-- Render com nm-on interno -->
<nm-render>
  <template>
    <nm-text>{name} - {age} anos</nm-text>
  </template>
  <nm-on value="users/changed:method/render"></nm-on>
</nm-render>
\`\`\`

### Renderizando Dados de um Fetch

\`\`\`html
<!-- Botão trigger -->
<nm-button>Carregar Usuários</nm-button>

<!-- Fetch -->
<nm-fetch name="api" url="https://api.example.com/users">
  <nm-on value="nm-button/clicked:method/get"></nm-on>
</nm-fetch>

<!-- Render -->
<nm-render>
  <template>
    <nm-card>
      <nm-text>{name}</nm-text>
      <nm-text>{email}</nm-text>
    </nm-card>
  </template>
  <nm-on value="api/succeeded:method/render"></nm-on>
</nm-render>
\`\`\`

## Exemplos de Fluxos Completos

### Fluxo Simples de Lista

\`\`\`html
<!-- Botão que adiciona dados -->
<nm-button value='[{"name":"João"},{"name":"Maria"}]'>
  Renderizar Lista
</nm-button>

<!-- Render -->
<nm-render>
  <template>
    <nm-text>{name}</nm-text>
  </template>
  <nm-on value="nm-button/clicked:method/render"></nm-on>
</nm-render>
\`\`\`

### Fluxo com Dataset (CRUD Completo)

\`\`\`html
<!-- Botões de controle -->
<nm-button value='{"id":1,"name":"João","age":25}'>
  Adicionar João
</nm-button>

<!-- Dataset -->
<nm-dataset name="users" upsert="id">
  <nm-on value="nm-button/clicked:method/push"></nm-on>
</nm-dataset>

<!-- Render automático quando dataset muda -->
<nm-render layout="list">
  <template>
    <nm-stack width="fill">
      <nm-text>{name} - {age} anos</nm-text>
      <nm-button value="{id}" color="error">
        <nm-icon use="delete"></nm-icon>
      </nm-button>
    </nm-stack>
  </template>
  <nm-on value="users/changed:method/render"></nm-on>
</nm-render>

<!-- Botão de deletar é conectado ao dataset -->
<nm-dataset name="users" upsert="id">
  <nm-on value="nm-button/clicked:method/delete"></nm-on>
</nm-dataset>
\`\`\`

### Fluxo com Grid Responsivo

\`\`\`html
<nm-button value='[
  {"id":1,"name":"Produto 1","price":"R$ 100"},
  {"id":2,"name":"Produto 2","price":"R$ 200"},
  {"id":3,"name":"Produto 3","price":"R$ 300"}
]'>Renderizar Produtos</nm-button>

<nm-render layout="grid">
  <template>
    <nm-card>
      <nm-heading size="xs">{name}</nm-heading>
      <nm-text>{price}</nm-text>
      <nm-button value="{id}" width="fill">Comprar</nm-button>
    </nm-card>
  </template>
  <nm-on value="nm-button/clicked:method/render"></nm-on>
</nm-render>
\`\`\`

### Fluxo com Interpolação Aninhada

\`\`\`html
<nm-button value='[
  {"name":"João","address":{"city":"São Paulo","state":"SP"}},
  {"name":"Maria","address":{"city":"Rio de Janeiro","state":"RJ"}}
]'>Renderizar Endereços</nm-button>

<nm-render>
  <template>
    <nm-card>
      <nm-text>{name}</nm-text>
      <nm-text>{address.city} - {address.state}</nm-text>
    </nm-card>
  </template>
  <nm-on value="nm-button/clicked:method/render"></nm-on>
</nm-render>
\`\`\`

## Uso com Template Externo

Ao invés de template interno, você pode referenciar um template externo:

\`\`\`html
<!-- Template externo no documento -->
<template id="user-template">
  <nm-text>{name}</nm-text>
</template>

<!-- Render referenciando o template -->
<nm-render template="user-template">
  <nm-on value="users/changed:method/render"></nm-on>
</nm-render>
\`\`\`

## Performance

- A renderização usa \`requestAnimationFrame\` para otimizar a atualização do DOM
- Templates são processados uma vez e reutilizados
- A interpolação é feita via \`Function\` para performance máxima

## Comportamento de Array

Quando um array é passado para \`render()\`, cada item é renderizado usando o template:

\`\`\`javascript
// Array com 3 itens gera 3 elementos renderizados
render([
  { name: "João" },
  { name: "Maria" },
  { name: "Pedro" }
])
\`\`\`

Cada renderização sobrescreve a anterior. Para adicionar itens incrementalmente, use \`nm-dataset\`.
        `,
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['list', 'grid'],
      description: 'Define o layout de renderização',
    },
    template: {
      control: 'text',
      description: 'ID de um template externo',
    },
  },
}

export const SimpleList = {
  name: 'Lista Simples',
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
        <div class="story-title">Renderização Simples de Lista</div>
        <div class="story-description">
          Exemplo básico de renderização dinâmica. Clique no botão para renderizar
          uma lista de nomes usando o template interno.
        </div>

        <nm-button value='[
          {"name":"João Silva"},
          {"name":"Maria Santos"},
          {"name":"Pedro Oliveira"},
          {"name":"Ana Costa"}
        ]'>
          Renderizar Lista
          <nm-icon use="list"></nm-icon>
        </nm-button>

        <nm-render layout="list">
          <template>
            <nm-text>{name}</nm-text>
          </template>
          <nm-on value="nm-button/clicked:method/render"></nm-on>
        </nm-render>
      </div>
    `
    return container
  },
}

export const GridLayout = {
  name: 'Layout em Grid Responsivo',
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
        <div class="story-title">Grid Responsivo de Produtos</div>
        <div class="story-description">
          Demonstra layout em grid que se adapta ao tamanho da tela. Redimensione
          a janela para ver as colunas se ajustarem automaticamente.
        </div>

        <nm-button value='[
          {"id":1,"name":"Produto 1","price":"R$ 99,90","category":"Eletrônicos"},
          {"id":2,"name":"Produto 2","price":"R$ 149,90","category":"Casa"},
          {"id":3,"name":"Produto 3","price":"R$ 199,90","category":"Esportes"},
          {"id":4,"name":"Produto 4","price":"R$ 299,90","category":"Moda"},
          {"id":5,"name":"Produto 5","price":"R$ 399,90","category":"Livros"},
          {"id":6,"name":"Produto 6","price":"R$ 499,90","category":"Games"}
        ]'>
          Renderizar Produtos
          <nm-icon use="grid_view"></nm-icon>
        </nm-button>

        <nm-render layout="grid">
          <template>
            <nm-card>
              <nm-stack direction="column" gap="sm">
                <nm-heading size="xs">{name}</nm-heading>
                <nm-text color="textSecondary">{category}</nm-text>
                <nm-text color="primary" weight="bold">{price}</nm-text>
                <nm-button width="fill">
                  Comprar
                  <nm-icon use="shopping_cart"></nm-icon>
                </nm-button>
              </nm-stack>
            </nm-card>
          </template>
          <nm-on value="nm-button/clicked:method/render"></nm-on>
        </nm-render>
      </div>
    `
    return container
  },
}

export const WithDataset = {
  name: 'Integração com Dataset',
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
          max-width: 800px;
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
        .controls {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
      </style>

      <div class="story-container">
        <div class="story-title">CRUD com Renderização Dinâmica</div>
        <div class="story-description">
          Exemplo completo integrando nm-dataset e nm-render. Adicione usuários
          e veja a lista ser atualizada automaticamente. Cada item pode ser removido
          individualmente.
        </div>

        <div class="controls">
          <nm-button value='{"id":1,"name":"João Silva","age":25,"role":"Desenvolvedor"}'>
            Adicionar João
            <nm-icon use="person_add"></nm-icon>
          </nm-button>

          <nm-button value='{"id":2,"name":"Maria Santos","age":30,"role":"Designer"}'>
            Adicionar Maria
            <nm-icon use="person_add"></nm-icon>
          </nm-button>

          <nm-button value='{"id":3,"name":"Pedro Oliveira","age":28,"role":"Product Manager"}'>
            Adicionar Pedro
            <nm-icon use="person_add"></nm-icon>
          </nm-button>

          <nm-button name="clear" variant="outlined" color="error">
            Limpar Todos
            <nm-icon use="clear_all"></nm-icon>
          </nm-button>
        </div>

        <div style="background: #f5f5f5; padding: 12px; border-radius: 8px;">
          <strong>Total de usuários:</strong>
          <nm-text value="0">
            <nm-on value="users/changed:attribute/value|len"></nm-on>
          </nm-text>
        </div>

        <nm-render layout="list">
          <template>
            <nm-card>
              <nm-stack width="fill" gap="md">
                <nm-stack direction="column" gap="xs" width="fill">
                  <nm-text weight="bold">{name}</nm-text>
                  <nm-text color="textSecondary" size="sm">{role} • {age} anos</nm-text>
                </nm-stack>
                <nm-button name="delete" value="{id}" color="error" variant="outlined">
                  <nm-icon use="delete"></nm-icon>
                </nm-button>
              </nm-stack>
            </nm-card>
          </template>
          <nm-on value="users/changed:method/render"></nm-on>
        </nm-render>

        <nm-dataset name="users" upsert="id">
          <nm-on value="nm-button/clicked:method/push"></nm-on>
          <nm-on value="delete/clicked:method/deleted"></nm-on>
          <nm-on value="clear/clicked:method/resetted"></nm-on>
        </nm-dataset>
      </div>
    `
    return container
  },
}

export const NestedInterpolation = {
  name: 'Interpolação de Dados Aninhados',
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
        <div class="story-title">Interpolação de Objetos Aninhados</div>
        <div class="story-description">
          Demonstra interpolação de propriedades aninhadas usando notação de ponto.
          Suporta qualquer nível de aninhamento.
        </div>

        <nm-button value='[
          {
            "id":1,
            "name":"João Silva",
            "contact":{"email":"joao@example.com","phone":"(11) 98765-4321"},
            "address":{"street":"Av. Paulista, 1000","city":"São Paulo","state":"SP"}
          },
          {
            "id":2,
            "name":"Maria Santos",
            "contact":{"email":"maria@example.com","phone":"(21) 91234-5678"},
            "address":{"street":"Av. Atlântica, 500","city":"Rio de Janeiro","state":"RJ"}
          }
        ]'>
          Renderizar Contatos
          <nm-icon use="contacts"></nm-icon>
        </nm-button>

        <nm-render layout="list">
          <template>
            <nm-card>
              <nm-stack direction="column" gap="sm">
                <nm-heading size="xs">{name}</nm-heading>

                <nm-stack direction="column" gap="xs">
                  <nm-text color="textSecondary" size="sm">
                    <nm-icon use="email" size="sm"></nm-icon>
                    {contact.email}
                  </nm-text>
                  <nm-text color="textSecondary" size="sm">
                    <nm-icon use="phone" size="sm"></nm-icon>
                    {contact.phone}
                  </nm-text>
                </nm-stack>

                <nm-stack direction="column" gap="xs">
                  <nm-text size="sm">
                    <nm-icon use="location_on" size="sm"></nm-icon>
                    {address.street}
                  </nm-text>
                  <nm-text color="textSecondary" size="sm">
                    {address.city} - {address.state}
                  </nm-text>
                </nm-stack>
              </nm-stack>
            </nm-card>
          </template>
          <nm-on value="nm-button/clicked:method/render"></nm-on>
        </nm-render>
      </div>
    `
    return container
  },
}

export const WithFetch = {
  name: 'Integração com Fetch (API Real)',
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
        <div class="story-title">Dados de API Externa</div>
        <div class="story-description">
          Exemplo de integração com API real (JSONPlaceholder). Clique para buscar
          dados e renderizar automaticamente. Demonstra o fluxo completo fetch → render.
        </div>

        <nm-button name="load">
          Carregar Usuários da API
          <nm-icon use="cloud_download"></nm-icon>
        </nm-button>

        <nm-text value="">
          <nm-on value="load/clicked:attribute/value|always=Carregando..."></nm-on>
          <nm-on value="api/succeeded:attribute/value|always=Dados carregados!"></nm-on>
          <nm-on value="api/errored:attribute/value|always=Erro ao carregar dados"></nm-on>
        </nm-text>

        <nm-render layout="list">
          <template>
            <nm-card>
              <nm-stack direction="column" gap="xs">
                <nm-text weight="bold">{name}</nm-text>
                <nm-text color="textSecondary" size="sm">
                  <nm-icon use="email" size="sm"></nm-icon>
                  {email}
                </nm-text>
                <nm-text color="textSecondary" size="sm">
                  <nm-icon use="business" size="sm"></nm-icon>
                  {company.name}
                </nm-text>
              </nm-stack>
            </nm-card>
          </template>
          <nm-on value="api/succeeded:method/render"></nm-on>
        </nm-render>

        <nm-fetch name="api" url="https://jsonplaceholder.typicode.com/users">
          <nm-on value="load/clicked:method/get"></nm-on>
        </nm-fetch>
      </div>
    `
    return container
  },
}

export const EmptyState = {
  name: 'Estado Vazio',
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
        .empty-state {
          padding: 48px 24px;
          text-align: center;
          background: #f5f5f5;
          border-radius: 8px;
          color: #666;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Estado Inicial Vazio</div>
        <div class="story-description">
          Demonstra comportamento quando não há dados para renderizar. O render
          começa vazio e só mostra conteúdo após receber dados.
        </div>

        <nm-button value='[
          {"name":"Primeiro Item"},
          {"name":"Segundo Item"},
          {"name":"Terceiro Item"}
        ]'>
          Renderizar Itens
          <nm-icon use="add"></nm-icon>
        </nm-button>

        <nm-button name="clear" variant="outlined">
          Limpar Lista
          <nm-icon use="clear"></nm-icon>
        </nm-button>

        <nm-render layout="list">
          <template>
            <nm-card>
              <nm-text>{name}</nm-text>
            </nm-card>
          </template>
          <nm-on value="nm-button/clicked:method/render"></nm-on>
          <nm-on value="clear/clicked:method/render|always=[]"></nm-on>
        </nm-render>

        <div class="empty-state">
          <nm-icon use="inbox" size="lg"></nm-icon>
          <p>Nenhum item renderizado ainda</p>
        </div>
      </div>
    `
    return container
  },
}
