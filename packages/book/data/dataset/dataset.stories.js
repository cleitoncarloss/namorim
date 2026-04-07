import './dataset'

export default {
  title: 'Data/Dataset',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `
O componente \`morph-dataset\` é uma diretiva headless que gerencia uma coleção de dados em memória com operações de CRUD.

## Características

- **Headless**: Não possui renderização visual
- **Storage em Map**: Armazena dados em memória usando Map nativo
- **Upsert**: Atualiza ou insere dados baseado em uma chave única
- **Eventos**: Dispara \`changed\` após modificações
- **Dataflow**: Integração via barramento de eventos com \`morph-on\`

## Sintaxe

\`\`\`html
<morph-dataset upsert="id"></morph-dataset>
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

O componente é projetado para ser usado através do barramento de eventos com \`morph-on\`.

**IMPORTANTE**: O \`morph-on\` deve ser **filho** do componente que ele manipula, pois ele opera no elemento pai.

### Adicionando Dados

\`\`\`html
<!-- Botão com dados no value -->
<morph-button value='{"name":"João","age":25}'>Adicionar João</morph-button>

<!-- Dataset com morph-on interno -->
<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</morph-dataset>
\`\`\`

### Removendo Dados

\`\`\`html
<!-- Botão com ID a ser removido -->
<morph-button value="123">Remover</morph-button>

<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/deleted"></morph-on>
</morph-dataset>
\`\`\`

### Resetted Dataset

\`\`\`html
<morph-button>Limpar Tudo</morph-button>

<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/resetted"></morph-on>
</morph-dataset>
\`\`\`

### Reagindo às Mudanças

\`\`\`html
<morph-dataset upsert="id"></morph-dataset>

<!-- morph-on é filho do morph-text (manipula o pai) -->
<morph-text value="">
  <morph-on value="morph-dataset/changed:attribute/value|len"></morph-on>
</morph-text>
\`\`\`

## Exemplos de Fluxos Completos

### Fluxo de Adição

\`\`\`html
<!-- Botões que adicionam dados -->
<morph-button value='{"id":1,"name":"João"}'>Adicionar João</morph-button>
<morph-button value='{"id":2,"name":"Maria"}'>Adicionar Maria</morph-button>

<!-- Dataset -->
<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</morph-dataset>

<!-- Contador de itens -->
<morph-text value="0">
  <morph-on value="morph-dataset/changed:attribute/value|len"></morph-on>
</morph-text>
\`\`\`

### Fluxo de Atualização (Upsert)

\`\`\`html
<!-- Primeiro clique adiciona, segundo clique atualiza -->
<morph-button value='{"id":1,"name":"João","age":25}'>João 25 anos</morph-button>
<morph-button value='{"id":1,"name":"João","age":26}'>João 26 anos</morph-button>

<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</morph-dataset>
\`\`\`

### Fluxo de Remoção

\`\`\`html
<!-- Adiciona -->
<morph-button value='{"id":1,"name":"João"}'>Adicionar</morph-button>

<!-- Remove pela chave -->
<morph-button value="1">Remover</morph-button>

<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
  <morph-on value="morph-button/clicked:method/deleted"></morph-on>
</morph-dataset>
\`\`\`

### Fluxo com Geração Automática de UUID

\`\`\`html
<!-- Dados sem ID serão gerados automaticamente -->
<morph-button value='{"name":"João"}'>Adicionar João</morph-button>
<morph-button value='{"name":"Maria"}'>Adicionar Maria</morph-button>

<!-- UUID será criado e atribuído à propriedade 'key' -->
<morph-dataset upsert="key">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</morph-dataset>
\`\`\`

### Fluxo com Múltiplos Dados

\`\`\`html
<!-- Push aceita array de dados -->
<morph-button value='[{"id":1,"name":"João"},{"id":2,"name":"Maria"}]'>
  Adicionar Múltiplos
</morph-button>

<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
</morph-dataset>
\`\`\`

### Fluxo Completo com Contador e Resetted

\`\`\`html
<!-- Controles -->
<morph-button value='{"id":1,"name":"João"}'>Adicionar João</morph-button>
<morph-button value='{"id":2,"name":"Maria"}'>Adicionar Maria</morph-button>
<morph-button value="1">Remover João</morph-button>
<morph-button>Limpar Tudo</morph-button>

<!-- Dataset -->
<morph-dataset upsert="id">
  <morph-on value="morph-button/clicked:method/pushed"></morph-on>
  <morph-on value="morph-button/clicked:method/deleted"></morph-on>
  <morph-on value="morph-button/clicked:method/resetted"></morph-on>
</morph-dataset>

<!-- Contador -->
<morph-text value="0 itens">
  <morph-on value="morph-dataset/changed:attribute/value|len"></morph-on>
</morph-text>
\`\`\`

## Uso com Fetch

Combine \`morph-dataset\` com \`morph-fetch\` para armazenar dados de API:

\`\`\`html
<!-- Botão que busca dados -->
<morph-button>Carregar Usuários</morph-button>

<!-- Fetch -->
<morph-fetch url="https://api.example.com/users">
  <morph-on value="morph-button/click:method/get"></morph-on>
</morph-fetch>

<!-- Dataset armazena os dados retornados -->
<morph-dataset upsert="id">
  <morph-on value="morph-fetch/success:method/push"></morph-on>
</morph-dataset>

<!-- Contador de usuários carregados -->
<morph-text value="0">
  <morph-on value="morph-dataset/changed:attribute/value|len"></morph-on>
</morph-text>
\`\`\`

## Transformando Dados com Filtros

Use filtros do \`morph-on\` para transformar os dados antes de armazenar:

\`\`\`html
<morph-fetch url="https://api.example.com/users"></morph-fetch>

<morph-dataset upsert="id">
  <!-- Extrai apenas a propriedade 'data' do response -->
  <morph-on value="morph-fetch/success:method/push|prop=data"></morph-on>
</morph-dataset>

<morph-text value="">
  <!-- Conta quantos itens foram armazenados -->
  <morph-on value="morph-dataset/changed:attribute/value|len"></morph-on>
</morph-text>
\`\`\`

## Comportamento de Upsert

O comportamento de upsert garante que:
- Se um dado com a mesma chave já existe, ele será **atualizado** (merge de propriedades)
- Se não existe, será **inserido** como novo registro
- Se o dado não possui a propriedade upsert, um UUID será gerado automaticamente

\`\`\`html
<morph-dataset upsert="id"></morph-dataset>

<!-- Primeira chamada: adiciona {id:1, name:"João"} -->
<morph-button value='{"id":1,"name":"João"}'>Adicionar</morph-button>

<!-- Segunda chamada: atualiza para {id:1, name:"João", age:25} -->
<morph-button value='{"id":1,"age":25}'>Atualizar</morph-button>
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
          Exemplo básico de CRUD com morph-dataset. Adicione, atualize e remova itens.
          O contador é atualizado automaticamente via evento changed.
        </div>

        <morph-button value='{"id":1,"name":"João","age":25}'>
          Adicionar João
          <morph-icon use="person_add"></morph-icon>
        </morph-button>

        <morph-button value='{"id":2,"name":"Maria","age":30}'>
          Adicionar Maria
          <morph-icon use="person_add"></morph-icon>
        </morph-button>

        <morph-button value='{"id":1,"name":"João Silva","age":26}'>
          Atualizar João (Upsert)
          <morph-icon use="edit"></morph-icon>
        </morph-button>

        <morph-button value="1">
          Remover João
          <morph-icon use="delete"></morph-icon>
        </morph-button>

        <morph-button name="clear">
          Limpar Todos
          <morph-icon use="clear_all"></morph-icon>
        </morph-button>

        <div class="counter">
          Total de itens:
          <morph-text value="0">
            <morph-on value="users/changed:attribute/value|len"></morph-on>
          </morph-text>
        </div>

        <morph-dataset name="users" upsert="id">
          <morph-on value="morph-button/clicked:method/pushed"></morph-on>
          <morph-on value="morph-button/clicked:method/deleted"></morph-on>
          <morph-on value="clear/clicked:method/resetted"></morph-on>
        </morph-dataset>
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
          <morph-button name="add">
            <morph-icon use="add"></morph-icon>
            Adicionar novo usuário
          </morph-button>
        </div>

        <morph-modal>
          <morph-card width="xxs">
            <morph-stack direction="column" width="fill">
              <morph-heading size="xs">Adicionar novo usuário</morph-heading>
              <morph-form name="user" width="fill">
                <template>
                  <morph-stack direction="column">
                    <morph-input name="name" width="fill" required>
                      <morph-label>Nome</morph-label>
                      <morph-validity state="valueMissing">Nome é obrigatório</morph-validity>
                    </morph-input>
                    <morph-input name="age" type="number" width="fill" required>
                      <morph-label>Idade</morph-label>
                      <morph-validity state="valueMissing">Idade é obrigatória</morph-validity>
                    </morph-input>
                    <morph-button width="fill">
                      Salvar
                      <morph-icon use="save" size="sm"></morph-icon>
                    </morph-button>
                  </morph-stack>
                </template>
                <morph-on value="user/submitted:method/resetted"></morph-on>
              </morph-form>
            </morph-stack>
          </morph-card>
          <morph-on value="add/click:method/show"></morph-on>
          <morph-on value="user/submitted:method/hidden"></morph-on>
        </morph-modal>

        <morph-render>
          <template>
            <morph-stack width="fill">
              <morph-stack width="fill">
                <morph-text>{name} - {age} anos</morph-text>
              </morph-stack>
              <morph-button name="edit" value="{id}" variant="outlined">
                <morph-icon use="edit"></morph-icon>
              </morph-button>
              <morph-button name="delete" value="{id}" color="error" variant="outlined">
                <morph-icon use="delete"></morph-icon>
              </morph-button>
            </morph-stack>
          </template>
          <morph-on value="users/changed:method/render"></morph-on>
        </morph-render>

        <morph-modal>
          <morph-card width="xxs">
            <morph-stack direction="column" width="fill">
              <morph-heading size="xs">Editar usuário</morph-heading>
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
                        <morph-input name="age" value="{age}" type="number" required>
                          <morph-label>Idade</morph-label>
                          <morph-validity state="valueMissing">Idade é obrigatória</morph-validity>
                        </morph-input>
                        <morph-button width="fill">Salvar Alterações</morph-button>
                      </morph-stack>
                    </template>
                    <morph-on value="update/submitted:method/resetted"></morph-on>
                    <morph-on value="update/submitted:attribute/hidden"></morph-on>
                  </morph-form>
                </template>
                <morph-on value="users/find:method/render"></morph-on>
              </morph-render>
            </morph-stack>
          </morph-card>
          <morph-on value="users/find:method/show"></morph-on>
          <morph-on value="update/submitted:method/hidden"></morph-on>
        </morph-modal>

        <morph-dataset name="users" upsert="id">
          <morph-find key="id">
            <morph-on value="edit/click:attribute/value"></morph-on>
          </morph-find>
          <morph-on value="user/submitted:method/pushed"></morph-on>
          <morph-on value="update/submitted:method/pushed"></morph-on>
          <morph-on value="delete/click:method/delete"></morph-on>
        </morph-dataset>

        <div style="margin-top: 16px; padding: 12px; background: #e3f2fd; border-radius: 8px;">
          <strong>Total de usuários:</strong>
          <morph-text value="0">
            <morph-on value="users/changed:attribute/value|len"></morph-on>
          </morph-text>
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

        <morph-button value='{"name":"Produto Sem ID"}'>
          Adicionar Produto (UUID será gerado)
          <morph-icon use="add_shopping_cart"></morph-icon>
        </morph-button>

        <morph-button value='{"name":"Outro Produto"}'>
          Adicionar Outro Produto
          <morph-icon use="add_shopping_cart"></morph-icon>
        </morph-button>

        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
          <strong>Produtos cadastrados:</strong>
          <morph-text value="0">
            <morph-on value="products/changed:attribute/value|len"></morph-on>
          </morph-text>
        </div>

        <morph-dataset name="products" upsert="key">
          <morph-on value="morph-button/clicked:method/pushed"></morph-on>
        </morph-dataset>
      </div>
    `
    return container
  },
}
