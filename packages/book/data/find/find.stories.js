import './find'

export default {
  title: 'Data/Find',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
O componente \`x-find\` é uma diretiva headless que busca um único item em um dataset baseado em uma chave e valor exato.

## Características

- **Headless**: Não possui renderização visual
- **Match Exato**: Busca valor exato (não parcial como o \`nm-like\`)
- **Único Resultado**: Retorna apenas o primeiro item encontrado
- **Filho de Dataset**: Deve ser filho direto de \`nm-dataset\` ou \`x-dataset\`
- **Eventos**: Dispara \`found\` com o resultado encontrado
- **Dataflow**: Integração via barramento de eventos com \`nm-on\`

## Sintaxe

\`\`\`html
<x-dataset name="users" upsert="id">
  <x-find key="id"></x-find>
</x-dataset>
\`\`\`

## Atributos

- **key**: Nome da propriedade a ser buscada no dataset (ex: \`id\`, \`uuid\`, \`email\`)
- **value**: Valor exato a ser buscado (geralmente definido via \`nm-on\`)

## Comportamento

O componente busca nos valores armazenados no dataset pai, retornando o primeiro item
onde o valor da propriedade especificada em \`key\` é exatamente igual ao \`value\`.

## Eventos

### found
Disparado após a busca. O \`event.detail\` contém o objeto encontrado (ou \`undefined\` se não encontrar). Evento foi renomeado de "find" para "found".

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com \`nm-on\`.

### Busca por ID

\`\`\`html
<!-- Botão com ID do usuário -->
<nm-button value="123">Buscar Usuário 123</nm-button>

<!-- Dataset com find interno -->
<x-dataset name="users" upsert="id">
  <x-find key="id">
    <nm-on value="nm-button/clicked:attribute/value"></nm-on>
  </x-find>
</x-dataset>

<!-- Exibe resultado -->
<nm-text value="">
  <nm-on value="users/found:attribute/value|prop=name"></nm-on>
</nm-text>
\`\`\`

### Busca para Edição (Padrão CRUD)

Este é o padrão mais comum, usado no exemplo dataset.html:

\`\`\`html
<!-- Lista de usuários com botão de editar -->
<nm-render>
  <template>
    <nm-stack>
      <nm-text>{name}</nm-text>
      <nm-button name="edit" value="{id}" variant="outlined">
        <nm-icon use="edit"></nm-icon>
      </nm-button>
    </nm-stack>
  </template>
  <nm-on value="users/changed:method/render"></nm-on>
</nm-render>

<!-- Dataset com found -->
<x-dataset name="users" upsert="id">
  <x-find key="id">
    <!-- Quando clicar em edit, busca o usuário pelo ID -->
    <nm-on value="edit/clicked:attribute/value"></nm-on>
  </x-find>
</x-dataset>

<!-- Modal de edição -->
<nm-modal>
  <nm-render>
    <template>
      <nm-form name="update">
        <template>
          <nm-input name="id" value="{id}" hidden></nm-input>
          <nm-input name="name" value="{name}">
            <nm-label>Nome</nm-label>
          </nm-input>
          <nm-button>Salvar</nm-button>
        </template>
      </nm-form>
    </template>
    <!-- Renderiza o formulário com os dados encontrados -->
    <nm-on value="users/found:method/render"></nm-on>
  </nm-render>
  <!-- Abre o modal quando encontra -->
  <nm-on value="users/found:method/show"></nm-on>
</nm-modal>
\`\`\`

## Exemplos de Fluxos Completos

### Busca e Exibição de Detalhes

\`\`\`html
<!-- Botões com IDs -->
<nm-button value="1">Ver João</nm-button>
<nm-button value="2">Ver Maria</nm-button>

<!-- Adiciona dados -->
<nm-button value='{"id":"1","name":"João","age":25}'>
  Adicionar João
</nm-button>
<nm-button value='{"id":"2","name":"Maria","age":30}'>
  Adicionar Maria
</nm-button>

<x-dataset name="users" upsert="id">
  <x-find key="id">
    <nm-on value="nm-button/clicked:attribute/value"></nm-on>
  </x-find>
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</x-dataset>

<!-- Exibe detalhes -->
<nm-stack direction="column">
  <nm-text value="">
    <nm-on value="users/found:attribute/value|prop=name"></nm-on>
  </nm-text>
  <nm-text value="">
    <nm-on value="users/found:attribute/value|prop=age"></nm-on>
  </nm-text>
</nm-stack>
\`\`\`

### Busca para Remoção Confirmada

\`\`\`html
<!-- Lista com botões de deletar -->
<nm-render>
  <template>
    <nm-stack>
      <nm-text>{name}</nm-text>
      <nm-button name="delete-request" value="{id}" color="error">
        <nm-icon use="delete"></nm-icon>
      </nm-button>
    </nm-stack>
  </template>
  <nm-on value="users/changed:method/render"></nm-on>
</nm-render>

<x-dataset name="users" upsert="id">
  <x-find key="id">
    <nm-on value="delete-request/clicked:attribute/value"></nm-on>
  </x-find>
  <nm-on value="delete-confirm/clicked:method/deleted"></nm-on>
</x-dataset>

<!-- Modal de confirmação -->
<nm-modal>
  <nm-card>
    <nm-stack direction="column">
      <nm-text value="">
        <nm-on value="users/found:attribute/value|prop=name"></nm-on>
      </nm-text>
      <nm-text>Confirma a exclusão?</nm-text>
      <nm-stack>
        <nm-button name="delete-confirm" color="error">
          <nm-on value="users/found:attribute/value|prop=id"></nm-on>
          Confirmar
        </nm-button>
        <nm-button variant="outlined">Cancelar</nm-button>
      </nm-stack>
    </nm-stack>
  </nm-card>
  <nm-on value="users/found:method/show"></nm-on>
  <nm-on value="delete-confirm/clicked:method/hidden"></nm-on>
</nm-modal>
\`\`\`

## Diferença entre Found e Like

- **x-find**: Busca um único resultado com match exato
- **nm-like**: Filtra múltiplos resultados com busca parcial (contains)

\`\`\`html
<!-- Found: retorna objeto com match exato -->
<x-find key="id" value="123"></x-find>
<!-- Resultado: {id:123, name:"João"} -->

<!-- Like: retorna array com todos que contêm "Jo" -->
<nm-like key="name" value="Jo"></nm-like>
<!-- Resultado: [{name:"João"}, {name:"Jorge"}] -->
\`\`\`

## Uso Combinado com nm-render

O resultado de \`find\` pode ser usado para renderizar um formulário ou card de detalhes:

\`\`\`html
<x-dataset name="products" upsert="id">
  <x-find key="id">
    <nm-on value="view/clicked:attribute/value"></nm-on>
  </x-find>
</x-dataset>

<!-- Renderiza card de detalhes -->
<nm-render>
  <template>
    <nm-card>
      <nm-heading>{name}</nm-heading>
      <nm-text>Preço: R$ {price}</nm-text>
      <nm-text>Estoque: {stock}</nm-text>
    </nm-card>
  </template>
  <nm-on value="products/found:method/render"></nm-on>
</nm-render>
\`\`\`

## Integração com Formulários

O padrão mais comum é usar \`find\` para preencher formulários de edição:

\`\`\`html
<x-dataset name="users" upsert="id">
  <x-find key="id">
    <nm-on value="edit/clicked:attribute/value"></nm-on>
  </x-find>
  <nm-on value="update/submitted:method/pushed"></nm-on>
</x-dataset>

<nm-render>
  <template>
    <nm-form name="update">
      <template>
        <!-- Campos preenchidos com valores do item encontrado -->
        <nm-input name="id" value="{id}" hidden></nm-input>
        <nm-input name="name" value="{name}"></nm-input>
        <nm-input name="email" value="{email}"></nm-input>
        <nm-button>Salvar</nm-button>
      </template>
    </nm-form>
  </template>
  <!-- Renderiza formulário quando encontrar -->
  <nm-on value="users/found:method/render"></nm-on>
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
      description: 'Valor exato a ser buscado (geralmente via nm-on)',
    },
  },
}

export const BasicFind = {
  name: 'Busca Básica por ID',
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
        .result-box {
          background: #f5f5f5;
          padding: 16px;
          border-radius: 8px;
          min-height: 60px;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Busca de Usuário por ID</div>
        <div class="story-description">
          Primeiro adicione usuários, depois clique para buscá-los por ID.
        </div>

        <nm-button value='{"id":"1","name":"João Silva","age":25}'>
          Adicionar João (ID: 1)
        </nm-button>
        <nm-button value='{"id":"2","name":"Maria Santos","age":30}'>
          Adicionar Maria (ID: 2)
        </nm-button>
        <nm-button value='{"id":"3","name":"José Oliveira","age":28}'>
          Adicionar José (ID: 3)
        </nm-button>

        <hr style="margin: 16px 0; border: none; border-top: 1px solid #ddd;">

        <nm-button name="found" value="1">🔍 Buscar João (ID: 1)</nm-button>
        <nm-button name="found" value="2">🔍 Buscar Maria (ID: 2)</nm-button>
        <nm-button name="found" value="3">🔍 Buscar José (ID: 3)</nm-button>

        <div class="result-box">
          <strong>Resultado:</strong><br>
          <nm-text value="-">
            <nm-on value="users/found:attribute/value|prop=name"></nm-on>
          </nm-text>
          -
          <nm-text value="-">
            <nm-on value="users/found:attribute/value|prop=age"></nm-on>
          </nm-text>
          anos
        </div>

        <x-dataset name="users" upsert="id">
          <x-find key="id">
            <nm-on value="found/clicked:attribute/value"></nm-on>
          </x-find>
          <nm-on value="nm-button/clicked:method/pushed"></nm-on>
        </x-dataset>
      </div>
    `
    return container
  },
}

export const EditWithFind = {
  name: 'Edição com Found (Padrão CRUD)',
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
        <div class="story-title">Sistema de Edição</div>
        <div class="story-description">
          Demonstra o padrão CRUD completo: adicione usuários, clique em editar para
          buscar e preencher o formulário, e salve as alterações.
        </div>

        <nm-button name="add">
          <nm-icon use="add"></nm-icon>
          Adicionar Novo Usuário
        </nm-button>

        <!-- Modal de adição -->
        <nm-modal>
          <nm-card width="xxs">
            <nm-stack direction="column" width="fill">
              <nm-heading size="xs">Novo Usuário</nm-heading>
              <nm-form name="create" width="fill">
                <template>
                  <nm-stack direction="column">
                    <nm-input name="name" width="fill" required>
                      <nm-label>Nome</nm-label>
                      <nm-validity state="valueMissing">Nome é obrigatório</nm-validity>
                    </nm-input>
                    <nm-input name="email" type="email" width="fill" required>
                      <nm-label>Email</nm-label>
                      <nm-validity state="valueMissing">Email é obrigatório</nm-validity>
                    </nm-input>
                    <nm-button width="fill">Salvar</nm-button>
                  </nm-stack>
                </template>
                <nm-on value="create/submitted:method/resetted"></nm-on>
              </nm-form>
            </nm-stack>
          </nm-card>
          <nm-on value="add/clicked:method/show"></nm-on>
          <nm-on value="create/submitted:method/hidden"></nm-on>
        </nm-modal>

        <!-- Lista de usuários -->
        <nm-render>
          <template>
            <nm-stack width="fill">
              <nm-stack width="fill" direction="column">
                <nm-text style="font-weight: 600;">{name}</nm-text>
                <nm-text style="font-size: 14px; color: #666;">{email}</nm-text>
              </nm-stack>
              <nm-button name="edit" value="{id}" variant="outlined">
                <nm-icon use="edit"></nm-icon>
              </nm-button>
            </nm-stack>
          </template>
          <nm-on value="users/changed:method/render"></nm-on>
        </nm-render>

        <!-- Modal de edição -->
        <nm-modal>
          <nm-card width="xxs">
            <nm-stack direction="column" width="fill">
              <nm-heading size="xs">Editar Usuário</nm-heading>
              <nm-render>
                <template>
                  <nm-form name="update">
                    <template>
                      <nm-stack direction="column">
                        <nm-input name="id" value="{id}" hidden></nm-input>
                        <nm-input name="name" value="{name}" required>
                          <nm-label>Nome</nm-label>
                          <nm-validity state="valueMissing">Nome é obrigatório</nm-validity>
                        </nm-input>
                        <nm-input name="email" value="{email}" type="email" required>
                          <nm-label>Email</nm-label>
                          <nm-validity state="valueMissing">Email é obrigatório</nm-validity>
                        </nm-input>
                        <nm-button width="fill">Salvar Alterações</nm-button>
                      </nm-stack>
                    </template>
                    <nm-on value="update/submitted:method/resetted"></nm-on>
                  </nm-form>
                </template>
                <nm-on value="users/found:method/render"></nm-on>
              </nm-render>
            </nm-stack>
          </nm-card>
          <nm-on value="users/found:method/show"></nm-on>
          <nm-on value="update/submitted:method/hidden"></nm-on>
        </nm-modal>

        <!-- Dataset com found -->
        <x-dataset name="users" upsert="id">
          <x-find key="id">
            <nm-on value="edit/clicked:attribute/value"></nm-on>
          </x-find>
          <nm-on value="create/submitted:method/pushed"></nm-on>
          <nm-on value="update/submitted:method/pushed"></nm-on>
        </x-dataset>
      </div>
    `
    return container
  },
}

export const ProductDetails = {
  name: 'Exibição de Detalhes',
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
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Catálogo de Produtos</div>
        <div class="story-description">
          Adicione produtos e clique para ver os detalhes completos.
        </div>

        <nm-button value='{"id":"1","name":"Notebook","price":3500,"stock":10}'>
          Adicionar Notebook
        </nm-button>
        <nm-button value='{"id":"2","name":"Mouse","price":150,"stock":50}'>
          Adicionar Mouse
        </nm-button>
        <nm-button value='{"id":"3","name":"Teclado","price":450,"stock":30}'>
          Adicionar Teclado
        </nm-button>

        <div class="product-grid">
          <nm-render>
            <template>
              <nm-card>
                <nm-stack direction="column">
                  <nm-text style="font-weight: 600;">{name}</nm-text>
                  <nm-button name="view" value="{id}" variant="outlined" width="fill">
                    Ver Detalhes
                  </nm-button>
                </nm-stack>
              </nm-card>
            </template>
            <nm-on value="products/changed:method/render"></nm-on>
          </nm-render>
        </div>

        <!-- Modal de detalhes -->
        <nm-modal>
          <nm-card width="xs">
            <nm-render>
              <template>
                <nm-stack direction="column" width="fill">
                  <nm-heading size="sm">{name}</nm-heading>
                  <nm-stack direction="column">
                    <nm-text>Preço: R$ {price}</nm-text>
                    <nm-text>Estoque: {stock} unidades</nm-text>
                  </nm-stack>
                  <nm-button name="close" width="fill">Fechar</nm-button>
                </nm-stack>
              </template>
              <nm-on value="products/found:method/render"></nm-on>
            </nm-render>
          </nm-card>
          <nm-on value="products/found:method/show"></nm-on>
          <nm-on value="close/clicked:method/hidden"></nm-on>
        </nm-modal>

        <x-dataset name="products" upsert="id">
          <x-find key="id">
            <nm-on value="view/clicked:attribute/value"></nm-on>
          </x-find>
          <nm-on value="nm-button/clicked:method/pushed"></nm-on>
        </x-dataset>
      </div>
    `
    return container
  },
}
