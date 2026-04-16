import './dataset'

export default {
  title: 'Data/Dataset',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
O componente \`nm-dataset\` é uma diretiva headless que gerencia uma coleção de dados em memória com operações de CRUD.

## Características

- **Headless**: Não possui renderização visual
- **Storage em Map**: Armazena dados em memória usando Map nativo
- **Upsert**: Atualiza ou insere dados baseado em uma chave única
- **Eventos**: Dispara \`changed\` após modificações
- **Dataflow**: Integração via barramento de eventos com \`nm-on\`

## Sintaxe

\`\`\`html
<nm-dataset upsert="id"></nm-dataset>
\`\`\`

## Atributos

- **upsert**: Nome da propriedade a ser usada como chave única (ex: \`id\`, \`uuid\`, \`key\`)

## Propriedades

### value
Retorna um array com todos os valores armazenados no dataset.

## Métodos (Chamados via Dataflow)

### push(data)
Adiciona ou atualiza dados no dataset. Se o dado contém a propriedade definida em \`upsert\`, atualiza o registro existente. Caso contrário, cria um novo com UUID gerado.

### delete(key)
Remove um registro do dataset usando a chave especificada.

### resetted()
Limpa todos os dados do dataset.

## Eventos

### changed
Disparado após qualquer modificação (push, delete, resetted). O \`event.detail\` contém o array completo de valores atuais. Evento foi renomeado de "change" para "changed".

## Integração via Dataflow

O componente é projetado para ser usado através do barramento de eventos com \`nm-on\`.

**IMPORTANTE**: O \`nm-on\` deve ser **filho** do componente que ele manipula, pois ele opera no elemento pai.

### Adicionando Dados

\`\`\`html
<!-- Botão com dados no value -->
<nm-button value='{"name":"João","age":25}'>Adicionar João</nm-button>

<!-- Dataset com nm-on interno -->
<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</nm-dataset>
\`\`\`

### Removendo Dados

\`\`\`html
<!-- Botão com ID a ser removido -->
<nm-button value="123">Remover</nm-button>

<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/deleted"></nm-on>
</nm-dataset>
\`\`\`

### Resetted Dataset

\`\`\`html
<nm-button>Limpar Tudo</nm-button>

<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/resetted"></nm-on>
</nm-dataset>
\`\`\`

### Reagindo às Mudanças

\`\`\`html
<nm-dataset upsert="id"></nm-dataset>

<!-- nm-on é filho do nm-text (manipula o pai) -->
<nm-text value="">
  <nm-on value="nm-dataset/changed:attribute/value|len"></nm-on>
</nm-text>
\`\`\`

## Exemplos de Fluxos Completos

### Fluxo de Adição

\`\`\`html
<!-- Botões que adicionam dados -->
<nm-button value='{"id":1,"name":"João"}'>Adicionar João</nm-button>
<nm-button value='{"id":2,"name":"Maria"}'>Adicionar Maria</nm-button>

<!-- Dataset -->
<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</nm-dataset>

<!-- Contador de itens -->
<nm-text value="0">
  <nm-on value="nm-dataset/changed:attribute/value|len"></nm-on>
</nm-text>
\`\`\`

### Fluxo de Atualização (Upsert)

\`\`\`html
<!-- Primeiro clique adiciona, segundo clique atualiza -->
<nm-button value='{"id":1,"name":"João","age":25}'>João 25 anos</nm-button>
<nm-button value='{"id":1,"name":"João","age":26}'>João 26 anos</nm-button>

<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</nm-dataset>
\`\`\`

### Fluxo de Remoção

\`\`\`html
<!-- Adiciona -->
<nm-button value='{"id":1,"name":"João"}'>Adicionar</nm-button>

<!-- Remove pela chave -->
<nm-button value="1">Remover</nm-button>

<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
  <nm-on value="nm-button/clicked:method/deleted"></nm-on>
</nm-dataset>
\`\`\`

### Fluxo com Geração Automática de UUID

\`\`\`html
<!-- Dados sem ID serão gerados automaticamente -->
<nm-button value='{"name":"João"}'>Adicionar João</nm-button>
<nm-button value='{"name":"Maria"}'>Adicionar Maria</nm-button>

<!-- UUID será criado e atribuído à propriedade 'key' -->
<nm-dataset upsert="key">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</nm-dataset>
\`\`\`

### Fluxo com Múltiplos Dados

\`\`\`html
<!-- Push aceita array de dados -->
<nm-button value='[{"id":1,"name":"João"},{"id":2,"name":"Maria"}]'>
  Adicionar Múltiplos
</nm-button>

<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
</nm-dataset>
\`\`\`

### Fluxo Completo com Contador e Resetted

\`\`\`html
<!-- Controles -->
<nm-button value='{"id":1,"name":"João"}'>Adicionar João</nm-button>
<nm-button value='{"id":2,"name":"Maria"}'>Adicionar Maria</nm-button>
<nm-button value="1">Remover João</nm-button>
<nm-button>Limpar Tudo</nm-button>

<!-- Dataset -->
<nm-dataset upsert="id">
  <nm-on value="nm-button/clicked:method/pushed"></nm-on>
  <nm-on value="nm-button/clicked:method/deleted"></nm-on>
  <nm-on value="nm-button/clicked:method/resetted"></nm-on>
</nm-dataset>

<!-- Contador -->
<nm-text value="0 itens">
  <nm-on value="nm-dataset/changed:attribute/value|len"></nm-on>
</nm-text>
\`\`\`

## Uso com Fetch

Combine \`nm-dataset\` com \`nm-fetch\` para armazenar dados de API:

\`\`\`html
<!-- Botão que busca dados -->
<nm-button>Carregar Usuários</nm-button>

<!-- Fetch -->
<nm-fetch url="https://api.example.com/users">
  <nm-on value="nm-button/click:method/get"></nm-on>
</nm-fetch>

<!-- Dataset armazena os dados retornados -->
<nm-dataset upsert="id">
  <nm-on value="nm-fetch/success:method/push"></nm-on>
</nm-dataset>

<!-- Contador de usuários carregados -->
<nm-text value="0">
  <nm-on value="nm-dataset/changed:attribute/value|len"></nm-on>
</nm-text>
\`\`\`

## Transformando Dados com Filtros

Use filtros do \`nm-on\` para transformar os dados antes de armazenar:

\`\`\`html
<nm-fetch url="https://api.example.com/users"></nm-fetch>

<nm-dataset upsert="id">
  <!-- Extrai apenas a propriedade 'data' do response -->
  <nm-on value="nm-fetch/success:method/push|prop=data"></nm-on>
</nm-dataset>

<nm-text value="">
  <!-- Conta quantos itens foram armazenados -->
  <nm-on value="nm-dataset/changed:attribute/value|len"></nm-on>
</nm-text>
\`\`\`

## Comportamento de Upsert

O comportamento de upsert garante que:
- Se um dado com a mesma chave já existe, ele será **atualizado** (merge de propriedades)
- Se não existe, será **inserido** como novo registro
- Se o dado não possui a propriedade upsert, um UUID será gerado automaticamente

\`\`\`html
<nm-dataset upsert="id"></nm-dataset>

<!-- Primeira chamada: adiciona {id:1, name:"João"} -->
<nm-button value='{"id":1,"name":"João"}'>Adicionar</nm-button>

<!-- Segunda chamada: atualiza para {id:1, name:"João", age:25} -->
<nm-button value='{"id":1,"age":25}'>Atualizar</nm-button>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    upsert: {
      control: 'text',
      description: 'Nome da propriedade usada como chave única para upsert',
    },
  },
}

export const SimpleCRUD = {
  name: 'CRUD Simples',
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
        .counter {
          font-size: 24px;
          font-weight: bold;
          color: #1976d2;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Gerenciamento de Dados em Memória</div>
        <div class="story-description">
          Exemplo básico de CRUD com nm-dataset. Adicione, atualize e remova itens.
          O contador é atualizado automaticamente via evento changed.
        </div>

        <nm-button value='{"id":1,"name":"João","age":25}'>
          Adicionar João
          <nm-icon use="person_add"></nm-icon>
        </nm-button>

        <nm-button value='{"id":2,"name":"Maria","age":30}'>
          Adicionar Maria
          <nm-icon use="person_add"></nm-icon>
        </nm-button>

        <nm-button value='{"id":1,"name":"João Silva","age":26}'>
          Atualizar João (Upsert)
          <nm-icon use="edit"></nm-icon>
        </nm-button>

        <nm-button value="1">
          Remover João
          <nm-icon use="delete"></nm-icon>
        </nm-button>

        <nm-button name="clear">
          Limpar Todos
          <nm-icon use="clear_all"></nm-icon>
        </nm-button>

        <div class="counter">
          Total de itens:
          <nm-text value="0">
            <nm-on value="users/changed:attribute/value|len"></nm-on>
          </nm-text>
        </div>

        <nm-dataset name="users" upsert="id">
          <nm-on value="nm-button/clicked:method/pushed"></nm-on>
          <nm-on value="nm-button/clicked:method/deleted"></nm-on>
          <nm-on value="clear/clicked:method/resetted"></nm-on>
        </nm-dataset>
      </div>
    `
    return container
  },
}

export const CompleteUserManager = {
  name: 'Gerenciador Completo de Usuários',
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
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #f5f5f5;
          border-radius: 8px;
        }
      </style>

      <div class="story-container">
        <div class="story-title">Sistema CRUD Completo</div>
        <div class="story-description">
          Exemplo completo de CRUD inspirado no dataset.html: adicionar, listar,
          editar e remover usuários com modal de formulário e renderização dinâmica.
        </div>

        <div class="header">
          <h3 style="margin: 0;">Usuários</h3>
          <nm-button name="add">
            <nm-icon use="add"></nm-icon>
            Adicionar novo usuário
          </nm-button>
        </div>

        <nm-modal>
          <nm-card width="xxs">
            <nm-stack direction="column" width="fill">
              <nm-heading size="xs">Adicionar novo usuário</nm-heading>
              <nm-form name="user" width="fill">
                <template>
                  <nm-stack direction="column">
                    <nm-input name="name" width="fill" required>
                      <nm-label>Nome</nm-label>
                      <nm-validity state="valueMissing">Nome é obrigatório</nm-validity>
                    </nm-input>
                    <nm-input name="age" type="number" width="fill" required>
                      <nm-label>Idade</nm-label>
                      <nm-validity state="valueMissing">Idade é obrigatória</nm-validity>
                    </nm-input>
                    <nm-button width="fill">
                      Salvar
                      <nm-icon use="save" size="sm"></nm-icon>
                    </nm-button>
                  </nm-stack>
                </template>
                <nm-on value="user/submitted:method/resetted"></nm-on>
              </nm-form>
            </nm-stack>
          </nm-card>
          <nm-on value="add/click:method/show"></nm-on>
          <nm-on value="user/submitted:method/hidden"></nm-on>
        </nm-modal>

        <nm-render>
          <template>
            <nm-stack width="fill">
              <nm-stack width="fill">
                <nm-text>{name} - {age} anos</nm-text>
              </nm-stack>
              <nm-button name="edit" value="{id}" variant="outlined">
                <nm-icon use="edit"></nm-icon>
              </nm-button>
              <nm-button name="delete" value="{id}" color="error" variant="outlined">
                <nm-icon use="delete"></nm-icon>
              </nm-button>
            </nm-stack>
          </template>
          <nm-on value="users/changed:method/render"></nm-on>
        </nm-render>

        <nm-modal>
          <nm-card width="xxs">
            <nm-stack direction="column" width="fill">
              <nm-heading size="xs">Editar usuário</nm-heading>
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
                        <nm-input name="age" value="{age}" type="number" required>
                          <nm-label>Idade</nm-label>
                          <nm-validity state="valueMissing">Idade é obrigatória</nm-validity>
                        </nm-input>
                        <nm-button width="fill">Salvar Alterações</nm-button>
                      </nm-stack>
                    </template>
                    <nm-on value="update/submitted:method/resetted"></nm-on>
                    <nm-on value="update/submitted:attribute/hidden"></nm-on>
                  </nm-form>
                </template>
                <nm-on value="users/find:method/render"></nm-on>
              </nm-render>
            </nm-stack>
          </nm-card>
          <nm-on value="users/find:method/show"></nm-on>
          <nm-on value="update/submitted:method/hidden"></nm-on>
        </nm-modal>

        <nm-dataset name="users" upsert="id">
          <nm-find key="id">
            <nm-on value="edit/click:attribute/value"></nm-on>
          </nm-find>
          <nm-on value="user/submitted:method/pushed"></nm-on>
          <nm-on value="update/submitted:method/pushed"></nm-on>
          <nm-on value="delete/click:method/delete"></nm-on>
        </nm-dataset>

        <div style="margin-top: 16px; padding: 12px; background: #e3f2fd; border-radius: 8px;">
          <strong>Total de usuários:</strong>
          <nm-text value="0">
            <nm-on value="users/changed:attribute/value|len"></nm-on>
          </nm-text>
        </div>
      </div>
    `
    return container
  },
}

export const WithAutoUUID = {
  name: 'Geração Automática de UUID',
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
        <div class="story-title">UUID Automático</div>
        <div class="story-description">
          Quando dados não possuem a propriedade de upsert, um UUID é gerado automaticamente.
        </div>

        <nm-button value='{"name":"Produto Sem ID"}'>
          Adicionar Produto (UUID será gerado)
          <nm-icon use="add_shopping_cart"></nm-icon>
        </nm-button>

        <nm-button value='{"name":"Outro Produto"}'>
          Adicionar Outro Produto
          <nm-icon use="add_shopping_cart"></nm-icon>
        </nm-button>

        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <strong>Produtos cadastrados:</strong>
          <nm-text value="0">
            <nm-on value="products/changed:attribute/value|len"></nm-on>
          </nm-text>
        </div>

        <nm-dataset name="products" upsert="key">
          <nm-on value="nm-button/clicked:method/pushed"></nm-on>
        </nm-dataset>
      </div>
    `
    return container
  },
}
