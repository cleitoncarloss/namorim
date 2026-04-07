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
- **Match Exato**: Busca valor exato (não parcial como o \`morph-like\`)
- **Único Resultado**: Retorna apenas o primeiro item encontrado
- **Filho de Dataset**: Deve ser filho direto de \`morph-dataset\` ou \`x-dataset\`
- **Eventos**: Dispara \`found\` com o resultado encontrado
- **Dataflow**: Integração via barramento de eventos com \`morph-on\`

## Sintaxe

\`\`\`html
<x-dataset name="users" upsert="id">
  <x-find key="id"></x-find>
</x-dataset>
\`\`\`

## Atributos

- **key**: Nome da propriedade a ser buscada no dataset (ex: \`id\`, \`uuid\`, \`email\`)
- **value**: Valor exato a ser buscado (geralmente definido via \`morph-on\`)

## Comportamento

O componente busca nos valores armazenados no dataset pai, retornando o primeiro item
onde o valor da propriedade especificada em \`key\` é exatamente igual ao \`value\`.

## Eventos

### found
Disparado após a busca. O \`event.detail\` contém o objeto encontrado (ou \`undefined\` se não encontrar). Evento foi renomeado de "find" para "found".

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com \`morph-on\`.

### Busca por ID

\`\`\`html
<!-- Botão com ID do usuário -->
<morph-button value="123">Buscar Usuário 123</morph-button>

<!-- Dataset com find interno -->
<x-dataset name="users" upsert="id">
  <x-find key="id">
    <morph-on value="morph-button/clicked:attribute/value"></morph-on>
  </x-find>
</x-dataset>

<!-- Exibe resultado -->
<morph-text value="">
  <morph-on value="users/found:attribute/value|prop=name"></morph-on>
</morph-text>
\`\`\`

### Busca para Edição (Padrão CRUD)

Este é o padrão mais comum, usado no exemplo dataset.html:

\`\`\`html
<!-- Lista de usuários com botão de editar -->
<morph-render>
  <template>
    <morph-stack>
      <morph-text>{name}</morph-text>
      <morph-button name="edit" value="{id}" variant="outlined">
        <morph-icon use="edit"></morph-icon>
      </morph-button>
    </morph-stack>
  </template>
  <morph-on value="users/changed:method/render"></morph-on>
</morph-render>

<!-- Dataset com found -->
<x-dataset name="users" upsert="id">
  <x-find key="id">
    <!-- Quando clicar em edit, busca o usuário pelo ID -->
    <morph-on value="edit/clicked:attribute/value"></morph-on>
  </x-find>
</x-dataset>

<!-- Modal de edição -->
<morph-modal>
  <morph-render>
    <template>
      <morph-form name="update">
        <template>
          <morph-input name="id" value="{id}" hidden></morph-input>
          <morph-input name="name" value="{name}">
            <morph-label>Nome</morph-label>
          </morph-input>
          <morph-button>Salvar</morph-button>
        </template>
      </morph-form>
    </template>
    <!-- Renderiza o formulário com os dados encontrados -->
    <morph-on value="users/found:method/render"></morph-on>
  </morph-render>
  <!-- Abre o modal quando encontra -->
  <morph-on value="users/found:method/show"></morph-on>
</morph-modal>
\`\`\`

## Exemplos de Fluxos Completos

### Busca e Exibição de Detalhes

\`\`\`html
<!-- Botões com IDs -->
<morph-button value="1">Ver João</morph-button>
<morph-button value="2">Ver Maria</morph-button>

<!-- Adiciona dados -->
<morph-button value='{"id":"1","name":"João","age":25}'>
  Adicionar João
</morph-button>
<morph-button value='{"id":"2","name":"Maria","age":30}'>
  Adicionar Maria
</morph-button>

<x-dataset name="users" upsert="id">
  <x-find key="id">
    <morph-on value="morph-button/clicked:attribute/value"></morph-on>
  </x-find>
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</x-dataset>

<!-- Exibe detalhes -->
<morph-stack direction="column">
  <morph-text value="">
    <morph-on value="users/found:attribute/value|prop=name"></morph-on>
  </morph-text>
  <morph-text value="">
    <morph-on value="users/found:attribute/value|prop=age"></morph-on>
  </morph-text>
</morph-stack>
\`\`\`

### Busca para Remoção Confirmada

\`\`\`html
<!-- Lista com botões de deletar -->
<morph-render>
  <template>
    <morph-stack>
      <morph-text>{name}</morph-text>
      <morph-button name="delete-request" value="{id}" color="error">
        <morph-icon use="delete"></morph-icon>
      </morph-button>
    </morph-stack>
  </template>
  <morph-on value="users/changed:method/render"></morph-on>
</morph-render>

<x-dataset name="users" upsert="id">
  <x-find key="id">
    <morph-on value="delete-request/clicked:attribute/value"></morph-on>
  </x-find>
  <morph-on value="delete-confirm/clicked:method/deleted"></morph-on>
</x-dataset>

<!-- Modal de confirmação -->
<morph-modal>
  <morph-card>
    <morph-stack direction="column">
      <morph-text value="">
        <morph-on value="users/found:attribute/value|prop=name"></morph-on>
      </morph-text>
      <morph-text>Confirma a exclusão?</morph-text>
      <morph-stack>
        <morph-button name="delete-confirm" color="error">
          <morph-on value="users/found:attribute/value|prop=id"></morph-on>
          Confirmar
        </morph-button>
        <morph-button variant="outlined">Cancelar</morph-button>
      </morph-stack>
    </morph-stack>
  </morph-card>
  <morph-on value="users/found:method/show"></morph-on>
  <morph-on value="delete-confirm/clicked:method/hidden"></morph-on>
</morph-modal>
\`\`\`

## Diferença entre Found e Like

- **x-find**: Busca um único resultado com match exato
- **morph-like**: Filtra múltiplos resultados com busca parcial (contains)

\`\`\`html
<!-- Found: retorna objeto com match exato -->
<x-find key="id" value="123"></x-find>
<!-- Resultado: {id:123, name:"João"} -->

<!-- Like: retorna array com todos que contêm "Jo" -->
<morph-like key="name" value="Jo"></morph-like>
<!-- Resultado: [{name:"João"}, {name:"Jorge"}] -->
\`\`\`

## Uso Combinado com morph-render

O resultado de \`find\` pode ser usado para renderizar um formulário ou card de detalhes:

\`\`\`html
<x-dataset name="products" upsert="id">
  <x-find key="id">
    <morph-on value="view/clicked:attribute/value"></morph-on>
  </x-find>
</x-dataset>

<!-- Renderiza card de detalhes -->
<morph-render>
  <template>
    <morph-card>
      <morph-heading>{name}</morph-heading>
      <morph-text>Preço: R$ {price}</morph-text>
      <morph-text>Estoque: {stock}</morph-text>
    </morph-card>
  </template>
  <morph-on value="products/found:method/render"></morph-on>
</morph-render>
\`\`\`

## Integração com Formulários

O padrão mais comum é usar \`find\` para preencher formulários de edição:

\`\`\`html
<x-dataset name="users" upsert="id">
  <x-find key="id">
    <morph-on value="edit/clicked:attribute/value"></morph-on>
  </x-find>
  <morph-on value="update/submitted:method/pushed"></morph-on>
</x-dataset>

<morph-render>
  <template>
    <morph-form name="update">
      <template>
        <!-- Campos preenchidos com valores do item encontrado -->
        <morph-input name="id" value="{id}" hidden></morph-input>
        <morph-input name="name" value="{name}"></morph-input>
        <morph-input name="email" value="{email}"></morph-input>
        <morph-button>Salvar</morph-button>
      </template>
    </morph-form>
  </template>
  <!-- Renderiza formulário quando encontrar -->
  <morph-on value="users/found:method/render"></morph-on>
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
      description: 'Valor exato a ser buscado (geralmente via morph-on)',
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

        <morph-button value='{"id":"1","name":"João Silva","age":25}'>
          Adicionar João (ID: 1)
        </morph-button>
        <morph-button value='{"id":"2","name":"Maria Santos","age":30}'>
          Adicionar Maria (ID: 2)
        </morph-button>
        <morph-button value='{"id":"3","name":"José Oliveira","age":28}'>
          Adicionar José (ID: 3)
        </morph-button>

        <hr style="margin: 16px 0; border: none; border-top: 1px solid #ddd;">

        <morph-button name="found" value="1">🔍 Buscar João (ID: 1)</morph-button>
        <morph-button name="found" value="2">🔍 Buscar Maria (ID: 2)</morph-button>
        <morph-button name="found" value="3">🔍 Buscar José (ID: 3)</morph-button>

        <div class="result-box">
          <strong>Resultado:</strong><br>
          <morph-text value="-">
            <morph-on value="users/found:attribute/value|prop=name"></morph-on>
          </morph-text>
          -
          <morph-text value="-">
            <morph-on value="users/found:attribute/value|prop=age"></morph-on>
          </morph-text>
          anos
        </div>

        <x-dataset name="users" upsert="id">
          <x-find key="id">
            <morph-on value="found/clicked:attribute/value"></morph-on>
          </x-find>
          <morph-on value="morph-button/clicked:method/pushed"></morph-on>
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

        <morph-button name="add">
          <morph-icon use="add"></morph-icon>
          Adicionar Novo Usuário
        </morph-button>

        <!-- Modal de adição -->
        <morph-modal>
          <morph-card width="xxs">
            <morph-stack direction="column" width="fill">
              <morph-heading size="xs">Novo Usuário</morph-heading>
              <morph-form name="create" width="fill">
                <template>
                  <morph-stack direction="column">
                    <morph-input name="name" width="fill" required>
                      <morph-label>Nome</morph-label>
                      <morph-validity state="valueMissing">Nome é obrigatório</morph-validity>
                    </morph-input>
                    <morph-input name="email" type="email" width="fill" required>
                      <morph-label>Email</morph-label>
                      <morph-validity state="valueMissing">Email é obrigatório</morph-validity>
                    </morph-input>
                    <morph-button width="fill">Salvar</morph-button>
                  </morph-stack>
                </template>
                <morph-on value="create/submitted:method/resetted"></morph-on>
              </morph-form>
            </morph-stack>
          </morph-card>
          <morph-on value="add/clicked:method/show"></morph-on>
          <morph-on value="create/submitted:method/hidden"></morph-on>
        </morph-modal>

        <!-- Lista de usuários -->
        <morph-render>
          <template>
            <morph-stack width="fill">
              <morph-stack width="fill" direction="column">
                <morph-text style="font-weight: 600;">{name}</morph-text>
                <morph-text style="font-size: 14px; color: #666;">{email}</morph-text>
              </morph-stack>
              <morph-button name="edit" value="{id}" variant="outlined">
                <morph-icon use="edit"></morph-icon>
              </morph-button>
            </morph-stack>
          </template>
          <morph-on value="users/changed:method/render"></morph-on>
        </morph-render>

        <!-- Modal de edição -->
        <morph-modal>
          <morph-card width="xxs">
            <morph-stack direction="column" width="fill">
              <morph-heading size="xs">Editar Usuário</morph-heading>
              <morph-render>
                <template>
                  <morph-form name="update">
                    <template>
                      <morph-stack direction="column">
                        <morph-input name="id" value="{id}" hidden></morph-input>
                        <morph-input name="name" value="{name}" required>
                          <morph-label>Nome</morph-label>
                          <morph-validity state="valueMissing">Nome é obrigatório</morph-validity>
                        </morph-input>
                        <morph-input name="email" value="{email}" type="email" required>
                          <morph-label>Email</morph-label>
                          <morph-validity state="valueMissing">Email é obrigatório</morph-validity>
                        </morph-input>
                        <morph-button width="fill">Salvar Alterações</morph-button>
                      </morph-stack>
                    </template>
                    <morph-on value="update/submitted:method/resetted"></morph-on>
                  </morph-form>
                </template>
                <morph-on value="users/found:method/render"></morph-on>
              </morph-render>
            </morph-stack>
          </morph-card>
          <morph-on value="users/found:method/show"></morph-on>
          <morph-on value="update/submitted:method/hidden"></morph-on>
        </morph-modal>

        <!-- Dataset com found -->
        <x-dataset name="users" upsert="id">
          <x-find key="id">
            <morph-on value="edit/clicked:attribute/value"></morph-on>
          </x-find>
          <morph-on value="create/submitted:method/pushed"></morph-on>
          <morph-on value="update/submitted:method/pushed"></morph-on>
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

        <morph-button value='{"id":"1","name":"Notebook","price":3500,"stock":10}'>
          Adicionar Notebook
        </morph-button>
        <morph-button value='{"id":"2","name":"Mouse","price":150,"stock":50}'>
          Adicionar Mouse
        </morph-button>
        <morph-button value='{"id":"3","name":"Teclado","price":450,"stock":30}'>
          Adicionar Teclado
        </morph-button>

        <div class="product-grid">
          <morph-render>
            <template>
              <morph-card>
                <morph-stack direction="column">
                  <morph-text style="font-weight: 600;">{name}</morph-text>
                  <morph-button name="view" value="{id}" variant="outlined" width="fill">
                    Ver Detalhes
                  </morph-button>
                </morph-stack>
              </morph-card>
            </template>
            <morph-on value="products/changed:method/render"></morph-on>
          </morph-render>
        </div>

        <!-- Modal de detalhes -->
        <morph-modal>
          <morph-card width="xs">
            <morph-render>
              <template>
                <morph-stack direction="column" width="fill">
                  <morph-heading size="sm">{name}</morph-heading>
                  <morph-stack direction="column">
                    <morph-text>Preço: R$ {price}</morph-text>
                    <morph-text>Estoque: {stock} unidades</morph-text>
                  </morph-stack>
                  <morph-button name="close" width="fill">Fechar</morph-button>
                </morph-stack>
              </template>
              <morph-on value="products/found:method/render"></morph-on>
            </morph-render>
          </morph-card>
          <morph-on value="products/found:method/show"></morph-on>
          <morph-on value="close/clicked:method/hidden"></morph-on>
        </morph-modal>

        <x-dataset name="products" upsert="id">
          <x-find key="id">
            <morph-on value="view/clicked:attribute/value"></morph-on>
          </x-find>
          <morph-on value="morph-button/clicked:method/pushed"></morph-on>
        </x-dataset>
      </div>
    `
    return container
  },
}
