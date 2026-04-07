import './render.ts'

export default {
  title: 'Directives/Render',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
O componente \`morph-render\` é uma diretiva que renderiza dinamicamente conteúdo baseado em templates e dados.

## Características

- **Renderização Dinâmica**: Renderiza templates com interpolação de dados
- **Interpolação**: Suporta \`{propriedade}\` e \`{objeto.propriedade}\`
- **Layouts Responsivos**: Suporta layouts list e grid
- **Batch Rendering**: Aceita arrays de dados para renderização em lote
- **Template Interno**: Usa \`<template>\` interno ou referência externa via atributo
- **Dataflow**: Integração via barramento de eventos com \`morph-on\`

## Sintaxe

\`\`\`html
<morph-render layout="list">
  <template>
    <morph-text>{name}</morph-text>
  </template>
</morph-render>
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
  <morph-text>{name} - {age} anos</morph-text>
  <morph-text>Cidade: {address.city}</morph-text>
</template>
\`\`\`

## Layouts

### List Layout (Padrão)

Layout vertical com flex column, ideal para listas e formulários.

\`\`\`html
<morph-render layout="list">
  <template>
    <morph-card>
      <morph-text>{title}</morph-text>
    </morph-card>
  </template>
</morph-render>
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
<morph-render layout="grid">
  <template>
    <morph-card>
      <morph-text>{name}</morph-text>
    </morph-card>
  </template>
</morph-render>
\`\`\`

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com \`morph-on\`.

**IMPORTANTE**: O \`morph-on\` deve ser **filho** do componente que ele manipula, pois ele opera no elemento pai.

### Renderizando Dados de um Dataset

\`\`\`html
<!-- Dataset com dados -->
<morph-dataset name="users" upsert="id"></morph-dataset>

<!-- Render com morph-on interno -->
<morph-render>
  <template>
    <morph-text>{name} - {age} anos</morph-text>
  </template>
  <morph-on value="users/changed:method/render"></morph-on>
</morph-render>
\`\`\`

### Renderizando Dados de um Fetch

\`\`\`html
<!-- Botão trigger -->
<morph-button>Carregar Usuários</morph-button>

<!-- Fetch -->
<morph-fetch name="api" url="https://api.example.com/users">
  <morph-on value="morph-button/clicked:method/get"></morph-on>
</morph-fetch>

<!-- Render -->
<morph-render>
  <template>
    <morph-card>
      <morph-text>{name}</morph-text>
      <morph-text>{email}</morph-text>
    </morph-card>
  </template>
  <morph-on value="api/succeeded:method/render"></morph-on>
</morph-render>
\`\`\`

## Exemplos de Fluxos Completos

### Fluxo Simples de Lista

\`\`\`html
<!-- Botão que adiciona dados -->
<morph-button value='[{"name":"João"},{"name":"Maria"}]'>
  Renderizar Lista
</morph-button>

<!-- Render -->
<morph-render>
  <template>
    <morph-text>{name}</morph-text>
  </template>
  <morph-on value="morph-button/clicked:method/render"></morph-on>
</morph-render>
\`\`\`

### Fluxo com Dataset (CRUD Completo)

\`\`\`html
<!-- Botões de controle -->
<morph-button value='{"id":1,"name":"João","age":25}'>
  Adicionar João
</morph-button>

<!-- Dataset -->
<morph-dataset name="users" upsert="id">
  <morph-on value="morph-button/clicked:method/push"></morph-on>
</morph-dataset>

<!-- Render automático quando dataset muda -->
<morph-render layout="list">
  <template>
    <morph-stack width="fill">
      <morph-text>{name} - {age} anos</morph-text>
      <morph-button value="{id}" color="error">
        <morph-icon use="delete"></morph-icon>
      </morph-button>
    </morph-stack>
  </template>
  <morph-on value="users/changed:method/render"></morph-on>
</morph-render>

<!-- Botão de deletar é conectado ao dataset -->
<morph-dataset name="users" upsert="id">
  <morph-on value="morph-button/clicked:method/delete"></morph-on>
</morph-dataset>
\`\`\`

### Fluxo com Grid Responsivo

\`\`\`html
<morph-button value='[
  {"id":1,"name":"Produto 1","price":"R$ 100"},
  {"id":2,"name":"Produto 2","price":"R$ 200"},
  {"id":3,"name":"Produto 3","price":"R$ 300"}
]'>Renderizar Produtos</morph-button>

<morph-render layout="grid">
  <template>
    <morph-card>
      <morph-heading size="xs">{name}</morph-heading>
      <morph-text>{price}</morph-text>
      <morph-button value="{id}" width="fill">Comprar</morph-button>
    </morph-card>
  </template>
  <morph-on value="morph-button/clicked:method/render"></morph-on>
</morph-render>
\`\`\`

### Fluxo com Interpolação Aninhada

\`\`\`html
<morph-button value='[
  {"name":"João","address":{"city":"São Paulo","state":"SP"}},
  {"name":"Maria","address":{"city":"Rio de Janeiro","state":"RJ"}}
]'>Renderizar Endereços</morph-button>

<morph-render>
  <template>
    <morph-card>
      <morph-text>{name}</morph-text>
      <morph-text>{address.city} - {address.state}</morph-text>
    </morph-card>
  </template>
  <morph-on value="morph-button/clicked:method/render"></morph-on>
</morph-render>
\`\`\`

## Uso com Template Externo

Ao invés de template interno, você pode referenciar um template externo:

\`\`\`html
<!-- Template externo no documento -->
<template id="user-template">
  <morph-text>{name}</morph-text>
</template>

<!-- Render referenciando o template -->
<morph-render template="user-template">
  <morph-on value="users/changed:method/render"></morph-on>
</morph-render>
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

Cada renderização sobrescreve a anterior. Para adicionar itens incrementalmente, use \`morph-dataset\`.
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

        <morph-button value='[
          {"name":"João Silva"},
          {"name":"Maria Santos"},
          {"name":"Pedro Oliveira"},
          {"name":"Ana Costa"}
        ]'>
          Renderizar Lista
          <morph-icon use="list"></morph-icon>
        </morph-button>

        <morph-render layout="list">
          <template>
            <morph-text>{name}</morph-text>
          </template>
          <morph-on value="morph-button/clicked:method/render"></morph-on>
        </morph-render>
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

        <morph-button value='[
          {"id":1,"name":"Produto 1","price":"R$ 99,90","category":"Eletrônicos"},
          {"id":2,"name":"Produto 2","price":"R$ 149,90","category":"Casa"},
          {"id":3,"name":"Produto 3","price":"R$ 199,90","category":"Esportes"},
          {"id":4,"name":"Produto 4","price":"R$ 299,90","category":"Moda"},
          {"id":5,"name":"Produto 5","price":"R$ 399,90","category":"Livros"},
          {"id":6,"name":"Produto 6","price":"R$ 499,90","category":"Games"}
        ]'>
          Renderizar Produtos
          <morph-icon use="grid_view"></morph-icon>
        </morph-button>

        <morph-render layout="grid">
          <template>
            <morph-card>
              <morph-stack direction="column" gap="sm">
                <morph-heading size="xs">{name}</morph-heading>
                <morph-text color="textSecondary">{category}</morph-text>
                <morph-text color="primary" weight="bold">{price}</morph-text>
                <morph-button width="fill">
                  Comprar
                  <morph-icon use="shopping_cart"></morph-icon>
                </morph-button>
              </morph-stack>
            </morph-card>
          </template>
          <morph-on value="morph-button/clicked:method/render"></morph-on>
        </morph-render>
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
          Exemplo completo integrando morph-dataset e morph-render. Adicione usuários
          e veja a lista ser atualizada automaticamente. Cada item pode ser removido
          individualmente.
        </div>

        <div class="controls">
          <morph-button value='{"id":1,"name":"João Silva","age":25,"role":"Desenvolvedor"}'>
            Adicionar João
            <morph-icon use="person_add"></morph-icon>
          </morph-button>

          <morph-button value='{"id":2,"name":"Maria Santos","age":30,"role":"Designer"}'>
            Adicionar Maria
            <morph-icon use="person_add"></morph-icon>
          </morph-button>

          <morph-button value='{"id":3,"name":"Pedro Oliveira","age":28,"role":"Product Manager"}'>
            Adicionar Pedro
            <morph-icon use="person_add"></morph-icon>
          </morph-button>

          <morph-button name="clear" variant="outlined" color="error">
            Limpar Todos
            <morph-icon use="clear_all"></morph-icon>
          </morph-button>
        </div>

        <div style="background: #f5f5f5; padding: 12px; border-radius: 8px;">
          <strong>Total de usuários:</strong>
          <morph-text value="0">
            <morph-on value="users/changed:attribute/value|len"></morph-on>
          </morph-text>
        </div>

        <morph-render layout="list">
          <template>
            <morph-card>
              <morph-stack width="fill" gap="md">
                <morph-stack direction="column" gap="xs" width="fill">
                  <morph-text weight="bold">{name}</morph-text>
                  <morph-text color="textSecondary" size="sm">{role} • {age} anos</morph-text>
                </morph-stack>
                <morph-button name="delete" value="{id}" color="error" variant="outlined">
                  <morph-icon use="delete"></morph-icon>
                </morph-button>
              </morph-stack>
            </morph-card>
          </template>
          <morph-on value="users/changed:method/render"></morph-on>
        </morph-render>

        <morph-dataset name="users" upsert="id">
          <morph-on value="morph-button/clicked:method/push"></morph-on>
          <morph-on value="delete/clicked:method/deleted"></morph-on>
          <morph-on value="clear/clicked:method/resetted"></morph-on>
        </morph-dataset>
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

        <morph-button value='[
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
          <morph-icon use="contacts"></morph-icon>
        </morph-button>

        <morph-render layout="list">
          <template>
            <morph-card>
              <morph-stack direction="column" gap="sm">
                <morph-heading size="xs">{name}</morph-heading>

                <morph-stack direction="column" gap="xs">
                  <morph-text color="textSecondary" size="sm">
                    <morph-icon use="email" size="sm"></morph-icon>
                    {contact.email}
                  </morph-text>
                  <morph-text color="textSecondary" size="sm">
                    <morph-icon use="phone" size="sm"></morph-icon>
                    {contact.phone}
                  </morph-text>
                </morph-stack>

                <morph-stack direction="column" gap="xs">
                  <morph-text size="sm">
                    <morph-icon use="location_on" size="sm"></morph-icon>
                    {address.street}
                  </morph-text>
                  <morph-text color="textSecondary" size="sm">
                    {address.city} - {address.state}
                  </morph-text>
                </morph-stack>
              </morph-stack>
            </morph-card>
          </template>
          <morph-on value="morph-button/clicked:method/render"></morph-on>
        </morph-render>
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

        <morph-button name="load">
          Carregar Usuários da API
          <morph-icon use="cloud_download"></morph-icon>
        </morph-button>

        <morph-text value="">
          <morph-on value="load/clicked:attribute/value|always=Carregando..."></morph-on>
          <morph-on value="api/succeeded:attribute/value|always=Dados carregados!"></morph-on>
          <morph-on value="api/errored:attribute/value|always=Erro ao carregar dados"></morph-on>
        </morph-text>

        <morph-render layout="list">
          <template>
            <morph-card>
              <morph-stack direction="column" gap="xs">
                <morph-text weight="bold">{name}</morph-text>
                <morph-text color="textSecondary" size="sm">
                  <morph-icon use="email" size="sm"></morph-icon>
                  {email}
                </morph-text>
                <morph-text color="textSecondary" size="sm">
                  <morph-icon use="business" size="sm"></morph-icon>
                  {company.name}
                </morph-text>
              </morph-stack>
            </morph-card>
          </template>
          <morph-on value="api/succeeded:method/render"></morph-on>
        </morph-render>

        <morph-fetch name="api" url="https://jsonplaceholder.typicode.com/users">
          <morph-on value="load/clicked:method/get"></morph-on>
        </morph-fetch>
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

        <morph-button value='[
          {"name":"Primeiro Item"},
          {"name":"Segundo Item"},
          {"name":"Terceiro Item"}
        ]'>
          Renderizar Itens
          <morph-icon use="add"></morph-icon>
        </morph-button>

        <morph-button name="clear" variant="outlined">
          Limpar Lista
          <morph-icon use="clear"></morph-icon>
        </morph-button>

        <morph-render layout="list">
          <template>
            <morph-card>
              <morph-text>{name}</morph-text>
            </morph-card>
          </template>
          <morph-on value="morph-button/clicked:method/render"></morph-on>
          <morph-on value="clear/clicked:method/render|always=[]"></morph-on>
        </morph-render>

        <div class="empty-state">
          <morph-icon use="inbox" size="lg"></morph-icon>
          <p>Nenhum item renderizado ainda</p>
        </div>
      </div>
    `
    return container
  },
}
